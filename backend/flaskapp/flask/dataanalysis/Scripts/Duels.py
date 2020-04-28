import pandas as pd


events = pd.read_pickle('./allEvents.pkl')
event_tags = pd.read_csv('./football-data/tags2name.csv')

eventGroups = events.groupby('eventName')

###DUELS########
duels = eventGroups.get_group('Duel')


##Grouping the events under each player and subevent
players = duels.groupby(['playerId','subEventName']).agg(won=('tags','sum'), total=('tags','count')).unstack()
players.columns = ["_".join(x) for x in players.columns.ravel()]

#id 701 is won counting these in the list of tags in each subevent
won = players.filter(regex='won').applymap(lambda x : x.count({'id':701}) if type(x)==list else x)
players[won.columns] = won
players = players.fillna(0)



#RELEVANT METRICS
players['total duels'] = players.filter(regex='total').sum(axis=1)
players['duels %']=players.filter(regex='won').sum(axis=1) / players['total duels']
players['Air duel %']  = players['won_Air duel'] / players['total_Air duel']
players['Ground attacking duel %']  = players['won_Ground attacking duel'] / players['total_Ground attacking duel']
players['Ground defending duel %']  = players['won_Ground defending duel'] / players['total_Ground defending duel']
players['Ground loose ball duel %']  = players['won_Ground loose ball duel'] / players['total_Ground loose ball duel']
players = players.fillna(0)


players.to_pickle('./playersDuels.pkl')

# #Make types more memory efficient
# players = players.astype('uint32')



