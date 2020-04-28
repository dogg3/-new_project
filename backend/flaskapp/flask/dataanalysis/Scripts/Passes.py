import pandas as pd
import re

events = pd.read_pickle('./allEvents.pkl')
event_tags = pd.read_csv('./football-data/tags2name.csv')

eventGroups = events.groupby('eventName')


###PAsses########
passes = eventGroups.get_group('Pass')

##Grouping the events under each player and subevent
players = passes.groupby(['playerId','subEventName']).agg(acc=('tags','sum'), total=('tags','count')).unstack()
players.columns = ["_".join(x) for x in players.columns.ravel()]


#id 1801 is accuracy counting these in the list of tags in each subevent
acc = players.filter(regex='acc').applymap(lambda x : x.count({'id':1801}) if type(x)==list else x)
players[acc.columns] = acc
players = players.fillna(0)


#RELEVANT METRICS
players['total passes'] = players.filter(regex='total').sum(axis=1)
#accuracy overall
players['passes %']=players.filter(regex='acc').sum(axis=1) / players['total passes']
players = players.fillna(0)

#accuracy subevents
subAcc = players.filter(regex="acc").values / players.filter(regex='total_').values
colNames = list(map(lambda x: x+" %" ,list(filter(lambda x: re.findall("acc", x), players.columns))))
dfObj = pd.DataFrame(subAcc, columns=colNames, index=players.index)

#merge
players = pd.merge(players,dfObj, on='playerId',how='inner')
players = players.fillna(0)

#sabe
players.to_pickle('./playersPasses.pkl')