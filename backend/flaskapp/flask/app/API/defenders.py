from flask import Response, request
from flask_restful import Resource
import dataanalysis
import pandas as pd





#####################DEFENDERS####################
class DefendersStats(Resource):
    def get(self):
        stats = dataanalysis.getDefendersStats().to_json(orient='index')
        return Response(stats, mimetype="application/json", status=200)

class DefendersPlayerInfo(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersPlayerInfo().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefenderPlayerInfo(Resource):
    def get(self,id):
        player = dataanalysis.getDefendersPlayerInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


##DUELS
class DefendersDuelsInfo(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersDuelsInfo().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefenderDuelsInfo(Resource):
    def get(self, id):
        player = dataanalysis.getDefendersDuelsInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

class DefendersDuelsAnalytics(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersDuelsAnalytics().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefendersDuelsAnalyticsStats(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersDuelsAnalyticsStats().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)

class DefenderDuelsAnalytics(Resource):
    def get(self, id):
        player = dataanalysis.getDefendersDuelsAnalytics().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


##PASSES
class DefendersPassesInfo(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersPassesInfo().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefenderPassesInfo(Resource):
    def get(self, id):
        player = dataanalysis.getDefendersPassesInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

class DefendersPassesAnalytics(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersPassesAnalytics().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefendersPassesAnalyticsStats(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersPassesAnalyticsStats().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefenderPassesAnalytics(Resource):
    def get(self, id):
        player = dataanalysis.getDefendersPassesAnalytics().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)







###MATCH
class DefendersMatches(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersMatches().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefendersMatchesStats(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersMatchesStats().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefenderMatches(Resource):
    def get(self, id):
        player = dataanalysis.getDefendersMatches().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


###RANKING
class DefendersRanking(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersRankings().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefendersRankingStats(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersRankingsStats().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefenderRanking(Resource):
    def get(self, id):
        player = dataanalysis.getDefendersRankings().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)



###OVERALL
class DefendersOverall(Resource):
    def get(self):
        defenders = dataanalysis.getDefendersOverall().to_json(orient='index')
        return Response(defenders, mimetype="application/json", status=200)
class DefenderOverall(Resource):
    def get(self, id):
        player = dataanalysis.getDefendersOverall().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)