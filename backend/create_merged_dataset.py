import pandas as pd
import sqlite3
import os

# === Connect to the existing SQLite DB ===
db_path = os.path.join("data", "nba_games.db")
conn = sqlite3.connect(db_path)

# === Load the full data
df = pd.read_sql_query("SELECT * FROM nba_games", conn)
conn.close()

# === Initial cleaning
df = df.sort_values("date").reset_index(drop=True)
for col in ["mp.1", "mp_opp.1", "index_opp"]:
    if col in df.columns:
        del df[col]

# === Add target variable
df["target"] = df.groupby("team")["won"].shift(-1)
df["target"].fillna(2, inplace=True)
df["target"] = df["target"].astype(int)

# === Drop columns with exactly 20254 nulls
nulls = df.isnull().sum()
drop_cols = nulls[nulls == 20254].index.tolist()
df.drop(columns=drop_cols, inplace=True)

# === Drop any rows that have nulls in remaining columns
remaining_nulls = df.isnull().sum()
df.dropna(subset=remaining_nulls[remaining_nulls > 0].index.tolist(), inplace=True)

# === Rename if needed
if "seasons" in df.columns:
    df.rename(columns={"seasons": "season"}, inplace=True)

# === Add rolling features
rolling_base_cols = df.select_dtypes(include="number").columns.difference(["won", "target"])
df_rolling = df[list(rolling_base_cols) + ["won", "team", "season"]]

def find_team_averages(team):
    return team.select_dtypes(include="number").rolling(10).mean()

df_rolling = df.groupby(["team", "season"], group_keys=False).apply(find_team_averages)
rolling_cols = [f"{col}_10" for col in df_rolling.columns]
df_rolling.columns = rolling_cols
df = pd.concat([df, df_rolling], axis=1)

# === Drop rows with new NaNs from rolling
df.dropna(inplace=True)

# === Add next-game columns
def shift_col(team, col_name):
    return team[col_name].shift(-1)

def add_col(df, col_name):
    return df.groupby("team", group_keys=False).apply(lambda x: shift_col(x, col_name))

df["home_next"] = add_col(df, "home")
df["team_opp_next"] = add_col(df, "team_opp")
df["date_next"] = add_col(df, "date")

# === Merge with opponent's rolling stats
df_merged = df.merge(
    df[rolling_cols + ["team_opp_next", "date_next", "team"]],
    left_on=["team", "date_next"],
    right_on=["team_opp_next", "date_next"],
    suffixes=("_x", "_y")
)

# === Save the final merged dataset
os.makedirs("data", exist_ok=True)
df_merged.to_csv("data/nba_games_full.csv", index=False)

conn = sqlite3.connect("data/nba_games_full.db")
df_merged.to_sql("nba_games_full", conn, if_exists="replace", index=False)
conn.close()

print("✅ Created new cleaned and merged CSV + SQLite database for training.")
