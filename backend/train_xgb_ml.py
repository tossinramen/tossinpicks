import pandas as pd
import xgboost as xgb
import joblib
from backend.features import get_ml_features

# Load data
df = pd.read_csv('data/nba_games.csv')
df = df.dropna()

# Features and labels
features = get_ml_features()
X = df[features]
y = df['won']  # Classification target: win/loss

# Train model
model = xgb.XGBClassifier(use_label_encoder=False, eval_metric='logloss')
model.fit(X, y)

# Save model
model.save_model('backend/xgb_ml_model.json')
joblib.dump(model, 'backend/model.joblib')

print("✅ Trained and saved ML (win/loss) model.")
