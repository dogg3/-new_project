import pandas as pd
pd.set_option('display.max_columns', 999)
pd.set_option('display.width', 999)


import os

path = os.getcwd()



#######################DEFENDERS#######################
#ALL METRICS
DEFENDERS = pd.read_pickle(path+'/pickles/DEFENDERS.pkl')

###PLAYER_INFO
player_info_defenders = DEFENDERS.filter(regex='player_info')
#
# ##Filter the plyaer_info
player_info_defenders = player_info_defenders[['player_info_firstName', 'player_info_lastName','player_info_foot','player_info_age','player_info_birthDate','player_info_height','player_info_weight','player_info_position','player_info_team', 'player_info_team_country']]
player_info_defenders.columns = list(map(lambda x: x.replace('player_info_', '').capitalize(), player_info_defenders.columns))

player_info_defenders.columns = list(map(lambda x: 'DOB' if x=='Birthdate' else x.replace('_',' '), player_info_defenders.columns))

player_info_defenders.to_pickle('./pickles/DEFENDERS/defenders_player_info.pkl')
############### SPLIT ANALYTICS AND OTHERS###############

analytics = DEFENDERS.filter(regex='%')
basic_info = DEFENDERS.drop(columns=analytics.columns)


############################DUELS#########################
defenders_duels_analytics = analytics.filter(regex='duels')
columns = list(map(lambda x: x.replace('duels_', '').capitalize().split(),defenders_duels_analytics.columns))
for index, v in enumerate(columns): v.insert(len(v)-1, 'won'); columns[index]  =" ".join(columns[index]);
defenders_duels_analytics.columns = columns
defenders_duels_analytics = defenders_duels_analytics.round(4) * 100
defenders_duels_analytics =defenders_duels_analytics[['Ground defending duel won %', 'Air duel won %','Ground loose ball duel won %','Ground attacking duel won %','Duels won %']]
defenders_duels_analytics.to_pickle('./pickles/DEFENDERS/defenders_duels_analytics.pkl')
defenders_duels_analytics.describe().round(2).to_pickle('./pickles/DEFENDERS/defenders_duels_analytics_stats.pkl')

defenders_basic_info_duels = basic_info.filter(regex='duel')
defenders_basic_info_duels = defenders_basic_info_duels.drop(columns=['rank_duels'])
def_ba_info_duels_columns = list(map(lambda x:x.replace('duels_',''),defenders_basic_info_duels.columns))
defenders_basic_info_duels.columns = list(map(lambda x: (x.replace('won_','') + " won") if "won_" in x else x.replace('total_','')+' total' if "total_" in x else x.capitalize(), def_ba_info_duels_columns))
defenders_basic_info_duels= defenders_basic_info_duels[['Ground defending duel won', 'Air duel won','Ground loose ball duel won','Ground attacking duel won', 'Air duel total','Ground loose ball duel total','Ground attacking duel total', 'Total duels']]
defenders_basic_info_duels= defenders_basic_info_duels.astype('uint32')
defenders_basic_info_duels.to_pickle('./pickles/DEFENDERS/defenders_duels_info.pkl')





##################PASSESS##############
defenders_passes_analytics = analytics.filter(regex='passes')
columns = list(map(lambda x:x.split(), list(map(lambda x: x.replace('acc_','') if 'acc_' in x else x ,list(map(lambda x: x.replace('passes_',''),defenders_passes_analytics.columns))))))
for index,v in enumerate(columns): v.insert(len(v)-1,'accuracy');
defenders_passes_analytics.columns = map(lambda x: " ".join(x).capitalize() ,columns)
defenders_passes_analytics = defenders_passes_analytics.round(4) * 100
defenders_passes_analytics = defenders_passes_analytics[['Simple pass accuracy %','High pass accuracy %','Head pass accuracy %','Cross accuracy %','Smart pass accuracy %','Launch accuracy %', 'Passes accuracy %']]
defenders_passes_analytics.to_pickle('./pickles/DEFENDERS/defenders_passes_analytics.pkl')
defenders_passes_analytics.describe().round(2).to_pickle('./pickles/DEFENDERS/defenders_passes_analytics_stats.pkl')


