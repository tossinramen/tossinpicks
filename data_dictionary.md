# 📊 NBA Game Prediction - Data Dictionary

This dictionary explains the engineered features used in the final model training (`train_xgb_ml.py`).

---

## Features

| Feature Name          | Description |
|-----------------------|-------------|
| blk                  | Total blocks made by the team in the game |
| blk%                 | Percentage of opponent 2-point field goals blocked |
| tov%                 | Turnover percentage - estimated turnovers per 100 plays |
| usg%                 | Usage rate - estimates team possession usage by players |
| blk%_max             | Max block % by a player on the team |
| ortg_max             | Max offensive rating by a player on the team |
| ts%_opp              | True shooting percentage of the opponent team |
| usg%_opp             | Usage rate of the opponent team |
| usg%_max_opp         | Max usage rate by a player on the opponent team |
| ortg_max_opp         | Max offensive rating by an opponent player |
| drtg_max_opp         | Max defensive rating by an opponent player |
| 3p%_10_x             | Rolling 10-game 3-point shooting percentage of the team |
| usg%_10_x            | Rolling 10-game usage rate of the team |
| drb_max_10_x         | Rolling 10-game max defensive rebounds of the team |
| pts_max_10_x         | Rolling 10-game max points scored by a player on the team |
| +/-_max_10_x         | Rolling 10-game max plus-minus by a player on the team |
| usg%_max_10_x        | Rolling 10-game max usage rate of the team |
| ts%_opp_10_x         | Rolling 10-game opponent true shooting percentage |
| usg%_opp_10_x        | Rolling 10-game opponent usage rate |
| blk_max_opp_10_x     | Rolling 10-game max blocks by an opponent |
| +/-_max_opp_10_x     | Rolling 10-game max plus-minus by an opponent |
| target_10_x          | Rolling 10-game target value (next game win/loss) for team |
| home_next            | Whether the next game is at home (1) or away (0) |
| usg%_10_y            | Rolling 10-game usage rate of the opponent |
| +/-_max_10_y         | Rolling 10-game max plus-minus by opponent players |
| ast%_max_10_y        | Rolling 10-game max assist percentage of opponent |
| 3p_opp_10_y          | Rolling 10-game total 3-point shots made by opponent |
| usg%_opp_10_y        | Rolling 10-game usage rate of opponent team |
| +/-_max_opp_10_y     | Rolling 10-game opponent plus-minus |
| target_10_y          | Rolling 10-game target for opponent (next game win/loss) |
| rest_days            | Days since the team’s last game |
| home                 | 1 if game is at home, 0 if away |

---

---

## 🧠 Feature Descriptions

| Feature Prefix | Description |
|----------------|-------------|
| **No suffix**  | Base game-level stat (team) |
| `_max`         | Max stat value for any player on the team in a single game |
| `_opp`         | Same stat but for opponent team |
| `_max_opp`     | Max stat by any opponent player in that game |
| `_10_x`        | Team's 10-game rolling average (before merge) |
| `_10_y`        | Opponent's 10-game rolling average (after merge) |
| `_max_10_x`    | Team's 10-game rolling max (stat) |
| `_max_10_y`    | Opponent's 10-game rolling max (stat) |
| `_opp_10_x`    | Opponent 10-game rolling stat vs team |
| `_opp_10_y`    | Team’s rolling stat against the opponent |
| `target`       | Whether the team won the next game (1) or not (0) |
| `rest_days`    | Days since last game |
| `home`         | 1 if game was at home, 0 if away |

---

### 🏀 Core Stats

| Feature | Description |
|--------|-------------|
| mp | Minutes played |
| fg | Field goals made |
| fga | Field goal attempts |
| fg% | Field goal percentage |
| 3p | Three-point field goals made |
| 3pa | Three-point field goal attempts |
| 3p% | Three-point percentage |
| ft | Free throws made |
| fta | Free throw attempts |
| ft% | Free throw percentage |
| orb | Offensive rebounds |
| drb | Defensive rebounds |
| trb | Total rebounds |
| ast | Assists |
| stl | Steals |
| blk | Blocks |
| tov | Turnovers |
| pf | Personal fouls |
| pts | Total points |

---

### 📈 Advanced Stats

| Feature | Description |
|--------|-------------|
| ts% | True shooting % (efficiency adjusted for 3s & FTs) |
| efg% | Effective field goal % |
| 3par | % of FGA that were 3-point attempts |
| ftr | Free throw rate (FTA per FGA) |
| orb% | Offensive rebound rate |
| drb% | Defensive rebound rate |
| trb% | Total rebound rate |
| ast% | Assist rate |
| stl% | Steal rate |
| blk% | Block rate |
| tov% | Turnover rate |
| usg% | Usage rate |
| ortg | Offensive rating |
| drtg | Defensive rating |

---

### 🧠 Merged Game Features

| Feature | Description |
|---------|-------------|
| team_x | Team name (from base schedule) |
| team_y | Team name (from merged opponent data) |
| team_opp | Opponent team name |
| team_opp_next_x | Opponent’s next game team |
| date_next | Date of opponent’s next game |
| home | 1 if home game, 0 if away |
| home_next | Whether next game is at home |
| total | Vegas total points projection |
| won | 1 if game was won, 0 otherwise |
| target | 1 if next game was won, 0 otherwise |
| rest_days | Days since last game |

---

### 🔁 Rolling & Merged Feature Explanation

Suffixes like `_10_x` or `_10_y` mean the stat is a **rolling 10-game average**. These are created for both the team and its opponent and are critical for capturing momentum and recent form.

Max versions (`_max`, `_max_10_x`, etc.) capture standout performances, while `_opp` and `_opp_10_y` columns let the model consider what kinds of opponents teams are facing.

---