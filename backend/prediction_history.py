import sqlite3
import os


os.makedirs("data", exist_ok=True)

db_path = os.path.join("data", "prediction_history.db")
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS prediction_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    home_team TEXT,
    away_team TEXT,
    prediction TEXT
)
""")


cursor.execute("""
CREATE UNIQUE INDEX IF NOT EXISTS unique_game
ON prediction_history (date, home_team, away_team)
""")

...

def log_prediction_to_history_db(date, home_team, away_team, prediction):
    ...
    cursor.execute("""
        INSERT OR IGNORE INTO prediction_history (date, home_team, away_team, prediction)
        VALUES (?, ?, ?, ?)
    """, (date, home_team, away_team, prediction))