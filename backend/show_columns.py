import sqlite3
import pandas as pd

# Connect to the database
conn = sqlite3.connect("data/nba_games_full.db")

# Read just 1 row to get all column names
df = pd.read_sql_query("SELECT * FROM nba_games_full LIMIT 1", conn)
conn.close()

# Print all columns
print("🧠 Columns in 'nba_games_full':")
for col in df.columns:
    print("-", col)
