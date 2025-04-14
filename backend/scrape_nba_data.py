import os
import time
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright, TimeoutError as PlaywrightTimeout

SEASONS = list(range(2021, 2025))
DATA_DIR = "data"
STANDINGS_DIR = os.path.join(DATA_DIR, "standings")
SCORES_DIR = os.path.join(DATA_DIR, "scores")

os.makedirs(STANDINGS_DIR, exist_ok=True)
os.makedirs(SCORES_DIR, exist_ok=True)

async def get_html(url, selector, sleep=3, retries=3):
    html = None
    for i in range(1, retries + 1):
        time.sleep(sleep * i)
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(headless=True)
                page = await browser.new_page()
                await page.goto(url, timeout=60000)
                html = await page.inner_html(selector)
        except PlaywrightTimeout:
            print(f"⚠️ Timeout error on {url}")
            continue
        else:
            break
    return html

async def scrape_season(season):
    url = f"https://www.basketball-reference.com/leagues/NBA_{season}_games.html"
    html = await get_html(url, "#content .filter")
    soup = BeautifulSoup(html, "html.parser")
    links = soup.find_all("a")
    hrefs = [l["href"] for l in links]
    standings_pages = [f"https://www.basketball-reference.com{l}" for l in hrefs]

    for url in standings_pages:
        save_path = os.path.join(STANDINGS_DIR, url.split("/")[-1])
        if os.path.exists(save_path):
            continue
        html = await get_html(url, "#all_schedule")
        if html:
            with open(save_path, "w+", encoding="utf-8") as f:
                f.write(html)

async def scrape_box_scores():
    standings_files = [f for f in os.listdir(STANDINGS_DIR) if f.endswith(".html")]
    for file in standings_files:
        with open(os.path.join(STANDINGS_DIR, file), "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f.read(), "html.parser")
            links = soup.find_all("a")
            hrefs = [l.get("href") for l in links]
            box_scores = [f"https://www.basketball-reference.com{l}" for l in hrefs if l and "boxscore" in l]

            for url in box_scores:
                save_path = os.path.join(SCORES_DIR, url.split("/")[-1])
                if os.path.exists(save_path):
                    continue
                html = await get_html(url, "#content")
                if html:
                    with open(save_path, "w+", encoding="utf-8") as f:
                        f.write(html)


if __name__ == "__main__":
    import asyncio
    async def main():
        for season in SEASONS:
            await scrape_season(season)
        await scrape_box_scores()
    asyncio.run(main())
