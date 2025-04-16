import sys
import joblib
import pandas as pd
import sqlite3
from features import get_ml_features

home_team, visitor_team, date = sys.argv[1], sys.argv[2], sys.argv[3]

# Load model
model = joblib.load("backend/xgb_model.pkl")
features = get_ml_features()

# Load historical + rolling features DB
conn = sqlite3.connect("data/nba_games_full.db")
df = pd.read_sql("SELECT * FROM nba_games_full", conn)
conn.close()

# Get the most recent row for both teams (assumes full dataset is already built with team features)
home = df[(df["team_x"] == home_team) & (df["date"] < date)].sort_values("date").iloc[-1]
away = df[(df["team_opp"] == visitor_team) & (df["date"] < date)].sort_values("date").iloc[-1]

sample = pd.DataFrame([home[features], away[features]])
sample["home"] = [1, 0]  

# Predict
preds = model.predict(sample)
winner = home_team if preds[0] == 1 else visitor_team
print(winner)
