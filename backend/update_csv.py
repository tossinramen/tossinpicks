import pandas as pd
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import os

def scrape_season(season: int) -> pd.DataFrame:
    base_url = f"https://www.basketball-reference.com/leagues/NBA_{season}_games.html"
    soup = BeautifulSoup(requests.get(base_url).text, "html.parser")
    month_urls = [a["href"] for a in soup.select("div.filter a[href]")]
    
    all_games = []
    for month_url in month_urls:
        full_url = f"https://www.basketball-reference.com{month_url}"
        page = BeautifulSoup(requests.get(full_url).text, "html.parser")
        table = page.find("table", {"id": "schedule"})
        if not table:
            continue
        for row in table.tbody.find_all("tr"):
            if row.find("th", {"scope": "row"}) is None:
                continue
            date = row.find("th").text.strip()
            tds = row.find_all("td")
            if len(tds) < 6:
                continue
            game = {
                "date": date,
                "visitor_team": tds[0].text.strip(),
                "visitor_pts": tds[1].text.strip(),
                "home_team": tds[2].text.strip(),
                "home_pts": tds[3].text.strip(),
                "overtime": tds[5].text.strip(),
                "box_score": tds[6].a["href"] if tds[6].a else None
            }
            all_games.append(game)
    return pd.DataFrame(all_games)

def update_nba_csv():
    path = "data/nba_games.csv"
    if not os.path.exists(path):
        raise FileNotFoundError("nba_games.csv not found in the data/ directory.")

    existing = pd.read_csv(path)
    existing["date"] = pd.to_datetime(existing["date"], errors="coerce")
    latest_date = existing["date"].max()

    start_year = latest_date.year
    end_year = datetime.now().year + 1

    new_games = []
    for season in range(start_year, end_year + 1):
        season_df = scrape_season(season)
        season_df["date"] = pd.to_datetime(season_df["date"], errors="coerce")
        season_df = season_df[season_df["date"] > latest_date]
        new_games.append(season_df)

    if new_games:
        new_df = pd.concat(new_games, ignore_index=True)
        # Reorder to match existing column order
        new_df = new_df[[col for col in existing.columns if col in new_df.columns]]
        updated_df = pd.concat([existing, new_df], ignore_index=True)
        updated_df.drop_duplicates(subset=["date", "home_team", "visitor_team"], keep="last", inplace=True)
        updated_df.to_csv(path, index=False)
        print(f"✅ CSV updated. Added {len(new_df)} new games.")
    else:
        print("✅ No new games found.")

if __name__ == "__main__":
    update_nba_csv()
