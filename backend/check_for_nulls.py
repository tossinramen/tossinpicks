import sqlite3
import pandas as pd


conn = sqlite3.connect("data/nba_games.db")


df = pd.read_sql_query("SELECT * FROM nba_games", conn)
conn.close()


#print("🧠 All column names:")
#for col in df.columns:
#    print("-", col)
nulls = df.isnull().sum()
nulls = nulls[nulls > 0]

# Display results
print("🧹 Columns with missing values:")
print(nulls.sort_values(ascending=False))