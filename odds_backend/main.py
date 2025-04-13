from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sbrscrape import Scoreboard

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