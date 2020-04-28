import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import os



prem = pd.read_json('./football-data/events_England.json')
laliga = pd.read_json('./football-data/events_Spain.json')
ligue1 = pd.read_json('./football-data/events_France.json')
seriea = pd.read_json('./football-data/events_Italy.json')
bundesleauge = pd.read_json('./football-data/events_Germany.json')


frames = [laliga, ligue1, seriea, bundesleauge,prem]
eventsDf = pd.concat(frames)

del laliga
del ligue1
del seriea
del prem
del bundesleauge

##DATA OPTIMIZATION
eventsDf.eventName = eventsDf.eventName.astype('category')
eventsDf.index = eventsDf.index.astype('uint32')
eventsDf.eventId = eventsDf.eventId.astype('uint32')
eventsDf.id = eventsDf.eventId.astype('uint32')
eventsDf.teamId = eventsDf.teamId.astype('uint32')
eventsDf.playerId = eventsDf.playerId.astype('uint32')
eventsDf.matchId = eventsDf.matchId.astype('uint32')

#DROPING
eventsDf.drop(['matchPeriod','eventSec', 'subEventId'], axis=1, inplace=True)


##JOINING
path = os.getcwd()
players = pd.read_pickle(path + '/preprocessed/players.pkl')
players['playerId'] = players.index

events_df_joined = pd.merge(eventsDf, players, on='playerId', how='inner')
events_df_joined.to_pickle('./allEvents.pkl')