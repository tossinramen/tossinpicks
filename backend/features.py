# def get_ml_features():
#     return [
#         '3p', '3p%', '3p_max', '3pa', '3par',
#         'ast', 'blk', 'blk%_opp', 'blk_max',
#         'drb', 'drb%_opp', 'drb_max_opp',
#         'drtg', 'efg%', 'fg', 'fg%', 'fg%_opp', 'fga', 'fga_max',
#         'ft', 'ft%', 'fta', 'ftr',
#         'orb', 'orb%', 'orb_max', 'ortg',
#         'pf', 'pts', 'stl', 'stl%', 'tov', 'trb', 'ts%',
#         'usg%', 'usg%_max', 'usg%_opp', 'rest_days',
#         'home' 
#     ]

# def get_ou_features():
#     return get_ml_features()

def get_ml_features():
    return [
        'blk',
        'blk%',
        'tov%',
        'usg%',
        'blk%_max',
        'ortg_max',
        'ts%_opp',
        'usg%_opp',
        'usg%_max_opp',
        'ortg_max_opp',
        'drtg_max_opp',
        '3p%_10_x',
        'usg%_10_x',
        'drb_max_10_x',
        'pts_max_10_x',
        '+/-_max_10_x',
        'usg%_max_10_x',
        'ts%_opp_10_x',
        'usg%_opp_10_x',
        'blk_max_opp_10_x',
        '+/-_max_opp_10_x',
        'target_10_x',
        'home_next',
        'usg%_10_y',
        '+/-_max_10_y',
        'ast%_max_10_y',
        '3p_opp_10_y',
        'usg%_opp_10_y',
        '+/-_max_opp_10_y',
        'target_10_y'
    ]

def get_ou_features():
    return get_ml_features()