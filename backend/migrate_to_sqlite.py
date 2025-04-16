import pandas as pd
import sqlite3
import os

csv_path = os.path.join("data", "nba_games.csv")
db_path = os.path.join("data", "nba_games.db")

df = pd.read_csv(csv_path)

conn = sqlite3.connect(db_path)
df.to_sql("nba_games", conn, if_exists="replace", index=False)

conn.close()
print(f"✅ Migrated to SQLite: {db_path}")
