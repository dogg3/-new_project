import pandas as pd
import os
pd.set_option('display.max_columns', 999)
pd.set_option('display.width', 999)




dirname = os.path.dirname(__file__)

######DEFENDERS######
defendersPlayerInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_player_info.pkl'));

defendersDuelsInfo = pd.read_pickle(os.path.join(dirname,'Scripts/Rankings/pickles/DEFENDERS/defenders_duels_info.pkl'));
defendersDuelsAnalytics = pd.read_pickle(os.path.join( dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_duels_analytics.pkl'));
defendersDuelsAnalyticsStats = pd.read_pickle(os.path.join( dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_duels_analytics_stats.pkl'));


defendersPassesInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_passes_info.pkl'));
defendersPassesAnalytics = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_passes_analytics.pkl'));
defendersPassesAnalyticsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_passes_analytics_stats.pkl'));



defendersMatches = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_matches.pkl'));
defendersMatchesStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_matches_stats.pkl'));
defendersRankings = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_rankings.pkl'));
defendersRankingsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_rankings_stats.pkl'));
defendersOverall = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_overall.pkl'));
defendersStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/DEFENDERS/defenders_stats.pkl'));




def getDefendersPlayerInfo():
    return defendersPlayerInfo

####DUELS####
def getDefendersDuelsInfo():
    return defendersDuelsInfo

def getDefendersDuelsAnalytics():
    return defendersDuelsAnalytics

def getDefendersDuelsAnalyticsStats():
    return defendersDuelsAnalyticsStats



####PASSES####
def getDefendersPassesInfo():
    return defendersPassesInfo


def getDefendersPassesAnalytics():
    return defendersPassesAnalytics


def getDefendersPassesAnalyticsStats():
    return defendersPassesAnalyticsStats



def getDefendersMatches():
    return defendersMatches;
def getDefendersMatchesStats():
    return defendersMatchesStats;




def getDefendersRankings():
    return defendersRankings;
def getDefendersRankingsStats():
    return defendersRankingsStats;



def getDefendersOverall():
    return defendersOverall;

def getDefendersStats():
    return defendersStats;

















######MIDFIELDERS######
midfieldersPlayerInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_player_info.pkl'));

midfieldersDuelsInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_duels_info.pkl'));
midfieldersDuelsAnalytics = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_duels_analytics.pkl'));
midfieldersDuelsAnalyticsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_duels_analytics_stats.pkl'));



midfieldersPassesInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_passes_info.pkl'));
midfieldersPassesAnalytics = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_passes_analytics.pkl'));
midfieldersPassesAnalyticsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_passes_analytics_stats.pkl'));


midfieldersShotsInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_shots_info.pkl'));
midfieldersShotsAnalytics = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_shots_analytics.pkl'));
midfieldersShotsAnalyticsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_shots_analytics_stats.pkl'));



midfieldersMatches = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_matches.pkl'));
midfieldersMatchesStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_matches_stats.pkl'));
midfieldersRankings = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_rankings.pkl'));
midfieldersRankingsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_rankings_stats.pkl'));
midfieldersOverall = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_overall.pkl'));
midfieldersStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/MIDFIELDERS/midfielders_stats.pkl'));




def getMidfieldersPlayerInfo():
    return midfieldersPlayerInfo


####DUELS####
def getMidfieldersDuelsInfo():
    return midfieldersDuelsInfo

def getMidfieldersDuelsAnalytics():
    return midfieldersDuelsAnalytics

def getMidfieldersDuelsAnalyticsStats():
    return midfieldersDuelsAnalyticsStats



####PASSES####
def getMidfieldersPassesInfo():
    return midfieldersPassesInfo

def getMidfieldersPassesAnalytics():
    return midfieldersPassesAnalytics
def getMidfieldersPassesAnalyticsStats():
    return midfieldersPassesAnalyticsStats


##SHOTS
def getMidfieldersShotsInfo():
    return midfieldersShotsInfo

def getMidfieldersShotsAnalytics():
    return midfieldersShotsAnalytics
def getMidfieldersShotsAnalyticsStats():
    return midfieldersShotsAnalyticsStats



def getMidfieldersMatches():
    return midfieldersMatches;
def getMidfieldersMatchesStats():
    return midfieldersMatchesStats;


def getMidfieldersRankings():
    return midfieldersRankings;
def getMidfieldersRankingsStats():
    return midfieldersRankingsStats;

def getMidfieldersOverall():
    return midfieldersOverall;

def getMidfieldersStats():
    return midfieldersStats;









######FORWARDS######






######FORWARDS######
forwardsPlayerInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_player_info.pkl'));

forwardsDuelsInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_duels_info.pkl'));
forwardsDuelsAnalytics = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_duels_analytics.pkl'));
forwardsDuelsAnalyticsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_duels_analytics_stats.pkl'));



forwardsPassesInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_passes_info.pkl'));
forwardsPassesAnalytics = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_passes_analytics.pkl'));
forwardsPassesAnalyticsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_passes_analytics_stats.pkl'));


forwardsShotsInfo = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_shots_info.pkl'));
forwardsShotsAnalytics = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_shots_analytics.pkl'));
forwardsShotsAnalyticsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_shots_analytics_stats.pkl'));



forwardsMatches = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_matches.pkl'));
forwardsMatchesStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_matches_stats.pkl'));
forwardsRankings = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_rankings.pkl'));
forwardsRankingsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_rankings_stats.pkl'));
forwardsOverall = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_overall.pkl'));
forwardsStats = pd.read_pickle(os.path.join(dirname, 'Scripts/Rankings/pickles/FORWARDS/forwards_stats.pkl'));




def getForwardsPlayerInfo():
    return forwardsPlayerInfo


####DUELS####
def getForwardsDuelsInfo():
    return forwardsDuelsInfo

def getForwardsDuelsAnalytics():
    return forwardsDuelsAnalytics

def getForwardsDuelsAnalyticsStats():
    return forwardsDuelsAnalyticsStats



####PASSES####
def getForwardsPassesInfo():
    return forwardsPassesInfo

def getForwardsPassesAnalytics():
    return forwardsPassesAnalytics
def getForwardsPassesAnalyticsStats():
    return forwardsPassesAnalyticsStats


##SHOTS
def getForwardsShotsInfo():
    return forwardsShotsInfo

def getForwardsShotsAnalytics():
    return forwardsShotsAnalytics
def getForwardsShotsAnalyticsStats():
    return forwardsShotsAnalyticsStats



def getForwardsMatches():
    return forwardsMatches;
def getForwardsMatchesStats():
    return forwardsMatchesStats;


def getForwardsRankings():
    return forwardsRankings;
def getForwardsRankingsStats():
    return forwardsRankingsStats;

def getForwardsOverall():
    return forwardsOverall;

def getForwardsStats():
    return forwardsStats;





