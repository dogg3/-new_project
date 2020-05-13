from scipy import stats
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

import os

pd.set_option('display.max_columns', 999)
pd.set_option('display.width', 999)
path = os.getcwd()


###############Loading eventypes and normalize the data by multiplying by percentage of minutes played to all minutes###########
midfielders = pd.read_pickle('../../preprocessed/final/midfielders.pkl')
midMinutesPer = midfielders.loc[:,'matches_minutes %']
midPasses = midfielders.loc[:, ['passes_acc_Simple pass %', 'passes_acc_High pass %', 'passes_acc_Smart pass %']].mul(midMinutesPer, axis=0)
midDuels = midfielders.loc[:,['duels_Ground defending duel %', 'duels_Ground attacking duel %']].mul(midMinutesPer, axis=0)
midShots = midfielders.loc[:, ['shots_shot_acc %','shots_shot_opportunity %']].mul(midMinutesPer, axis=0)





#########################SUBEVEVENTS RANKS#########################
####Rescale each subevent so the potential maximum sum for a row adds up to 100.

##1-33 because of 3 equaly important subevetns in passes
midPasses_scaled =midPasses.apply(lambda x: 32 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)

##1-50 because of 2 equaly important subevetns in passes
midDuels_scaled = midDuels.apply(lambda x: 49 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)

##1-50 because of 2 equaly important subevetns in passes
midShots_scaled = midShots.apply(lambda x: 49 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)


##Save the subevents ranks to dataframe
EventRankings = pd.DataFrame({'rank_pass': midPasses_scaled,'rank_duels':midDuels_scaled, 'rank_shots':midShots_scaled})


######CONCATENATE AND AGGREGATED RANK################

###### Rescale each feature to a range that corresponds to the desired weight when all is summed.

##1-50
midPasses_rank_final = midPasses_scaled.apply(lambda x: 49 * (x - min(midPasses_scaled.values)) / (max(midPasses_scaled.values)-min(midPasses_scaled.values))+1)

# ##1-34
midDuels_rank_final = midDuels_scaled.apply(lambda x: 34 * (x - min(midDuels_scaled.values)) / (max(midDuels_scaled.values)-min(midDuels_scaled.values))+1)

# ##1-15
midShots_rank_final = midShots_scaled.apply(lambda x: 14 * (x - min(midShots_scaled.values)) / (max(midShots_scaled.values)-min(midShots_scaled.values))+1)

EventRankings['rank_overall'] = (midPasses_rank_final + midDuels_rank_final + midShots_rank_final)



######################AGE AGE AGE AGE POINTS ###################

#### max 30 points >=18
##### min 0 points <= 28
#### 3 points for each year between
age_rank_dict = dict(zip(np.arange(18, 29), np.arange(30, 1, -3)))

ages = EventRankings.merge(midfielders, how='inner', on='playerId').loc[:, 'player_info_age']

age_rank = []
for age in ages:
    if age >= (28):
        age_rank.append(0)
    elif age < (18):
        age_rank.append(30)
    else:
        age_rank.append(age_rank_dict[age])

EventRankings.loc[:, 'rank_age'] = age_rank




##ADD AGE EXTRA POINTS TO OVERALL #####
EventRankings.loc[:,'rank_overall'] = EventRankings.loc[:,'rank_overall']+ EventRankings.loc[:,'rank_age']
EventRankings = EventRankings.sort_values(by="rank_overall",ascending=False)



######MERGE WITH POSITION DATAFRAME AND SAVE###########
players = EventRankings.merge(midfielders, on='playerId', how='inner')

players.to_pickle(path+'/pickles/MIDFIELDERS.pkl')