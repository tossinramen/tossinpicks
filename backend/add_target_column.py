import pandas as pd
import sqlite3
import os


db_path = os.path.join("data", "nba_games.db")


conn = sqlite3.connect(db_path)
df = pd.read_sql_query("SELECT * FROM nba_games", conn)


df["date"] = pd.to_datetime(df["date"])


df = df.sort_values(by=["team", "date"]).reset_index(drop=True)


df["target"] = df.groupby("team")["won"].shift(-1)


df["target"] = df["target"].fillna(2).astype(int)


print("✅ target value counts:")
print(df["target"].value_counts())


df.to_sql("nba_games", conn, if_exists="replace", index=False)
conn.close()
print("✅ Target column added and DB updated")