defenders_basic_info_passes = basic_info.filter(regex='passes')
defenders_basic_info_passes.columns = list(map(lambda x:x.replace('acc_','') + ' accurate' if 'acc_' in x else x.replace('total_','').capitalize(),list(map(lambda x:x.replace('passes_',''), defenders_basic_info_passes.columns))))
defenders_basic_info_passes.to_pickle('./pickles/DEFENDERS/defenders_passes_info.pkl')
defenders_basic_info_passes = defenders_basic_info_passes.drop(columns=['Hand pass', 'Hand pass accurate'])
defenders_basic_info_passes = defenders_basic_info_passes[['Simple pass','High pass','Head pass','Cross','Smart pass','Launch','Simple pass accurate', 'High pass accurate', 'Head pass accurate','Cross accurate','Smart pass accurate','Launch accurate', 'Total passes']]
defenders_basic_info_passes= defenders_basic_info_passes.astype('uint32')
defenders_basic_info_passes.to_pickle('./pickles/DEFENDERS/defenders_passes_info.pkl')

#############MATCHES##############
matches  = analytics.filter(regex='matches')
matches.columns = list(map(lambda x : x.replace('matches_','').capitalize() , matches.columns))
matches = matches[['Start %', 'Bench %', 'Minutes %']]
matches = matches.round(4) * 100
matches.to_pickle('./pickles/DEFENDERS/defenders_matches.pkl')
matches.describe().round(2).to_pickle('./pickles/DEFENDERS/defenders_matches_stats.pkl')


###RANKING

defender_rank = DEFENDERS.filter(regex='rank')

defender_rank.columns = ['Passing rank', 'Duel rank', 'Overall rank','Age rank']
defender_rank = defender_rank[['Passing rank', 'Duel rank', 'Age rank','Overall rank',]]
defender_rank = defender_rank.round(2)
defender_rank.to_pickle('./pickles/DEFENDERS/defenders_rankings.pkl')
defender_rank.describe().round(2).to_pickle('./pickles/DEFENDERS/defenders_rankings_stats.pkl')

####OVERALLL
defenders_overall = player_info_defenders
defenders_overall['Name'] = defenders_overall.apply(lambda x: x['Firstname'] + ' ' + x['Lastname'], axis=1)
defenders_overall = defenders_overall[['Name','Age','Height','Weight','Foot']].merge(defenders_passes_analytics[['Simple pass accuracy %', 'High pass accuracy %', 'Head pass accuracy %', 'Passes accuracy %']], on='playerId').merge(defenders_duels_analytics[['Ground defending duel won %', 'Air duel won %','Duels won %']], on='playerId')
defenders_overall = defenders_overall.merge(defender_rank, on='playerId')
defenders_overall.to_pickle('./pickles/DEFENDERS/defenders_overall.pkl')
defenders_overall.describe().round(2).to_pickle('./pickles/DEFENDERS/defenders_stats.pkl')











#########
############MIDFIELDERS##########
#############

MIDFIELDERS = pd.read_pickle(path+'/pickles/MIDFIELDERS.pkl')

###PLAYER_INFO
player_info_midfielders = MIDFIELDERS.filter(regex='player_info')
#
# ##Filter the plyaer_info
player_info_midfielders = player_info_midfielders[['player_info_firstName', 'player_info_lastName','player_info_foot','player_info_age','player_info_birthDate','player_info_height','player_info_weight','player_info_position','player_info_team', 'player_info_team_country']]
player_info_midfielders.columns = list(map(lambda x: x.replace('player_info_', '').capitalize(), player_info_midfielders.columns))

player_info_midfielders.columns = list(map(lambda x: 'DOB' if x=='Birthdate' else x.replace('_',' '), player_info_midfielders.columns))
player_info_midfielders.to_pickle('./pickles/MIDFIELDERS/midfielders_player_info.pkl')


