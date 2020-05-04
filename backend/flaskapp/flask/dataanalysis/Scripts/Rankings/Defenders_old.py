from scipy import stats
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

import os

pd.set_option('display.max_columns', 999)
pd.set_option('display.width', 999)


path = os.getcwd()

###############Loading eventypes and normalize the data by multiplying by percentage of minutes played to all minutes###########

defenders = pd.read_pickle(path+'/preprocessed/final/defenders.pkl')
defMinutesPer = defenders.loc[:,'matches_minutes %']
defPasses = defenders.loc[:, ['passes_acc_Simple pass %', 'passes_acc_Head pass %', 'passes_acc_High pass %']].mul(defMinutesPer, axis=0)
defDuels = defenders.loc[:,['duels_Ground defending duel %', 'duels_Air duel %']].mul(defMinutesPer, axis=0)





#########################SUBEVEVENTS RANKS#########################

##1-33 because of 3 equaly important subevetns in passes
forPasses_scaled =forPasses.apply(lambda x: 32 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)

##1-50 because of 2 equaly important subevetns in passes
forDuels_scaled = forDuels.apply(lambda x: 49 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)

##1-50 because of 2 equaly important subevetns in passes
forShots_scaled = forShots.apply(lambda x: 49 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)


##Save the subevents ranks to dataframe
EventRankings = pd.DataFrame({'rank_pass': forPasses_scaled,'rank_duels':forDuels_scaled, 'rank_shots':forShots_scaled})


##Transform data to normal distrubution and eliminate outliers
# from sklearn.preprocessing import PowerTransformer
# power = PowerTransformer(standardize=True)
# rank_power = power.fit_transform(defDuelRank)
# rankScaledDf = pd.DataFrame(rank_power, columns=defDuelRank.columns)
# rankScaledDf.index= defDuelRank.index


#Scale data for specific weight and normalize fopr minuites played %

minutes = rankScaledDf.merge(defenders, on='playerId', how='inner').loc[:,'matches_minutes %']


passes = rankScaledDf.filter(regex='pass')
rankScaledDf.loc[:,passes.columns] = passes.apply(lambda x: 33 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).mul(minutes, axis=0)
rankScaledDf.loc[:,'pass_rank'] = rankScaledDf.filter(regex=('pass')).sum(axis=1)



duels = rankScaledDf.filter(regex='duels')
rankScaledDf.loc[:,duels.columns] = duels.apply(lambda x: 50 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).mul(minutes, axis=0)
rankScaledDf.loc[:,'duel_rank'] = rankScaledDf.filter(regex=('duels')).sum(axis=1)


##Total event rank
rankScaledDf.loc[:,'event_rank'] = (rankScaledDf.loc[:,'duel_rank'] * 0.7) + (rankScaledDf.loc[:,'pass_rank'] * 0.3)

import re
#Drop scaled % columns
rankScaledDf = rankScaledDf.drop(columns=list(filter(lambda x: len((re.findall('%',x))) != 0, rankScaledDf.columns)))


###Age
rankScaledDfAge =  rankScaledDf.merge(defenders.filter(regex=('age')),on='playerId')
age_rank_dict = dict(zip(np.arange(20,31), np.arange(1,11)))

ageRank = []
for x in rankScaledDfAge.loc[:,'player_info_age']:
    if x >= max(age_rank_dict.keys()):
        ageRank.append(1)
    elif x <= min(age_rank_dict.keys()):
        ageRank.append(10)
    else:
        ageRank.append(age_rank_dict[x])



rankScaledDfAge.loc[:,'age_rank'] = ageRank
rankScaledDfAge = rankScaledDfAge.drop(columns=['player_info_age'])

rankScaledDfAge.loc[:,'age_rank'] = list(map(lambda x: 60 * (x - min(rankScaledDfAge.loc[:,'age_rank'])) / (max(rankScaledDfAge.loc[:,'age_rank'])-(min(rankScaledDfAge.loc[:,'age_rank'])))+1, rankScaledDfAge.loc[:,'age_rank']))

rankScaledDfAge.loc[:,'player_rank'] = rankScaledDfAge.loc[:,['event_rank', 'age_rank']].sum(axis=1)



# ###Some grap-hs
#plt.title('Event rank vs age')
# x = rankScaledDfAge.loc[:, 'event_rank']
# y = rankScaledDfAge.loc[:, 'age_rank']
# plt.scatter(x,y)

rankScaledDfAge.to_pickle(path +'/ranking_pickles/defneders_rank.pkl')
