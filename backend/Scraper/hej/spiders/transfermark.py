import scrapy

class Transfer_spyder(scrapy.Spider):
    name='transfermarkt'

    start_urls = [
        'https://www.transfermarkt.co.uk/superligaen/startseite/wettbewerb/DK1',
    ]

    def parse(self, response):
        teamList = response.css('div#yw1 table.items td.zentriert a.vereinprofil_tooltip::attr(href)').getall()
        for teamLink in teamList:
            yield response.follow(teamLink, self.parseTeam)


    def parseTeam(self, response):
            playerList = response.css('div#yw1 table.items a.spielprofil_tooltip::attr(href)').getall()
            playeNames =response.css('div#yw1 table.items a.spielprofil_tooltip::text').getall()
            count = 0
            club = response.css('h1 span::text').get()
            playerDict = dict()
            if club is not None:
                playerDict['club'] = club
            for (link, name) in zip (playerList,playeNames):
                playerDict['name'] = name
                player_page = response.urljoin(link)
                request = scrapy.Request(player_page, callback=self.parse_player, cb_kwargs=playerDict)
                yield request




    def parse_player(self, response,club,name):
        spelardata = response.css('div.spielerdaten')
        playerDictionary = dict()
        playerDictionary['club'] = club
        playerDictionary['name'] = name
        marketValue = response.css('div.marktwertentwicklung div.right-td::text').get()
        if marketValue is not None:
            playerDictionary['Market value'] = marketValue.strip()
        for d in spelardata.css('tr'):
            key = d.css('th::text').get()
            value = d.css('td::text').get()
            if value is not None and key is not None:
                if value.strip() != "":
                    playerDictionary[key.strip()] = value.strip()
        yield playerDictionary



            # def parse(self, response):
    #     position = response.xpath('//*[.="Position:"]/following-sibling::td/text()').extract()[0].strip()
    #     contract_exp = response.xpath('//*[.="Contract expires:"]/following-sibling::td/text()').extract()[0].strip()
    #     birth_date = response.xpath('//*[@itemprop="birthDate"]/text()').re(r'\d+')
    #     height = response.xpath('//*[@itemprop="height"]/text()').re(r'\d,\d+')
    #     name = response.xpath('//table[@class="auflistung"]/*/*/text()').extract()[1]
    #     yield  {'name':name,'birthdate': birth_date, 'height': height, 'position': position, 'contract_exp': contract_exp}





