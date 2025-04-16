import sqlite3
import pandas as pd

# Connect to the database
conn = sqlite3.connect("data/nba_games.db")

# Read just 1 row to get all column names
df = pd.read_sql_query("SELECT * FROM nba_games LIMIT 1", conn)
conn.close()

# Print all columns
print("🧠 Columns in 'nba_games':")
for col in df.columns:
    print("-", col)
