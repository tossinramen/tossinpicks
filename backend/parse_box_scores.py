import os
import pandas as pd
from bs4 import BeautifulSoup
from io import StringIO
from tqdm import tqdm

SCORES_DIR = "data/scores"
OUT_PATH = "data/nba_games.csv"
box_scores = [os.path.join(SCORES_DIR, f) for f in os.listdir(SCORES_DIR) if f.endswith(".html")]

def parse_html(path):
    with open(path, encoding="utf-8") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
        [s.decompose() for s in soup.select("tr.over_header")]
    return soup

def read_line_score(soup):
    try:
        tables = pd.read_html(StringIO(str(soup)), attrs={"id": "line_score"})
        line_score = tables[0]
        line_score.columns = ["team"] + list(line_score.columns[1:-1]) + ["total"]
        return line_score[["team", "total"]]
    except:
        return None

def read_stats(soup, team, stat):
    df = pd.read_html(StringIO(str(soup)), attrs={"id": f"box-{team}-game-{stat}"}, index_col=0)[0]
    df = df.apply(pd.to_numeric, errors="coerce")
    return df

def read_season_info(soup):
    nav = soup.select_one("#bottom_nav_container")
    hrefs = [a["href"] for a in nav.find_all("a")]
    return os.path.basename(hrefs[1]).split("_")[0]

games = []
base_cols = None

print(f"📂 Parsing {len(box_scores)} box scores...\n")

for idx, file in enumerate(tqdm(box_scores, desc="Parsing box scores")):
    soup = parse_html(file)
    line_score = read_line_score(soup)
    if line_score is None:
        continue

    teams = list(line_score["team"])
    summaries = []

    for team in teams:
        try:
            basic = read_stats(soup, team, "basic")
            advanced = read_stats(soup, team, "advanced")
            totals = pd.concat([basic.iloc[-1], advanced.iloc[-1]])
            totals.index = totals.index.str.lower()
            maxes = pd.concat([basic.iloc[:-1].max(), advanced.iloc[:-1].max()])
            maxes.index = maxes.index.str.lower() + "_max"
            summary = pd.concat([totals, maxes])

            if base_cols is None:
                base_cols = [col for col in summary.index if "bpm" not in col]

            summaries.append(summary[base_cols])
        except:
            continue

    if len(summaries) < 2:
        continue

    summary_df = pd.concat(summaries, axis=1).T
    game = pd.concat([summary_df, line_score], axis=1)
    game["home"] = [0, 1]
    game_opp = game.iloc[::-1].reset_index()
    game_opp.columns += "_opp"
    full_game = pd.concat([game, game_opp], axis=1)
    full_game["seasons"] = read_season_info(soup)
    full_game["date"] = pd.to_datetime(os.path.basename(file)[:8], format="%Y%m%d")
    full_game["won"] = full_game["total"] > full_game["total_opp"]
    games.append(full_game)

df = pd.concat(games, ignore_index=True)
df.to_csv(OUT_PATH, index=False)
print(f"\n✅ Saved {len(df)} rows to {OUT_PATH}")