############### SPLIT ANALYTICS AND OTHERS###############

analytics = MIDFIELDERS.filter(regex='%')
basic_info = MIDFIELDERS.drop(columns=analytics.columns)




############################DUELS#########################
midfielders_duels_analytics = analytics.filter(regex='duels')
columns = list(map(lambda x: x.replace('duels_', '').capitalize().split(),midfielders_duels_analytics.columns))
for index, v in enumerate(columns): v.insert(len(v)-1, 'won'); columns[index]  =" ".join(columns[index]);
midfielders_duels_analytics.columns = columns
midfielders_duels_analytics = midfielders_duels_analytics.round(4) * 100
midfielders_duels_analytics = midfielders_duels_analytics[['Ground defending duel won %', 'Air duel won %','Ground loose ball duel won %','Ground attacking duel won %','Duels won %']]
midfielders_duels_analytics.to_pickle('./pickles/MIDFIELDERS/midfielders_duels_analytics.pkl')
midfielders_duels_analytics.describe().round(2).to_pickle('./pickles/MIDFIELDERS/midfielders_duels_analytics_stats.pkl')

midfielders_basic_info_duels = basic_info.filter(regex='duel')
midfielders_basic_info_duels = midfielders_basic_info_duels.drop(columns=['rank_duels'])
def_ba_info_duels_columns = list(map(lambda x:x.replace('duels_',''),midfielders_basic_info_duels.columns))
midfielders_basic_info_duels.columns = list(map(lambda x: (x.replace('won_','') + " won") if "won_" in x else x.replace('total_','')+' total' if "total_" in x else x.capitalize(), def_ba_info_duels_columns))
midfielders_basic_info_duels= midfielders_basic_info_duels[['Ground defending duel won', 'Air duel won','Ground loose ball duel won','Ground attacking duel won', 'Air duel total','Ground loose ball duel total','Ground attacking duel total', 'Total duels']]
midfielders_basic_info_duels= midfielders_basic_info_duels.astype('uint32')
midfielders_basic_info_duels.to_pickle('./pickles/MIDFIELDERS/midfielders_duels_info.pkl')
#


##################PASSESS##############
midfielders_passes_analytics = analytics.filter(regex='passes')
columns = list(map(lambda x:x.split(), list(map(lambda x: x.replace('acc_','') if 'acc_' in x else x ,list(map(lambda x: x.replace('passes_',''),midfielders_passes_analytics.columns))))))
for index,v in enumerate(columns): v.insert(len(v)-1,'accuracy');
midfielders_passes_analytics.columns = map(lambda x: " ".join(x).capitalize() ,columns)
midfielders_passes_analytics = midfielders_passes_analytics.round(4) * 100
midfielders_passes_analytics = midfielders_passes_analytics[['Simple pass accuracy %','High pass accuracy %','Head pass accuracy %','Cross accuracy %','Smart pass accuracy %','Launch accuracy %', 'Passes accuracy %']]
midfielders_passes_analytics.to_pickle('./pickles/MIDFIELDERS/midfielders_passes_analytics.pkl')
midfielders_passes_analytics.describe().round(2).to_pickle('./pickles/MIDFIELDERS/midfielders_passes_analytics_stats.pkl')



midfielders_basic_info_passes = basic_info.filter(regex='passes')
midfielders_basic_info_passes.columns = list(map(lambda x:x.replace('acc_','') + ' accurate' if 'acc_' in x else x.replace('total_','').capitalize(),list(map(lambda x:x.replace('passes_',''), midfielders_basic_info_passes.columns))))
midfielders_basic_info_passes.to_pickle('./pickles/MIDFIELDERS/midfielders_passes_info.pkl')
midfielders_basic_info_passes = midfielders_basic_info_passes.drop(columns=['Hand pass', 'Hand pass accurate'])
midfielders_basic_info_passes = midfielders_basic_info_passes[['Simple pass','High pass','Head pass','Cross','Smart pass','Launch','Simple pass accurate', 'High pass accurate', 'Head pass accurate','Cross accurate','Smart pass accurate','Launch accurate', 'Total passes']]
midfielders_basic_info_passes= midfielders_basic_info_passes.astype('uint32')
midfielders_basic_info_passes.to_pickle('./pickles/MIDFIELDERS/midfielders_passes_info.pkl')


