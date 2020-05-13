import scrapy

class Transfer_spyder(scrapy.Spider):
    name='transfermarkt'

    #La liga
    #bundesliga
    #ligue1
    #
    start_urls = [
        'https://www.transfermarkt.co.uk/primera-division/startseite/wettbewerb/ES1',
        'https://www.transfermarkt.co.uk/serie-a/startseite/wettbewerb/IT1',
        'https://www.transfermarkt.co.uk/premier-league/startseite/wettbewerb/GB1',
       'https://www.transfermarkt.co.uk/1-bundesliga/startseite/wettbewerb/L1',
       'https://www.transfermarkt.co.uk/ligue-1/startseite/wettbewerb/FR1'

    ]

    def parse(self, response):
        teamList = response.css('div#yw1 table.items td.zentriert a.vereinprofil_tooltip::attr(href)').getall()
        leauge = response.css('.spielername-profil::text').get()

        teamDict = dict()
        if leauge is not None:
            teamDict['leauge'] = leauge

        for teamLink in teamList:

            yield response.follow(teamLink, self.parseTeam, cb_kwargs=teamDict)


    def parseTeam(self, response, leauge):
            playerList = response.css('div#yw1 table.items a.spielprofil_tooltip::attr(href)').getall()
            playeNames =response.css('div#yw1 table.items a.spielprofil_tooltip::text').getall()
            count = 0
            club = response.css('h1 span::text').get()

            playerDict = dict()
            playerDict['leauge'] = leauge
            if club is not None:
                playerDict['club'] = club
            for (link, name) in zip (playerList,playeNames):
                playerDict['name'] = name
                player_page = response.urljoin(link)
                request = scrapy.Request(player_page, callback=self.parse_player, cb_kwargs=playerDict)
                yield request




    def parse_player(self, response,club,name, leauge):
        spelardata = response.css('div.spielerdaten')
        playerDictionary = dict()
        playerDictionary['leauge'] = leauge
        playerDictionary['club'] = club
        playerDictionary['name'] = name
        marketValue = response.css('div.marktwertentwicklung div.right-td::text').get()
        if marketValue is not None:
            playerDictionary['Market value'] = marketValue.strip()

        ##Get all key values
        for d in spelardata.css('tr'):
            key = d.css('th::text').get()
            value = d.css('td::text').get()
            if value is not None and key is not None:
                if value.strip() != "":
                    playerDictionary[key.strip()] = value.strip()
        yield playerDictionary



