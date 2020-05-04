import pandas as pd
import json
from pandas import json_normalize
import os



path = os.getcwd()
p = pd.read_pickle(path + '/preprocessed/players.pkl')



matchesEng = pd.read_json('./football-data/matches/matches_England.json')
matchesFrance = pd.read_json('./football-data/matches/matches_France.json')
matchesGermany = pd.read_json('./football-data/matches/matches_Germany.json')
matchesItaly = pd.read_json('./football-data/matches/matches_Italy.json')
matchesSpain = pd.read_json('./football-data/matches/matches_Spain.json')



frames = [matchesEng, matchesFrance, matchesGermany, matchesItaly,matchesSpain]
matches = pd.concat(frames).reset_index()



matchIds = matches['wyId']
matchIds.rename('matchId', inplace=True)


teamData = matches['teamsData']

##Team keys for each match
keys = [x.keys() for x in teamData]
keys = list(map(lambda x: tuple(x), keys))
from collections import Counter

bench = Counter({})
lineup = Counter({})
minutes = Counter({})

from collections import Counter
for x,y in zip(range(len(keys)), matchIds):
    match = teamData[x]
    team_keys = list(match.keys())
    home = match[str(team_keys[0])]
    away = match[str(team_keys[1])]


    ###################HOME#######################
    # #Lineups
    hLine = Counter({x['playerId']:1 for x in home['formation']['lineup']})
    lineup = lineup + hLine


    #Bench
    hBench = Counter({x['playerId']: 1 for x in home['formation']['bench']})
    bench = bench + hBench

    ##Minutes played
    if (home['formation']['substitutions'] != "null"):
        startMins = Counter({x['playerOut'] : x['minute'] for x in home['formation']['substitutions']})
        subMins = Counter({x['playerIn']: 90 - x['minute'] for x in home['formation']['substitutions'] })
        allGameKeys = set(hLine.keys()) - (set(startMins.keys() | set(subMins.keys())))
        allGame = Counter({k: 90 for k in allGameKeys})
        minutes = minutes + startMins + subMins + allGame
    else:
        minutes = minutes + Counter({k: 90 for k in hLine.keys()})




    ###################AWAY#######################
    #Lineups
    aLine = Counter({x['playerId']:1 for x in away['formation']['lineup']})
    lineup = lineup + aLine

    #Bench
    aBench = Counter({x['playerId']: 1 for x in away['formation']['bench']})
    bench = bench + aBench


    ##Minutes played
    if (away['formation']['substitutions'] != "null"):
        startMins = Counter({x['playerOut'] : x['minute'] for x in away['formation']['substitutions']})
        subMins = Counter({x['playerIn']: 90 - x['minute'] for x in away['formation']['substitutions'] })
        allGameKeys = set(aLine.keys()) - (set(startMins.keys() | set(subMins.keys())))
        allGame = Counter({k: 90 for k in allGameKeys})
        minutes = minutes + startMins + subMins + allGame
    else:
        minutes = minutes + Counter({k: 90 for k in aLine.keys()})



#PLayer dataframe
players = pd.DataFrame.from_dict(minutes, orient='index', columns=['minutes'])
players.index.name = "playerId"
#add bench
#
for k,v in bench.items(): players.loc[k,'bench'] = v
for k,v in lineup.items(): players.loc[k,'start'] = v


#Drop if player has'nt played a minute
players.dropna(subset=['minutes'], inplace=True)
players.fillna(0, inplace=True)




#########Relevant metrics#########


##Total number of games
##Merge countries
countries = players.reset_index().merge(p, how='left', left_on="playerId", right_on="wyId")[['playerId','team_country']].set_index('playerId')
players = players.merge(countries, how="inner", on="playerId").dropna()

###Total gamesx
d = {"England": max(matchesEng['gameweek']),
     "Germany": max(matchesGermany['gameweek']),
     "France": max(matchesFrance['gameweek']),
     "Italy": max(matchesItaly['gameweek']),
     "Spain": max(matchesSpain['gameweek']) }




players['leauge_total_games'] = players.apply(lambda x: d[x['team_country']], axis=1)
players['leauge_total_minutes'] = players.apply(lambda x: x['leauge_total_games'] * 90, axis=1)
players['minutes %'] = players.apply(lambda x: x['minutes'] / x['leauge_total_minutes'], axis=1)
players['bench %'] = players.apply(lambda x: x['bench'] / x['leauge_total_games'], axis=1)
players['start %'] = players.apply(lambda x: x['start'] / x['leauge_total_games'], axis=1)





#To pickle
players.to_pickle('./playersMatchInfo.pkl')