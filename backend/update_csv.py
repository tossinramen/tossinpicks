import pandas as pd
import os


csv_path = os.path.join("data", "nba_games.csv")

df = pd.read_csv(csv_path)

print("Original columns:")
print(df.columns)

if 'mp.1' in df.columns:
    df = df.drop(columns=['mp.1'])
    print("Dropped duplicate column 'mp.1'")
else:
    print("No 'mp.1' column found.")

df.to_csv(csv_path, index=False)
print("✅ Saved cleaned CSV to:", csv_path)
