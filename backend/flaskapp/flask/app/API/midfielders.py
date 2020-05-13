from flask import Response, request
from flask_restful import Resource
import dataanalysis
import pandas as pd





#####################MIDFIELDERS####################
class MidfieldersStats(Resource):
    def get(self):
        stats = dataanalysis.getMidfieldersStats().to_json(orient='index')
        return Response(stats, mimetype="application/json", status=200)

class MidfieldersPlayerInfo(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersPlayerInfo().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfielderPlayerInfo(Resource):
    def get(self,id):
        player = dataanalysis.getMidfieldersPlayerInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


##DUELS
class MidfieldersDuelsInfo(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersDuelsInfo().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfielderDuelsInfo(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersDuelsInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

class MidfieldersDuelsAnalytics(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersDuelsAnalytics().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfieldersDuelsAnalyticsStats(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersDuelsAnalyticsStats().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)

class MidfielderDuelsAnalytics(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersDuelsAnalytics().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


##PASSES
class MidfieldersPassesInfo(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersPassesInfo().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfielderPassesInfo(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersPassesInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

class MidfieldersPassesAnalytics(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersPassesAnalytics().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfieldersPassesAnalyticsStats(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersPassesAnalyticsStats().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfielderPassesAnalytics(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersPassesAnalytics().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

##SHOTS
class MidfieldersShotsInfo(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersShotsInfo().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)

class MidfielderShotsInfo(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersShotsInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

class MidfieldersShotsAnalytics(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersShotsAnalytics().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)

class MidfieldersShotsAnalyticsStats(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersShotsAnalyticsStats().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)


class MidfielderShotsAnalytics(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersShotsAnalytics().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)






###MATCH
class MidfieldersMatches(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersMatches().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfieldersMatchesStats(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersMatchesStats().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfielderMatches(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersMatches().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


###RANKING
class MidfieldersRanking(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersRankings().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfieldersRankingStats(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersRankingsStats().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfielderRanking(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersRankings().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)



###OVERALL
class MidfieldersOverall(Resource):
    def get(self):
        midfielders = dataanalysis.getMidfieldersOverall().to_json(orient='index')
        return Response(midfielders, mimetype="application/json", status=200)
class MidfielderOverall(Resource):
    def get(self, id):
        player = dataanalysis.getMidfieldersOverall().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)