######SHOTS##############
midfielders_shots_analytics = analytics.filter(regex='shots')
midfielders_shots_analytics.columns = list(map(lambda x:x.replace('_',' ').capitalize(), list(map(lambda x: x.replace('shots_',''),midfielders_shots_analytics.columns))))
midfielders_shots_analytics = midfielders_shots_analytics.round(4) * 100
midfielders_shots_analytics.to_pickle('./pickles/MIDFIELDERS/midfielders_shots_analytics.pkl')
midfielders_shots_analytics.describe().round(2).to_pickle('./pickles/MIDFIELDERS/midfielders_shots_analytics_stats.pkl')


midfielders_basic_info_shots = basic_info.filter(regex='shots').drop(columns=['rank_shots'])
midfielders_basic_info_shots.columns = list(map(lambda x:x.replace('_',' ').capitalize(),list(map(lambda x:x.replace('shots_',''), midfielders_basic_info_shots.columns))))
midfielders_basic_info_shots = midfielders_basic_info_shots[midfielders_basic_info_shots.columns[1:].append(pd.Index(['Total shots']))]
midfielders_basic_info_shots.to_pickle('./pickles/MIDFIELDERS/midfielders_shots_info.pkl')

#############MATCHES##############
matches  = analytics.filter(regex='matches')
matches.columns = list(map(lambda x : x.replace('matches_','').capitalize() , matches.columns))
matches = matches[['Start %', 'Bench %', 'Minutes %']]
matches = matches.round(4) * 100
matches.to_pickle('./pickles/MIDFIELDERS/midfielders_matches.pkl')
matches.describe().round(2).to_pickle('./pickles/MIDFIELDERS/midfielders_matches_stats.pkl')


###RANKING

midfielder_rank = MIDFIELDERS.filter(regex='rank')

midfielder_rank.columns = ['Passing rank', 'Duel rank','Shot rank', 'Overall rank','Age rank']
midfielder_rank = midfielder_rank[['Passing rank', 'Duel rank', 'Shot rank','Age rank','Overall rank',]]
midfielder_rank = midfielder_rank.round(2)
midfielder_rank.to_pickle('./pickles/MIDFIELDERS/midfielders_rankings.pkl')
midfielder_rank.describe().round(2).to_pickle('./pickles/MIDFIELDERS/midfielders_rankings_stats.pkl')

####OVERALLL
midfielders_overall = player_info_midfielders
midfielders_overall['Name'] = midfielders_overall.apply(lambda x: x['Firstname'] + ' ' + x['Lastname'], axis=1)
midfielders_overall = midfielders_overall[['Name','Age','Height','Weight','Foot']].merge(midfielders_passes_analytics[['Simple pass accuracy %', 'High pass accuracy %', 'Smart pass accuracy %', 'Passes accuracy %']], on='playerId').merge(midfielders_duels_analytics[['Ground defending duel won %', 'Ground attacking duel won %','Duels won %']], on='playerId').merge(midfielders_shots_analytics[['Shot acc %', 'Shot opportunity %']], on='playerId')
midfielders_overall = midfielders_overall.merge(midfielder_rank, on='playerId')
midfielders_overall.to_pickle('./pickles/MIDFIELDERS/midfielders_overall.pkl')
midfielders_overall.describe().round(2).to_pickle('./pickles/MIDFIELDERS/midfielders_stats.pkl')








#########
############FORWARDS##########
#############

FORWARDS = pd.read_pickle(path+'/pickles/FORWARDS.pkl')

