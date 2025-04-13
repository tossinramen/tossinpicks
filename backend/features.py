def get_ml_features():
    return [
        '+/-_max_10_10_x',
        '+/-_max_10_10_y',
        '+/-_max_opp_10_10_x',
        '+/-_max_opp_10_10_y',
        '3p', '3p%', '3p_max', '3pa', '3par',
        'ast', 'ast%_max_opp_10_10_y',
        'blk', 'blk%_opp', 'blk_max',
        'drb', 'drb%_opp', 'drb_max_opp',
        'drtg',
        'efg%',
        'fg', 'fg%', 'fg%_max_opp_10_10_y', 'fg%_opp', 'fga', 'fga_max',
        'ft', 'ft%', 'fta',
        'ftr', 'ftr_max_opp',
        'home_next',
        'orb', 'orb%', 'orb%_max_opp_10_10_y', 'orb_max',
        'ortg',
        'pf',
        'pts',
        'stl', 'stl%',
        'stl_max_10_10_y',
        'target_10_10_x', 'target_10_10_y',
        'tov',
        'trb',
        'ts%',
        'usg%', 'usg%_10_10_x', 'usg%_10_10_y', 'usg%_max', 'usg%_opp',
        'usg%_opp_10_10_x', 'usg%_opp_10_10_y'
    ]

def get_ou_features():
    return get_ml_features()
