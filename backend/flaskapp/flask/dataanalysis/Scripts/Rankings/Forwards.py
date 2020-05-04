from scipy import stats
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

import os

pd.set_option('display.max_columns', 999)
pd.set_option('display.width', 999)

path = os.getcwd()


###############Loading eventypes and normalize the data by multiplying by percentage of minutes played to all minutes###########

forwards = pd.read_pickle(path+'/preprocessed/final/forwards.pkl')
forMinutesPer = forwards.loc[:,'matches_minutes %']
forPasses = forwards.loc[:, ['passes_acc_Simple pass %', 'passes_acc_Head pass %', 'passes_acc_Smart pass %']].mul(forMinutesPer, axis=0)
forDuels = forwards.loc[:,['duels_Ground attacking duel %', 'duels_Air duel %']].mul(forMinutesPer, axis=0)
forShots = forwards.loc[:, ['shots_shot_acc %','shots_shot_opportunity %','shots_shot_goal %']].mul(forMinutesPer, axis=0)





#########################SUBEVEVENTS RANKS#########################

##1-33 because of 3 equaly important subevetns in passes
forPasses_scaled =forPasses.apply(lambda x: 32 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)

##1-50 because of 2 equaly important subevetns in passes
forDuels_scaled = forDuels.apply(lambda x: 49 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)

##1-50 because of 2 equaly important subevetns in passes
forShots_scaled = forShots.apply(lambda x: 49 * (x - min(x)) / (max(x)-min(x))+1,  axis=0).sum(axis=1)


##Save the subevents ranks to dataframe
EventRankings = pd.DataFrame({'rank_pass': forPasses_scaled,'rank_duels':forDuels_scaled, 'rank_shots':forShots_scaled})



######CONCATENATE AND AGGREGATED RANK################

###### Rescale each feature to a range that corresponds to the desired weight when all is summed.

##1-30
forPasses_rank_final = forPasses_scaled.apply(lambda x: 29 * (x - min(forPasses_scaled.values)) / (max(forPasses_scaled.values)-min(forPasses_scaled.values))+1)

# ##1-30
forDuels_rank_final = forDuels_scaled.apply(lambda x: 29 * (x - min(forDuels_scaled.values)) / (max(forDuels_scaled.values)-min(forDuels_scaled.values))+1)

# ##1-15
forShots_rank_final = forShots_scaled.apply(lambda x: 39 * (x - min(forShots_scaled.values)) / (max(forShots_scaled.values)-min(forShots_scaled.values))+1)


## SUM to get overall rank
EventRankings['rank_overall'] = (forPasses_rank_final + forDuels_rank_final + forShots_rank_final)




######################AGE AGE AGE AGE POINTS ###################
#
# #### max 30 points >=18
# ##### min 0 points <= 28
# #### 3 points for each year between
age_rank_dict = dict(zip(np.arange(18, 29), np.arange(30, 1, -3)))

ages = EventRankings.merge(forwards, how='inner', on='playerId').loc[:, 'player_info_age']

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
players = EventRankings.merge(forwards, on='playerId', how='inner')

players.to_pickle(path +'/FINAL_PLAYER_DATA/FORWARDS.pkl')