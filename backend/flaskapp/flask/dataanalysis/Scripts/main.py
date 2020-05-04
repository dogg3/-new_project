
import pandas as pd


##Player info from preprocessed
import os
path = os.getcwd()
p = pd.read_pickle(path + '/preprocessed/players.pkl')
p = p.rename(columns=(dict(zip(p.columns, "player_info_" + p.columns))))




#Load preproceessed platyer stats and  prefix it with the eventtype
duels = pd.read_pickle('./playersDuels.pkl')
duels= duels.rename(columns=dict(zip(duels.columns, "duels_"+duels.columns)))

passes = pd.read_pickle('./playersPasses.pkl')
passes= passes.rename(columns=dict(zip(passes.columns, "passes_"+passes.columns)))

shots = pd.read_pickle('./playersShots.pkl')
shots= shots.rename(columns=dict(zip(shots.columns, "shots_"+shots.columns)))

matches = pd.read_pickle('./playersMatchInfo.pkl')
matches = matches.rename(columns=dict(zip(matches.columns, "matches_"+matches.columns)))






##Merge passes and duels and Matches
players = pd.merge(duels, passes, how="inner", on="playerId")
players = players.merge(matches, how="inner", on='playerId')


#Defenders do not need the shots and could then be saved
#First we need to add the player informatiuon in a merge
players = players.reset_index().merge(p, left_on="playerId", right_on="wyId", how="inner").set_index('playerId')

defenders = players.groupby('player_info_position').get_group('Defender')
defenders.to_pickle(path +'/preprocessed/final/defenders.pkl')


##ADDING SHOTS FOR FORWARDS and Midfielders

players = players.merge(shots, how='inner', on='playerId')
midfielders = players.groupby('player_info_position').get_group('Midfielder')
forwards = players.groupby('player_info_position').get_group('Forward')

midfielders.to_pickle(path +'/preprocessed/final/midfielders.pkl')
forwards.to_pickle(path +'/preprocessed/final/forwards.pkl')


