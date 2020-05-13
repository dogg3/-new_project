from flask import Response, request
from flask_restful import Resource
import dataanalysis
import pandas as pd





#####################FORWARDS####################
class ForwardsStats(Resource):
    def get(self):
        stats = dataanalysis.getForwardsStats().to_json(orient='index')
        return Response(stats, mimetype="application/json", status=200)

class ForwardsPlayerInfo(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsPlayerInfo().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardPlayerInfo(Resource):
    def get(self,id):
        player = dataanalysis.getForwardsPlayerInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


##DUELS
class ForwardsDuelsInfo(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsDuelsInfo().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardDuelsInfo(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsDuelsInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

class ForwardsDuelsAnalytics(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsDuelsAnalytics().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardsDuelsAnalyticsStats(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsDuelsAnalyticsStats().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)

class ForwardDuelsAnalytics(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsDuelsAnalytics().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


##PASSES
class ForwardsPassesInfo(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsPassesInfo().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardPassesInfo(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsPassesInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

class ForwardsPassesAnalytics(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsPassesAnalytics().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardsPassesAnalyticsStats(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsPassesAnalyticsStats().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardPassesAnalytics(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsPassesAnalytics().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

##SHOTS
class ForwardsShotsInfo(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsShotsInfo().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)

class ForwardShotsInfo(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsShotsInfo().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)

class ForwardsShotsAnalytics(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsShotsAnalytics().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)

class ForwardsShotsAnalyticsStats(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsShotsAnalyticsStats().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)


class ForwardShotsAnalytics(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsShotsAnalytics().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)






###MATCH
class ForwardsMatches(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsMatches().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardsMatchesStats(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsMatchesStats().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardMatches(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsMatches().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)


###RANKING
class ForwardsRanking(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsRankings().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardsRankingStats(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsRankingsStats().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardRanking(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsRankings().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)



###OVERALL
class ForwardsOverall(Resource):
    def get(self):
        forwards = dataanalysis.getForwardsOverall().to_json(orient='index')
        return Response(forwards, mimetype="application/json", status=200)
class ForwardOverall(Resource):
    def get(self, id):
        player = dataanalysis.getForwardsOverall().loc[[int(id)]]
        return Response(player.to_json(orient='index'), mimetype="application/json", status=200)






