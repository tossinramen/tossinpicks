import sqlite3
import pandas as pd
import xgboost as xgb
import joblib
import os
from features import get_ml_features

features = get_ml_features()


db_path = os.path.join("data", "nba_games_full.db")
conn = sqlite3.connect(db_path)


quoted_features = [f'"{col}"' for col in features + ['target']]

query = f"""
    SELECT {', '.join(quoted_features)}
    FROM nba_games_full
    WHERE target IS NOT NULL
"""
df = pd.read_sql_query(query, conn)
conn.close()

X = df[features]
y = df['target']

model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=4,
    learning_rate=0.1,
    use_label_encoder=False,
    eval_metric='logloss'
)

model.fit(X, y)


model_path = os.path.join("backend", "xgb_model.pkl")
joblib.dump(model, model_path)
print(f"✅ Model trained and saved to {model_path}")
