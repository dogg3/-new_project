from .defenders import DefendersStats, DefendersPlayerInfo, DefendersDuelsInfo, DefendersDuelsAnalytics,DefendersDuelsAnalyticsStats,DefendersPassesInfo,DefendersPassesAnalytics,DefendersPassesAnalyticsStats,DefendersMatches,DefendersMatchesStats,DefendersRanking,DefendersRankingStats,DefendersOverall
from .defenders import DefenderPlayerInfo, DefenderDuelsInfo, DefenderDuelsAnalytics,DefenderPassesInfo,DefenderPassesAnalytics,DefenderMatches,DefenderRanking,DefenderOverall

from .midfielders import MidfieldersStats,MidfieldersPlayerInfo, MidfieldersDuelsInfo, MidfieldersDuelsAnalytics,MidfieldersDuelsAnalyticsStats,MidfieldersPassesInfo,MidfieldersPassesAnalytics,MidfieldersPassesAnalyticsStats,MidfieldersShotsInfo,MidfieldersShotsAnalytics,MidfieldersShotsAnalyticsStats,MidfieldersMatches,MidfieldersMatchesStats,MidfieldersRanking,MidfieldersRankingStats,MidfieldersOverall
from .midfielders import MidfielderPlayerInfo, MidfielderDuelsInfo, MidfielderDuelsAnalytics,MidfielderPassesInfo,MidfielderPassesAnalytics,MidfielderShotsInfo,MidfielderShotsAnalytics,MidfielderMatches,MidfielderRanking,MidfielderOverall



from .forwards import ForwardsStats,ForwardsPlayerInfo, ForwardsDuelsInfo, ForwardsDuelsAnalytics,ForwardsDuelsAnalyticsStats,ForwardsPassesInfo,ForwardsPassesAnalytics,ForwardsPassesAnalyticsStats,ForwardsShotsInfo,ForwardsShotsAnalytics,ForwardsShotsAnalyticsStats,ForwardsMatches,ForwardsMatchesStats,ForwardsRanking,ForwardsRankingStats,ForwardsOverall
from .forwards import ForwardPlayerInfo, ForwardDuelsInfo, ForwardDuelsAnalytics,ForwardPassesInfo,ForwardPassesAnalytics,ForwardShotsInfo,ForwardShotsAnalytics,ForwardMatches,ForwardRanking,ForwardOverall




