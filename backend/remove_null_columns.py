import pandas as pd
import sqlite3
import os

csv_path = os.path.join("data", "nba_games.csv")
db_path = os.path.join("data", "nba_games.db")


df = pd.read_csv(csv_path)

# === Drop known null columns ===
null_cols = [
    'gmsc', '+/-', 'mp_max.1', 'mp_max', 'gmsc_opp', '+/-_opp',
    'mp_max_opp.1', 'mp_max_opp'
]

df = df.drop(columns=[col for col in null_cols if col in df.columns])
print(f"✅ Dropped {len(null_cols)} null columns from CSV")


df.to_csv(csv_path, index=False)
print("✅ Saved cleaned CSV")


conn = sqlite3.connect(db_path)
df.to_sql("nba_games", conn, if_exists="replace", index=False)
conn.close()
print("✅ Rebuilt database with cleaned columns")

partial_null_cols = ['+/-_max_opp', '+/-_max', 'ft%_max', 'ft%', 'ft%_opp', 'ft%_max_opp']
initial_rows = len(df)
df = df.dropna(subset=partial_null_cols)
dropped_rows = initial_rows - len(df)
print(f"🧹 Dropped {dropped_rows} rows with partial nulls in key stat columns")
df.to_csv(csv_path, index=False)
print("✅ Saved cleaned CSV")
conn = sqlite3.connect(db_path)
df.to_sql("nba_games", conn, if_exists="replace", index=False)
conn.close()
print("✅ Rebuilt cleaned database without bad rows")