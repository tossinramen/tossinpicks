import os
import pandas as pd
import xgboost as xgb
import joblib
from features import get_ml_features


df = pd.read_csv('data/nba_games.csv')
df = df.dropna(subset=['won'])
df['won'] = df['won'].astype(int)
df = df[df['won'].isin([0, 1])]
features = get_ml_features()
df = df.dropna(subset=features)
print("✅ Unique target values:", df['won'].unique())
print("✅ Target counts:\n", df['won'].value_counts())

X = df[features]
y = df['won']


model = xgb.XGBClassifier(eval_metric='logloss')
model.fit(X, y)

os.makedirs('backend', exist_ok=True)
model.save_model('backend/xgb_ml_model.json')
joblib.dump(model, 'backend/model.joblib')

print("✅ Trained and saved ML (win/loss) model.")