def initialize_routes(api):

 ##Defenders
 api.add_resource(DefendersStats, '/api/defenders/stats')
 api.add_resource(DefendersPlayerInfo, '/api/defenders/playerinfo')
 api.add_resource(DefendersDuelsInfo, '/api/defenders/duels/info')
 api.add_resource(DefendersDuelsAnalytics, '/api/defenders/duels/analytics')
 api.add_resource(DefendersDuelsAnalyticsStats, '/api/defenders/duels/analytics/stats')
 api.add_resource(DefendersPassesInfo, '/api/defenders/passes/info')
 api.add_resource(DefendersPassesAnalytics, '/api/defenders/passes/analytics')
 api.add_resource(DefendersPassesAnalyticsStats, '/api/defenders/passes/analytics/stats')
 api.add_resource(DefendersMatches, '/api/defenders/matches')
 api.add_resource(DefendersMatchesStats, '/api/defenders/matches/stats')
 api.add_resource(DefendersRanking, '/api/defenders/rankings')
 api.add_resource(DefendersRankingStats, '/api/defenders/rankings/stats')
 api.add_resource(DefendersOverall, '/api/defenders/overall')
 
 api.add_resource(DefenderPlayerInfo, '/api/defenders/playerinfo/<id>')
 api.add_resource(DefenderDuelsInfo, '/api/defenders/duels/info/<id>')
 api.add_resource(DefenderDuelsAnalytics, '/api/defenders/duels/analytics/<id>')
 api.add_resource(DefenderPassesInfo, '/api/defenders/passes/info/<id>')
 api.add_resource(DefenderPassesAnalytics, '/api/defenders/passes/analytics/<id>')
 api.add_resource(DefenderMatches, '/api/defenders/matches/<id>')
 api.add_resource(DefenderRanking, '/api/defenders/rankings/<id>')
 api.add_resource(DefenderOverall, '/api/defenders/overall/<id>')

 ##Midfielders
 api.add_resource(MidfieldersStats, '/api/midfielders/stats')
 api.add_resource(MidfieldersPlayerInfo, '/api/midfielders/playerinfo')
 api.add_resource(MidfieldersDuelsInfo, '/api/midfielders/duels/info')
 api.add_resource(MidfieldersDuelsAnalytics, '/api/midfielders/duels/analytics')
 api.add_resource(MidfieldersDuelsAnalyticsStats, '/api/midfielders/duels/analytics/stats')
 api.add_resource(MidfieldersPassesInfo, '/api/midfielders/passes/info')
 api.add_resource(MidfieldersPassesAnalytics, '/api/midfielders/passes/analytics')
 api.add_resource(MidfieldersPassesAnalyticsStats, '/api/midfielders/passes/analytics/stats')
 api.add_resource(MidfieldersShotsInfo, '/api/midfielders/shots/info')
 api.add_resource(MidfieldersShotsAnalytics, '/api/midfielders/shots/analytics')
 api.add_resource(MidfieldersShotsAnalyticsStats, '/api/midfielders/shots/analytics/stats')
 api.add_resource(MidfieldersMatches, '/api/midfielders/matches')
 api.add_resource(MidfieldersMatchesStats, '/api/midfielders/matches/stats')
 api.add_resource(MidfieldersRanking, '/api/midfielders/rankings')
 api.add_resource(MidfieldersRankingStats, '/api/midfielders/rankings/stats')
 api.add_resource(MidfieldersOverall, '/api/midfielders/overall')

 api.add_resource(MidfielderPlayerInfo, '/api/midfielders/playerinfo/<id>')
 api.add_resource(MidfielderDuelsInfo, '/api/midfielders/duels/info/<id>')
 api.add_resource(MidfielderDuelsAnalytics, '/api/midfielders/duels/analytics/<id>')
 api.add_resource(MidfielderPassesInfo, '/api/midfielders/passes/info/<id>')
 api.add_resource(MidfielderPassesAnalytics, '/api/midfielders/passes/analytics/<id>')
 api.add_resource(MidfielderShotsInfo, '/api/midfielders/shots/info/<id>')
 api.add_resource(MidfielderShotsAnalytics, '/api/midfielders/shots/analytics/<id>')
 api.add_resource(MidfielderMatches, '/api/midfielders/matches/<id>')
 api.add_resource(MidfielderRanking, '/api/midfielders/rankings/<id>')
 api.add_resource(MidfielderOverall, '/api/midfielders/overall/<id>')

 ##Forwards
 api.add_resource(ForwardsStats, '/api/forwards/stats')
 api.add_resource(ForwardsPlayerInfo, '/api/forwards/playerinfo')
 api.add_resource(ForwardsDuelsInfo, '/api/forwards/duels/info')
 api.add_resource(ForwardsDuelsAnalytics, '/api/forwards/duels/analytics')
 api.add_resource(ForwardsDuelsAnalyticsStats, '/api/forwards/duels/analytics/stats')
 api.add_resource(ForwardsPassesInfo, '/api/forwards/passes/info')
 api.add_resource(ForwardsPassesAnalytics, '/api/forwards/passes/analytics')
 api.add_resource(ForwardsPassesAnalyticsStats, '/api/forwards/passes/analytics/stats')
 api.add_resource(ForwardsShotsAnalytics, '/api/forwards/shots/info')
 api.add_resource(ForwardsShotsInfo, '/api/forwards/shots/analytics')
 api.add_resource(ForwardsShotsAnalyticsStats, '/api/forwards/shots/analytics/stats')
 api.add_resource(ForwardsMatches, '/api/forwards/matches')
 api.add_resource(ForwardsMatchesStats, '/api/forwards/matches/stats')
 api.add_resource(ForwardsRanking, '/api/forwards/rankings')
 api.add_resource(ForwardsRankingStats, '/api/forwards/rankings/stats')
 api.add_resource(ForwardsOverall, '/api/forwards/overall')

 
 api.add_resource(ForwardPlayerInfo, '/api/forwards/playerinfo/<id>')
 api.add_resource(ForwardDuelsInfo, '/api/forwards/duels/info/<id>')
 api.add_resource(ForwardDuelsAnalytics, '/api/forwards/duels/analytics/<id>')
 api.add_resource(ForwardPassesInfo, '/api/forwards/passes/info/<id>')
 api.add_resource(ForwardPassesAnalytics, '/api/forwards/passes/analytics/<id>')
 api.add_resource(ForwardShotsInfo, '/api/forwards/shots/info/<id>')
 api.add_resource(ForwardShotsAnalytics, '/api/forwards/shots/analytics/<id>')
 api.add_resource(ForwardMatches, '/api/forwards/matches/<id>')
 api.add_resource(ForwardRanking, '/api/forwards/rankings/<id>')
 api.add_resource(ForwardOverall, '/api/forwards/overall/<id>')

