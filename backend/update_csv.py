import os
import time
import pandas as pd
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from tqdm import tqdm

BASE_URL = "https://www.basketball-reference.com"
HEADERS = {"User-Agent": "Mozilla/5.0"}

def get_soup(url, retries=3, delay=2):
    for _ in range(retries):
        try:
            response = requests.get(url, headers=HEADERS, timeout=10)
            if response.status_code == 200:
                return BeautifulSoup(response.text, "html.parser")
        except Exception as e:
            print(f"Retrying after error: {e}")
        time.sleep(delay)
    raise Exception(f"Failed to fetch URL after {retries} attempts: {url}")

def scrape_season(season: int) -> pd.DataFrame:
    print(f"📆 Scraping season {season}...")
    base_url = f"{BASE_URL}/leagues/NBA_{season}_games.html"
    soup = get_soup(base_url)
    
    month_urls = [a["href"] for a in soup.select("div.filter a[href]")]
    all_games = []

    for month_url in tqdm(month_urls, desc=f"Season {season} months"):
        page = get_soup(f"{BASE_URL}{month_url}")
        table = page.find("table", {"id": "schedule"})
        if not table:
            continue

        for row in table.tbody.find_all("tr"):
            if row.find("th", {"scope": "row"}) is None:
                continue

            tds = row.find_all("td")
            if len(tds) < 6:
                continue

            game = {
                "date": row.find("th").text.strip(),
                "visitor_team": tds[0].text.strip(),
                "visitor_pts": tds[1].text.strip(),
                "home_team": tds[2].text.strip(),
                "home_pts": tds[3].text.strip(),
                "overtime": tds[5].text.strip(),
                "box_score": tds[6].a["href"] if tds[6].a else None
            }
            all_games.append(game)
        
        time.sleep(1.5)  # Delay to avoid hammering server

    return pd.DataFrame(all_games)

def update_nba_csv(path="data/nba_games.csv", start_year=2001):
    os.makedirs(os.path.dirname(path), exist_ok=True)

    # Load existing if available
    if os.path.exists(path):
        print("📂 Loading existing NBA games...")
        existing = pd.read_csv(path)
        existing["date"] = pd.to_datetime(existing["date"], errors="coerce")
    else:
        existing = pd.DataFrame()
        print("🆕 No existing file found, starting from scratch.")

    latest_date = existing["date"].max() if not existing.empty else None
    this_year = datetime.now().year + 1
    new_games = []

    for season in range(start_year, this_year + 1):
        season_df = scrape_season(season)
        if season_df.empty:
            continue

        season_df["date"] = pd.to_datetime(season_df["date"], errors="coerce")
        if latest_date:
            season_df = season_df[season_df["date"] > latest_date]
        if not season_df.empty:
            new_games.append(season_df)

    if new_games:
        all_new = pd.concat(new_games, ignore_index=True)
        combined = pd.concat([existing, all_new], ignore_index=True)
        combined.drop_duplicates(subset=["date", "home_team", "visitor_team"], keep="last", inplace=True)
        combined.to_csv(path, index=False)
        print(f"✅ CSV updated with {len(all_new)} new games! Total games: {len(combined)}")
    else:
        print("✅ No new games found.")

if __name__ == "__main__":
    update_nba_csv()
