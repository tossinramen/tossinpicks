import pandas as pd
import sqlite3
import os
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
from features import get_ml_features

# === Load data ===
db_path = os.path.join("data", "nba_games_full.db")
conn = sqlite3.connect(db_path)
features = get_ml_features()
quoted_features = [f'"{col}"' for col in features + ['target']]

query = f"""
    SELECT {', '.join(quoted_features)}
    FROM nba_games_full
    WHERE target IS NOT NULL AND target != 2
"""
df = pd.read_sql_query(query, conn)
conn.close()

# === Prepare features & labels
X = df[features]
y = df['target']

# === Split train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# === Train
model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=4,
    learning_rate=0.1,
    eval_metric='logloss'
)
model.fit(X_train, y_train)

# === Evaluate
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"✅ Accuracy: {acc:.4f}")
print("\n📊 Classification Report:")
print(classification_report(y_test, y_pred))

# === Feature Importance
xgb.plot_importance(model)
plt.title("All Feature Importances")
plt.tight_layout()
plt.show()
