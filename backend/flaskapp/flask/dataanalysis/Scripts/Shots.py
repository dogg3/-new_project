import pandas as pd
import re


events = pd.read_pickle('./allEvents.pkl')
event_tags = pd.read_csv('./football-data/tags2name.csv')

eventGroups = events.groupby('eventName')

###Shots########
shots = eventGroups.get_group('Shot')

#shots
players = shots.groupby(['playerId']).agg(t=('tags','sum'), total_shots=('tags','count'))

#goals
goals = players.t.apply(lambda x: x.count({'id':101}) if type(x)==list else x)
players['shot_goal']  = goals
players['shot_goal %']  = players['shot_goal'] / players.total_shots


#oppertunityu
oppertunity = players.t.apply(lambda x: x.count({'id':201}) if type(x)==list else x)
players['shot_opportunity']  = oppertunity
players['shot_opportunity %']  = players['shot_opportunity'] / players.total_shots

#Accurtacy
oppertunity = players.t.apply(lambda x: x.count({'id':1801}) if type(x)==list else x)
players['shot_acc'] = oppertunity
players['shot_acc %'] = players['shot_acc'] / players.total_shots

#drop the tags
players.drop(columns=['t'], inplace=True)
players = players.fillna(0)


players.to_pickle('./playersShots.pkl')