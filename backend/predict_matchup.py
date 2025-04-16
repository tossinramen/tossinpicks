import sys
import os
import joblib
import pandas as pd
import sqlite3

sys.path.append(os.path.dirname(__file__))  
from features import get_ml_features


def predictMatchup(data: dict) -> str:
    home_team = data["home_team"]
    visitor_team = data["visitor_team"]
    date = data["date"]

    model = joblib.load("backend/xgb_model.pkl")
    features = get_ml_features()

    conn = sqlite3.connect("data/nba_games_full.db")
    df = pd.read_sql("SELECT * FROM nba_games_full", conn)
    conn.close()

    home = df[(df["team_x"] == home_team) & (df["date"] < date)].sort_values("date").iloc[-1]
    away = df[(df["team_opp"] == visitor_team) & (df["date"] < date)].sort_values("date").iloc[-1]

    sample = pd.DataFrame([home[features], away[features]])
    sample["home"] = [1, 0]

    preds = model.predict(sample)
    winner = home_team if preds[0] == 1 else visitor_team
    return winner
