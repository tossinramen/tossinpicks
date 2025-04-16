import sqlite3
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sbrscrape import Scoreboard
from backend.predict_matchup import predictMatchup
import asyncio #for making predictions in parallel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-odds")
def get_odds():
    sb = Scoreboard(sport="NBA")
    games = sb.games if hasattr(sb, 'games') else []

    results = []
    for game in games:
        home = game["home_team"].replace("Los Angeles Clippers", "LA Clippers")
        away = game["away_team"].replace("Los Angeles Clippers", "LA Clippers")
        data = {
            "home_team": home,
            "away_team": away,
            "moneylines": {
                "home": game["home_ml"],
                "away": game["away_ml"]
            },
            "totals": game["total"]
        }
        results.append(data)
    return {"games": results}


@app.get("/odds")
def get_odds():
    sb = Scoreboard(sport="NBA")
    games = sb.games
    return games

@app.post("/predict")
async def predict(request: Request):
    try:
        body = await request.json()
        games = body.get("games", [])

        async def predict_one(game):
            try:
                return { **game, "prediction": await asyncio.to_thread(predictMatchup, game) }
            except asyncio.CancelledError:
                print("⚠️ Prediction task was cancelled")
                return { **game, "prediction": "Cancelled" }
            except Exception as e:
                print(f"❌ Error predicting game: {e}")
                return { **game, "prediction": "Error" }

        predictions = await asyncio.gather(*[predict_one(game) for game in games])
        return { "predictions": predictions }

    except Exception as e:
        print("🔥 Exception in /predict:", e)
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/prediction-history")
def get_prediction_history():
    conn = sqlite3.connect("data/prediction_history.db")
    cursor = conn.cursor()

    cursor.execute("SELECT date, home_team, away_team, prediction FROM prediction_history ORDER BY date DESC")
    rows = cursor.fetchall()
    conn.close()

    return {"history": [
        {"date": row[0], "home_team": row[1], "away_team": row[2], "prediction": row[3]}
        for row in rows
    ]}