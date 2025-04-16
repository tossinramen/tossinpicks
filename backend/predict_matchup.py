import sys
import os
import joblib
import pandas as pd
import sqlite3

sys.path.append(os.path.dirname(__file__))
from features import get_ml_features

def predictMatchup(data: dict) -> str:
    home_team = data["home_team"]["full_name"] if isinstance(data["home_team"], dict) else data["home_team"]
    visitor_team = data["visitor_team"]["full_name"] if isinstance(data["visitor_team"], dict) else data["visitor_team"]
    date = data["date"]

    print(f"\n📅 Predicting: {home_team} vs {visitor_team} on {date}")

    team_name_to_abbr = {
        "Atlanta Hawks": "ATL", "Boston Celtics": "BOS", "Brooklyn Nets": "BKN", "Charlotte Hornets": "CHA",
        "Chicago Bulls": "CHI", "Cleveland Cavaliers": "CLE", "Dallas Mavericks": "DAL", "Denver Nuggets": "DEN",
        "Detroit Pistons": "DET", "Golden State Warriors": "GSW", "Houston Rockets": "HOU", "Indiana Pacers": "IND",
        "LA Clippers": "LAC", "Los Angeles Lakers": "LAL", "Memphis Grizzlies": "MEM", "Miami Heat": "MIA",
        "Milwaukee Bucks": "MIL", "Minnesota Timberwolves": "MIN", "New Orleans Pelicans": "NOP",
        "New York Knicks": "NYK", "Oklahoma City Thunder": "OKC", "Orlando Magic": "ORL", "Philadelphia 76ers": "PHI",
        "Phoenix Suns": "PHX", "Portland Trail Blazers": "POR", "Sacramento Kings": "SAC", "San Antonio Spurs": "SAS",
        "Toronto Raptors": "TOR", "Utah Jazz": "UTA", "Washington Wizards": "WAS"
    }

    model = joblib.load("backend/xgb_model.pkl")
    features = get_ml_features()

    conn = sqlite3.connect("data/nba_games_full.db")
    df = pd.read_sql("SELECT * FROM nba_games_full", conn)
    conn.close()

    print(f"📊 Total rows in DB: {len(df)}")
    print("🧪 team_x example values:", df['team_x'].unique()[:5])

    home_abbr = team_name_to_abbr.get(home_team, home_team)
    away_abbr = team_name_to_abbr.get(visitor_team, visitor_team)

    home_rows = df[(df["team_x"] == home_abbr) & (df["date"] < date)].sort_values("date")
    away_rows = df[(df["team_opp"] == away_abbr) & (df["date"] < date)].sort_values("date")

    if home_rows.empty:
        print(f"❌ No recent data for home_team: {home_team} ({home_abbr})")
        return f"Error: No data for home_team: {home_team}"

    if away_rows.empty:
        print(f"❌ No recent data for visitor_team: {visitor_team} ({away_abbr})")
        return f"Error: No data for visitor_team: {visitor_team}"

    home = home_rows.iloc[-1]
    away = away_rows.iloc[-1]

    sample = pd.DataFrame([home[features], away[features]])
    sample["home"] = [1, 0]

    preds = model.predict(sample)
    winner = home_team if preds[0] == 1 else visitor_team
    print(f"✅ Predicted winner: {winner}")
    return winner