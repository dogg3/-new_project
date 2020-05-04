import pandas as pd
from pandas import json_normalize
import json

players = pd.read_json('./football-data/players.json')

##We use orient records inorder to not get any indices
json_data = players.to_json(orient='records')

#convert to a json dict datastructure in order to be able to reference values inside it
datastore = json.loads(json_data)
players = json_normalize(datastore)

##Calcultate a ge
import datetime as dt
today = pd.to_datetime('today')
players['age'] = today.year  - pd.to_datetime(players['birthDate'].values).year


columns = ['wyId','weight', 'firstName', 'middleName', 'lastName', 'currentTeamId','birthDate', 'height', 'foot', 'age', 'role.name',]

players = players.loc[:,columns]


###Teams

wyscout_teams = pd.read_json('./football-data/teams.json')

#Flatten the nested values
json_data = wyscout_teams.to_json(orient='records')

datastore = json.loads(json_data)

teams = json_normalize(datastore)

teams = teams.rename(columns={'officialName':'team', 'area.name': 'team_country', 'city':'team_city'})

#pick relevant coplumns
teams = teams[['team_city','team', 'team_country', 'wyId']]

players = players.merge(teams, left_on='currentTeamId', right_on='wyId', how="inner", suffixes=('','_del')).set_index('wyId')
players  = players.drop('wyId_del', axis=1)

##Drop wales
players = players[~(players['team_country'] == 'Wales')]
##drop monaco
players = players[~(players['team_country'] == 'Monaco')]

players = players.rename(columns={"role.name": "position"})


##Escape double unicodes escapes
players = players.applymap(lambda x: x.encode().decode('unicode-escape') if type(x) == str else x)

players.to_pickle('./preprocessed/players.pkl')