###PLAYER_INFO
player_info_forwards = FORWARDS.filter(regex='player_info')
#
# ##Filter the plyaer_info
player_info_forwards = player_info_forwards[['player_info_firstName', 'player_info_lastName','player_info_foot','player_info_age','player_info_birthDate','player_info_height','player_info_weight','player_info_position','player_info_team', 'player_info_team_country']]
player_info_forwards.columns = list(map(lambda x: x.replace('player_info_', '').capitalize(), player_info_forwards.columns))

player_info_forwards.columns = list(map(lambda x: 'DOB' if x=='Birthdate' else x.replace('_',' '), player_info_forwards.columns))
player_info_forwards.to_pickle('./pickles/FORWARDS/forwards_player_info.pkl')


############### SPLIT ANALYTICS AND OTHERS###############

analytics = FORWARDS.filter(regex='%')
basic_info = FORWARDS.drop(columns=analytics.columns)




############################DUELS#########################
forwards_duels_analytics = analytics.filter(regex='duels')
columns = list(map(lambda x: x.replace('duels_', '').capitalize().split(),forwards_duels_analytics.columns))
for index, v in enumerate(columns): v.insert(len(v)-1, 'won'); columns[index]  =" ".join(columns[index]);
forwards_duels_analytics.columns = columns
forwards_duels_analytics = forwards_duels_analytics.round(4) * 100
forwards_duels_analytics = forwards_duels_analytics[['Ground defending duel won %', 'Air duel won %','Ground loose ball duel won %','Ground attacking duel won %','Duels won %']]
forwards_duels_analytics.to_pickle('./pickles/FORWARDS/forwards_duels_analytics.pkl')
forwards_duels_analytics.describe().round(2).to_pickle('./pickles/FORWARDS/forwards_duels_analytics_stats.pkl')

forwards_basic_info_duels = basic_info.filter(regex='duel')
forwards_basic_info_duels = forwards_basic_info_duels.drop(columns=['rank_duels'])
def_ba_info_duels_columns = list(map(lambda x:x.replace('duels_',''),forwards_basic_info_duels.columns))
forwards_basic_info_duels.columns = list(map(lambda x: (x.replace('won_','') + " won") if "won_" in x else x.replace('total_','')+' total' if "total_" in x else x.capitalize(), def_ba_info_duels_columns))
forwards_basic_info_duels= forwards_basic_info_duels[['Ground defending duel won', 'Air duel won','Ground loose ball duel won','Ground attacking duel won', 'Air duel total','Ground loose ball duel total','Ground attacking duel total', 'Total duels']]
forwards_basic_info_duels= forwards_basic_info_duels.astype('uint32')
forwards_basic_info_duels.to_pickle('./pickles/FORWARDS/forwards_duels_info.pkl')
#


##################PASSESS##############
forwards_passes_analytics = analytics.filter(regex='passes')
columns = list(map(lambda x:x.split(), list(map(lambda x: x.replace('acc_','') if 'acc_' in x else x ,list(map(lambda x: x.replace('passes_',''),forwards_passes_analytics.columns))))))
for index,v in enumerate(columns): v.insert(len(v)-1,'accuracy');
forwards_passes_analytics.columns = map(lambda x: " ".join(x).capitalize() ,columns)
forwards_passes_analytics = forwards_passes_analytics.round(4) * 100
forwards_passes_analytics = forwards_passes_analytics[['Simple pass accuracy %','High pass accuracy %','Head pass accuracy %','Cross accuracy %','Smart pass accuracy %','Launch accuracy %', 'Passes accuracy %']]
forwards_passes_analytics.to_pickle('./pickles/FORWARDS/forwards_passes_analytics.pkl')
forwards_passes_analytics.describe().round(2).to_pickle('./pickles/FORWARDS/forwards_passes_analytics_stats.pkl')


