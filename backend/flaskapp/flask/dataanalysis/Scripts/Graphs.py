import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


plt.style.use('seaborn-dark')
plt.grid(True)


pd.set_option('display.max_columns', 89888)
pd.set_option('display.width',8999)
###DUELS######
# #Duels won vs total duels

# duels = pd.read_pickle('./playersDuels.pkl')
#
# df  = duels.describe().loc[['mean', 'std']]
#
# x = np.arange(len(df.columns) ) + 1
#


# x = duels.loc[:,'total duels']
# y = duels.loc[:,'duels %'] * 100
# plt.ylabel('% of duels won')
# plt.xlabel('Total amount of duels')
# plt.title("Amount of duels vs % duels won ", fontsize=19)
# plt.text(s='Each dot is a player\n2,686,850 events', x=800,  y=90, fontsize=15, c='r')
# plt.scatter(x,y, alpha=.2)
# plt.tight_layout()
# plt.show()
#
#
# won = df.filter(regex=('won'))
# total = df.filter(regex=('total'))
# per = df.filter(regex=('%')) * 100
# plt.figure(figsize=(10,5))
#
# ##Duels % different subevents
# x = np.arange(len(per.columns))
# mean = per.values[0]
# std = per.values[1]
#
# plt.bar(x, mean, width=.2, label='mean')
# plt.bar(x+.22, std, width=.2, label='std')
# labels = list(per.columns)
# plt.xticks(x+.11, labels, fontsize=15, rotation=10)
# plt.ylabel('% won', fontsize=15)
# plt.legend(loc=('upper right'), fontsize=16)
# plt.title("Relevant metrics",fontsize=19)
# plt.tight_layout()
# plt.show()





#################Passes##########################
# passes = pd.read_pickle('./playersPasses.pkl')
# x = passes.loc[:,'total passes']
# y = passes.loc[:,'passes %'] * 100
# plt.ylabel('Pass accuracy %')
# plt.xlabel('Total amount of passes')
# plt.title("Amount of passes vs % pass accuracy ", fontsize=19)
# plt.text(s='Each dot is a player\n2,686,850 events', x=1500,  y=40, fontsize=15, c='r')
# plt.scatter(x,y, alpha=.2)
# plt.tight_layout()
# plt.show()
#
# df = passes.describe()
# acc = df.filter(regex=('acc'))
# total = df.filter(regex=('total'))
# per = df.filter(regex=('%')) * 100
#
#
# mean = per.loc['mean',:].values
# std = per.loc['std',:].values
# x = np.arange(len(per.columns))
# plt.figure(figsize=(10,5))
#
# plt.bar(x, mean, width=.2, label='mean')
# plt.bar(x+.22, std, width=.2, label='std')
# labels = list(per.columns)
# plt.xticks(x+.11, labels, fontsize=15, rotation=10)
# plt.ylabel('% won', fontsize=15)
# plt.legend(loc=('upper right'), fontsize=16)
# plt.title("Relevant metrics",fontsize=19)
# plt.tight_layout()
#



######SHOTS#####

import os
path = os.getcwd()
p = pd.read_pickle(path + '/preprocessed/players.pkl')

shots = pd.read_pickle('./playersShots.pkl')
forShots = p.groupby('position').get_group('Forward').merge(shots.reset_index(), left_on="wyId", right_on='playerId', how='inner').set_index('playerId')[shots.columns]
defShots = p.groupby('position').get_group('Defender').merge(shots.reset_index(), left_on="wyId", right_on='playerId', how='inner').set_index('playerId')[shots.columns]
midShots = p.groupby('position').get_group('Midfielder').merge(shots.reset_index(), left_on="wyId", right_on='playerId', how='inner').set_index('playerId')[shots.columns]


df = forShots.describe()
acc = df.filter(regex=('acc'))
total = df.filter(regex=('total'))
per = df.filter(regex=('%')) * 100


mean = per.loc['mean',:].values
std = per.loc['std',:].values
x = np.arange(len(per.columns))
plt.figure(figsize=(6,3))
#
plt.bar(x, mean, width=.2, label='mean')
plt.bar(x+.22, std, width=.2, label='std')
labels = list(per.columns)
plt.xticks(x+.11, labels, fontsize=15, rotation=10)
plt.ylabel('Amount', fontsize=15)
plt.legend(loc=('upper right'), fontsize=16)
plt.title("Forwards",fontsize=19)
plt.show()
plt.tight_layout()
#

plt.figure(figsize=(6,3))

metrics = list(zip(defShots.describe().loc[['mean', 'std'],'total_shots'].values, midShots.describe().loc[['mean', 'std'],'total_shots'].values, forShots.describe().loc[['mean', 'std'],'total_shots'].values))
mean  = metrics[:][0]
std  = metrics[:][1]
poses = ['Defenders', 'Midfielders','Forwards']
x = np.arange(3)
plt.bar(x, mean, width=.2, label='mean', color='g')
plt.bar(x+.22, std, width=.2, label='std', color='r')
plt.legend(loc=('upper left'), fontsize=16)
plt.yticks(fontsize=15)
plt.ylabel('Total shots', fontsize=16)
plt.title('Total shots difference positions', fontsize=19)
plt.xticks(x+.11, poses, fontsize=15, rotation=10)
plt.tight_layout()
plt.show()

