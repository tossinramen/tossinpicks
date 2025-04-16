import sqlite3
import pandas as pd

conn = sqlite3.connect("data/nba_games.db")


query = """
SELECT date, team, team_opp, won, target, rest_days
FROM nba_games
WHERE team = 'ATL' AND seasons = '2025'
ORDER BY date
"""
df = pd.read_sql_query(query, conn)
conn.close()


pd.set_option("display.max_rows", None)  
print(df)
