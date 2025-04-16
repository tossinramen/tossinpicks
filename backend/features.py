def get_ml_features():
    return [
        '3p', '3p%', '3p_max', '3pa', '3par',
        'ast', 'blk', 'blk%_opp', 'blk_max',
        'drb', 'drb%_opp', 'drb_max_opp',
        'drtg', 'efg%', 'fg', 'fg%', 'fg%_opp', 'fga', 'fga_max',
        'ft', 'ft%', 'fta', 'ftr',
        'orb', 'orb%', 'orb_max', 'ortg',
        'pf', 'pts', 'stl', 'stl%', 'tov', 'trb', 'ts%',
        'usg%', 'usg%_max', 'usg%_opp', 'rest_days',
        'home' 
    ]

def get_ou_features():
    return get_ml_features()
