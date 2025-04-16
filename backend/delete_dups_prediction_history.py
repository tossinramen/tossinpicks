import sqlite3

conn = sqlite3.connect("data/prediction_history.db")
cursor = conn.cursor()

cursor.execute("""
DELETE FROM prediction_history
WHERE id NOT IN (
    SELECT MIN(id)
    FROM prediction_history
    GROUP BY date, home_team, away_team
)
""")

conn.commit()
conn.close()
print("✅ Duplicates removed")
