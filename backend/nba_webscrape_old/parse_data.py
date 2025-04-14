#!/usr/bin/env python
# coding: utf-8

# In[16]:


import os 
import pandas as pd 
from bs4 import BeautifulSoup
from io import StringIO


# In[ ]:


get_ipython().run_line_magic('pip', 'install pandas')


# In[ ]:


SCORE_DIR = "data/scores"


# In[ ]:


box_scores = os.listdir(SCORE_DIR)


# In[ ]:


box_scores


# In[ ]:


len(box_scores)


# In[ ]:


box_scores = [os.path.join(SCORE_DIR, f) for f in box_scores if f.endswith(".html")]


# In[ ]:


box_scores


# In[186]:


def parse_html(box_score):
    with open(box_score, encoding="utf-8") as f:  
        html = f.read()
    soup = BeautifulSoup(html, "html.parser")  
    [s.decompose() for s in soup.select("tr.over_header")] 
    return soup
    
    
    


# In[187]:


import pandas as pd
from io import StringIO

def read_line_score(soup):
    """Extract the line score table, handling missing or malformed HTML gracefully."""
    try:
        html_string = str(soup)
        html_buffer = StringIO(html_string)
        tables = pd.read_html(html_buffer, attrs={"id": "line_score"})

        if not tables:
            print("Warning: 'line_score' table not found.")
            return None  
        
        line_score = tables[0]

        cols = list(line_score.columns)
        cols[0] = "team"
        cols[-1] = "total"
        line_score.columns = cols

        line_score = line_score[["team", "total"]]

        return line_score
    
    except Exception as e:
        print(f"Error reading line score: {e}")
        return None  


# In[188]:


def read_stats(soup, team, stat):
    """Reads a stats table for a given team and stat type."""
    html_string = str(soup)
    html_buffer = StringIO(html_string) 
    df = pd.read_html(html_buffer, attrs={"id": f"box-{team}-game-{stat}"}, index_col=0)[0]
    df = df.apply(pd.to_numeric, errors="coerce")
    return df  


# In[189]:


def read_season_info(soup):
    nav = soup.select("#bottom_nav_container")[0]
    hrefs = [a["href"] for a in nav.find_all("a")]
    season = os.path.basename(hrefs[1]).split("_")[0]
    return season


# In[190]:


base_cols = None
games = []
box_score = box_scores[0]

for idx, box_score in enumerate(box_scores):
    soup = parse_html(box_score)
    line_score = read_line_score(soup)
    if line_score is None:
        print(f"Skipping game {idx} (issue with line score)")
        continue

    teams = list(line_score["team"])
    summaries = []
    
    for team in teams:
        try:
            basic = read_stats(soup, team, "basic")
            advanced = read_stats(soup, team, "advanced")

            totals = pd.concat([basic.iloc[-1,:], advanced.iloc[-1,:]])
            totals.index = totals.index.str.lower()

            maxes = pd.concat([basic.iloc[:-1,:].max(), advanced.iloc[:-1,:].max()])
            maxes.index = maxes.index.str.lower() + "_max"

            summary = pd.concat([totals, maxes])

            if base_cols is None:
                base_cols = list(summary.index.drop_duplicates(keep="first"))
                base_cols = [b for b in base_cols if "bpm" not in b]

            summary = summary[base_cols]
            summaries.append(summary)
        
        except Exception as e:
            print(f"Skipping team {team} in game {idx} due to error: {e}")
            continue
    if not summaries:
        print(f"Skipping game {idx} (no valid summaries)")
        continue

    summary = pd.concat(summaries, axis=1).T
    game = pd.concat([summary, line_score], axis=1)
    game["home"] = [0,1]
    game_opp = game.iloc[::-1].reset_index()
    game_opp.columns += "_opp"

    full_game = pd.concat([game, game_opp], axis=1)
    full_game["seasons"] = read_season_info(soup)
    full_game["date"] = os.path.basename(box_score)[:8]
    full_game["date"] = pd.to_datetime(full_game["date"], format="%Y%m%d")
    full_game["won"] = full_game["total"] > full_game["total_opp"]

    games.append(full_game)

    if len(games) % 100 == 0:
        print(f"{len(games)} / {len(box_scores)} processed")


# In[191]:


#soup


# In[192]:


#teams


# In[193]:


#df


# In[194]:


#advanced


# In[195]:


#basic


# In[196]:


#total


# In[197]:


#maxes


# In[198]:


#totals


# In[199]:


#summary


# In[200]:


#game


# In[201]:


#game_opp


# In[202]:


#full_game


# In[203]:


#box_score


# In[204]:


games_df = pd.concat(games, ignore_index=True)


# In[205]:


games_df


# In[206]:


games_df.to_csv("nba_games.csv")


# In[ ]:




