# 📊 NBA Game Prediction - Data Dictionary

This dictionary explains the engineered features used in the final model training (`train_xgb_ml.py`).

---

## 🧠 Feature Descriptions

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

---# 📊 NBA Game Prediction - Data Dictionary

This dictionary explains the engineered features used in the final model training (`train_xgb_ml.py`).

---