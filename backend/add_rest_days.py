import pandas as pd
import sqlite3
from datetime import datetime


conn = sqlite3.connect("data/nba_games.db")
df = pd.read_sql_query("SELECT * FROM nba_games", conn)


df['date'] = pd.to_datetime(df['date'])


df = df.sort_values(by=['team', 'date'])


df['rest_days'] = 10


teams_last_played = {}

for i, row in df.iterrows():
    team = row['team']
    season = row['seasons']
    date = row['date']

    key = (team, season)
    if key not in teams_last_played:
        teams_last_played[key] = date
        df.at[i, 'rest_days'] = 10
    else:
        diff = (date - teams_last_played[key]).days
        df.at[i, 'rest_days'] = diff if 0 < diff < 10 else 10
        teams_last_played[key] = date


df.to_sql("nba_games", conn, if_exists="replace", index=False)
conn.close()

print("✅ Rest days column added and database updated")