forwards_basic_info_passes = basic_info.filter(regex='passes')
forwards_basic_info_passes.columns = list(map(lambda x:x.replace('acc_','') + ' accurate' if 'acc_' in x else x.replace('total_','').capitalize(),list(map(lambda x:x.replace('passes_',''), forwards_basic_info_passes.columns))))
forwards_basic_info_passes.to_pickle('./pickles/FORWARDS/forwards_passes_info.pkl')
forwards_basic_info_passes = forwards_basic_info_passes.drop(columns=['Hand pass', 'Hand pass accurate'])
forwards_basic_info_passes = forwards_basic_info_passes[['Simple pass','High pass','Head pass','Cross','Smart pass','Launch','Simple pass accurate', 'High pass accurate', 'Head pass accurate','Cross accurate','Smart pass accurate','Launch accurate', 'Total passes']]
forwards_basic_info_passes= forwards_basic_info_passes.astype('uint32')
forwards_basic_info_passes.to_pickle('./pickles/FORWARDS/forwards_passes_info.pkl')


######SHOTS##############
forwards_shots_analytics = analytics.filter(regex='shots')
forwards_shots_analytics.columns = list(map(lambda x:x.replace('_',' ').capitalize(), list(map(lambda x: x.replace('shots_',''),forwards_shots_analytics.columns))))
forwards_shots_analytics = forwards_shots_analytics.round(4) * 100
forwards_shots_analytics.to_pickle('./pickles/FORWARDS/forwards_shots_analytics.pkl')
forwards_shots_analytics.describe().round(2).to_pickle('./pickles/FORWARDS/forwards_shots_analytics_stats.pkl')



forwards_basic_info_shots = basic_info.filter(regex='shots').drop(columns=['rank_shots'])
forwards_basic_info_shots.columns = list(map(lambda x:x.replace('_',' ').capitalize(),list(map(lambda x:x.replace('shots_',''), forwards_basic_info_shots.columns))))
forwards_basic_info_shots = forwards_basic_info_shots[forwards_basic_info_shots.columns[1:].append(pd.Index(['Total shots']))]
forwards_basic_info_shots.to_pickle('./pickles/FORWARDS/forwards_shots_info.pkl')


#############MATCHES##############
matches  = analytics.filter(regex='matches')
matches.columns = list(map(lambda x : x.replace('matches_','').capitalize() , matches.columns))
matches = matches[['Start %', 'Bench %', 'Minutes %']]
matches = matches.round(4) * 100
matches.to_pickle('./pickles/FORWARDS/forwards_matches.pkl')
matches.describe().round(2).to_pickle('./pickles/FORWARDS/forwards_matches_stats.pkl')




###RANKING

forward_rank = FORWARDS.filter(regex='rank')

forward_rank.columns = ['Passing rank', 'Duel rank','Shot rank', 'Overall rank','Age rank']
forward_rank = forward_rank[['Passing rank', 'Duel rank', 'Shot rank','Age rank','Overall rank',]]
forward_rank = forward_rank.round(2)
forward_rank.to_pickle('./pickles/FORWARDS/forwards_rankings.pkl')
forward_rank.describe().round(2).to_pickle('./pickles/FORWARDS/forwards_rankings_stats.pkl')

####OVERALLL
forwards_overall = player_info_forwards
forwards_overall['Name'] = forwards_overall.apply(lambda x: x['Firstname'] + ' ' + x['Lastname'], axis=1)
forwards_overall = forwards_overall[['Name','Age','Height','Weight','Foot']].merge(forwards_passes_analytics[['Simple pass accuracy %', 'Head pass accuracy %', 'Smart pass accuracy %', 'Passes accuracy %']], on='playerId').merge(forwards_duels_analytics[['Ground attacking duel won %', 'Air duel won %','Duels won %']], on='playerId').merge(forwards_shots_analytics[['Shot acc %', 'Shot opportunity %','Shot goal %']], on='playerId')
forwards_overall = forwards_overall.merge(forward_rank, on='playerId')
forwards_overall.to_pickle('./pickles/FORWARDS/forwards_overall.pkl')
forwards_overall.describe().round(2).round(2).to_pickle('./pickles/FORWARDS/forwards_stats.pkl')






