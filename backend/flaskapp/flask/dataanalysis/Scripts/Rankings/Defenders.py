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
defPasses_scaled =defPasses.apply(lambda x: 32 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)

##1-50 because of 2 equaly important subevetns in passes
defDuels_scaled = defDuels.apply(lambda x: 49 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)



##Save the subevents ranks to dataframe
EventRankings = pd.DataFrame({'rank_pass': defPasses_scaled,'rank_duels':defDuels_scaled})




######CONCATENATE AND AGGREGATED RANK################

###### Rescale each feature to a range that corresponds to the desired weight when all is summed.

##1-30
dePasses_rank_final = defPasses_scaled.apply(lambda x: 29 * (x - min(defPasses_scaled.values)) / (max(defPasses_scaled.values)-min(defPasses_scaled.values))+1)

# ##1-70
defDuels_rank_final = defDuels_scaled.apply(lambda x: 69 * (x - min(defDuels_scaled.values)) / (max(defDuels_scaled.values)-min(defDuels_scaled.values))+1)



## SUM to get overall rank
EventRankings['rank_overall'] = (dePasses_rank_final + defDuels_rank_final)




######################AGE AGE AGE AGE POINTS ###################
#
# #### max 30 points >=18
# ##### min 0 points <= 28
# #### 3 points for each year between
age_rank_dict = dict(zip(np.arange(18, 29), np.arange(30, 1, -3)))

ages = EventRankings.merge(defenders, how='inner', on='playerId').loc[:, 'player_info_age']

age_rank = []
for age in ages:
    if age >= (28):
        age_rank.append(0)
    elif age < (18):
        age_rank.append(30)
    else:
        age_rank.append(age_rank_dict[age])

EventRankings.loc[:, 'rank_age'] = age_rank

##ADD AGE EXTRA POINTS TO OVERALL and SORT BY RANK OVERALL #####
EventRankings.loc[:,'rank_overall'] = EventRankings.loc[:,'rank_overall']+ EventRankings.loc[:,'rank_age']
EventRankings = EventRankings.sort_values(by="rank_overall",ascending=False)



######MERGE WITH POSITION DATAFRAME AND SAVE###########
players = EventRankings.merge(defenders, on='playerId', how='inner')

players.to_pickle(path +'/FINAL_PLAYER_DATA/DEFENDERS.pkl')



