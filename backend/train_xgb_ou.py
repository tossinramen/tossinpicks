import pandas as pd
import xgboost as xgb
from features import get_ml_features


# Load data
df = pd.read_csv('data/nba_games.csv')
df = df.dropna()


features = get_ou_features()
X = df[features]
y = df['total'] + df['total_opp']  


model = xgb.XGBRegressor()
model.fit(X, y)


model.save_model('backend/xgb_ou_model.json')

print("✅ Trained and saved Over/Under model.")
