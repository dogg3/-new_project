import React from "react"
import * as actions from './forwardSlice'
import {connect} from "react-redux";
import PlayerInfo from './PlayerInfo/PlayerInfo'
import EventInfo from "./EventInfo/EventInfo";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import {  Divider,Card ,Popover,Button } from 'antd';
import {Radar} from 'react-chartjs-2';
import {Col, Container, Row} from "shards-react";



////PASSES
/////DUELS HHELP
const passesHelp = () => (
    ( <div>
        <p>Relevant metrics on how well a player perform in his passes</p>
        <p>Keep an eye on position relevant metrics.</p>
    </div>)
);



const duelsHelp = () => (
    ( <div>
        <p>Relevant metrics on how well a player perform in his duels</p>
        <p>Keep an eye on position relevant metrics.</p>
    </div>)
);

const rankingsHelp = () => (
    ( <div>
        <p><b>The passing rank for defenders are based upon</b>
            <li>Simple passing accuracy %</li>
            <li>High pass accuracy %</li>
            <li> Head pass accuracy %</li>
        </p>

        <p>  The duels rank for defenders are based upon:
            <li>Ground defending duel won %</li>
            <li>Air duel won %</li>
        </p>

        <p>The overall rank for defenders are weighted as:
            <li>70 % of duels</li>
            <li>30 % of passes</li>
            <li> + age rank</li>
        </p>
        <p> Age rank = 3 points extra was added for each year a player is younger than the mean age of 28.6.</p>
    </div>)
);


const matchesHelp = () => (
    ( <div>
        <p>Data about how much a player plays for his team</p>
        <p><strong>Start %</strong> tells us of all games played how many was the player starting</p>
        <p><strong>Bench %</strong> tells us of all games played how many was the player starting on the bench</p>
        <p><strong>Minutes %</strong> tells us the percentage of all minutes played of a season he was playing.</p>
    </div>)
);

const shotsHelp = () => (
    ( <div>
        <p>Relevant metrics on how well a player perform in his shots</p>
        <p>These metrics are only included for forwards and forwards</p>
        <p> Shot goal % : how many percentage of all shots taken from the player results in a goal</p>
        <p> Shot acc % : how many percentage of all shots taken from the player results on target</p>
        <p> Shot opportunity % : how many percentage of all shots taken from the player can be described as a good opporunity to score</p>
    </div>)
);


class Player extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            playerInfo: ''
        }
    }



    componentDidMount(props) {

        this.props.fetch_player_info(this.props.current_player_id)
            .then(()=>{
                this.populate_player_info()
            }).catch(err =>{
            this.setState({error:err})

        });



        //duels
        this.props.fetch_duels_info(this.props.current_player_id)
            .then(()=>{
                this.populate_duels_info()
            }).catch(err =>{
            this.setState({error:err})
        });

        this.props.fetch_duels_analytics(this.props.current_player_id)
            .then(()=>{
                this.populate_duels_analytics()
            }).catch(err =>{
            this.setState({error:err})
        });

        //passes
        this.props.fetch_passes_info(this.props.current_player_id)
            .then(()=>{
                this.populate_passes_info()
            }).catch(err =>{
            this.setState({error:err})
        });

        this.props.fetch_passes_analytics(this.props.current_player_id)
            .then(()=>{
                this.populate_passes_analytics()
            }).catch(err =>{
            this.setState({error:err})
        });



        ///SHOTS

        this.props.fetch_shots_info(this.props.current_player_id)
            .then(()=>{
                this.populate_shots_info()
            }).catch(err =>{
            this.setState({error:err})
        });

        this.props.fetch_shots_analytics(this.props.current_player_id)
            .then(()=>{
                this.populate_shots_analytics()
            }).catch(err =>{
            this.setState({error:err})
        });


        //Matches
        this.props.fetch_matches(this.props.current_player_id)
            .then(()=>{
                this.populate_matches()
            }).catch(err =>{
            this.setState({error:err})
        });

        //Ranknings
        this.props.fetch_rankings(this.props.current_player_id)
            .then(()=>{
                this.populate_rankings()
            }).catch(err =>{
            this.setState({error:err})
        })

    }

    populate_player_info = () =>{
        const player_info = this.props.player_info;
        this.setState({playerInfo: Object.values(player_info)[0]})
    };

    ///DUELS
    populate_duels_info = () =>{
        const duels_info = this.props.duels_info;
        this.setState({duelsInfo: Object.values(duels_info)[0]})
    };


    populate_duels_analytics = () =>{
        this.props.fetch_duels_stats()
            .then(()=>{
                const {duels_stats} = this.props;
                const radar_average =  this.populate_radar(Object.keys(duels_stats['mean']), Object.values(duels_stats['mean']));
                let duels_analytics = this.props.duels_analytics;
                duels_analytics = Object.values(duels_analytics)[0];
                const radar = this.populate_radar(Object.keys(duels_analytics),
                    Object.values(duels_stats['mean'])
                    ,Object.values(duels_analytics),
                    'Average','The player');


                console.log(radar);
                this.setState({duelsAnalytics: duels_analytics, duels_radar:radar})
            })
    };



    ///PASSES
    populate_passes_info = () =>{
        const passes_info = this.props.passes_info;
        this.setState({passesInfo: Object.values(passes_info)[0]})
    };
    populate_passes_analytics = () =>{

        this.props.fetch_passes_stats()
            .then(()=>{
                const {passes_stats} = this.props;
                const radar_average =  this.populate_radar(Object.keys(passes_stats['mean']), Object.values(passes_stats['mean']));
                let passes_analytics = this.props.passes_analytics;
                passes_analytics = Object.values(passes_analytics)[0];
                const radar = this.populate_radar(Object.keys(passes_analytics),
                    Object.values(passes_stats['mean'])
                    ,Object.values(passes_analytics),
                    'Average','The player');


                console.log(radar);
                this.setState({passesAnalytics: passes_analytics, passes_radar:radar})
            })


    };

    ///SHOTS
    populate_shots_info = () =>{
        const shots_info = this.props.shots_info;
        this.setState({shotsInfo: Object.values(shots_info)[0]})
    };



    populate_shots_analytics = () =>{
        this.props.fetch_shots_stats()
            .then(()=>{
                const {shots_stats} = this.props;
                const radar_average =  this.populate_radar(Object.keys(shots_stats['mean']), Object.values(shots_stats['mean']));
                let shots_analytics = this.props.shots_analytics;
                shots_analytics = Object.values(shots_analytics)[0];
                const radar = this.populate_radar(Object.keys(shots_analytics),
                    Object.values(shots_stats['mean'])
                    ,Object.values(shots_analytics),
                    'Average','The player');

                this.setState({shotsAnalytics: shots_analytics, shots_radar:radar})
            })
    };





    populate_matches = async  () =>{

        this.props.fetch_matches_stats()
            .then(()=>{
                const {matches_stats} = this.props;
                const radar_average =  this.populate_radar(Object.keys(matches_stats['mean']), Object.values(matches_stats['mean']));
                let matches = this.props.matches;
                matches = Object.values(matches)[0];
                const radar = this.populate_radar(Object.keys(matches),
                    Object.values(matches_stats['mean'])
                    ,Object.values(matches),
                    'Average','The player');


                console.log(radar);
                this.setState({matches: matches, matches_radar:radar})
            })

    };
    populate_rankings =  () =>{


        this.props.fetch_rankings_stats()
            .then(()=>{
                const {rankings_stats} = this.props;
                const radar_average =  this.populate_radar(Object.keys(rankings_stats['mean']), Object.values(rankings_stats['mean']));
                let rankings = this.props.rankings;
                rankings = Object.values(rankings)[0];
                const radar = this.populate_radar(Object.keys(rankings),
                    Object.values(rankings_stats['mean'])
                    ,Object.values(rankings),
                    'Average','The player');


                console.log(radar);
                this.setState({rankings: rankings, rankings_radar:radar})
            })

    };


    popOverDuels = (
        <Popover title={'Duels analytics'} content={duelsHelp}  trigger="hover">
            <Button>info</Button>
        </Popover>
    );
    popOverPasses = (
        <Popover title={'Passes analytics'} content={passesHelp}  trigger="hover">
            <Button>info</Button>
        </Popover>
    );
    popOverRankings = (
        <Popover title={"How does the ranknings work?"} content={rankingsHelp}  trigger="hover">
            <Button>info</Button>
        </Popover>
    );
    popOverMatches = (
        <Popover title={"Data about how much a player plays"} content={matchesHelp}  trigger="hover">
            <Button>info</Button>
        </Popover>
    );
    popOverShots = (
        <Popover title={"Shots analytics"} content={shotsHelp}  trigger="hover">
            <Button>info</Button>
        </Popover>
    );


    populate_radar = (labels, data, data2, label1, label2) =>{
        const return_data = {
            labels: labels,
            datasets: [
                {   label: label1,
                    backgroundColor: 'rgba(179,181,198,0.2)',
                    borderColor: 'rgba(179,181,198,1)',
                    pointBackgroundColor: 'rgba(179,181,198,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(179,181,198,1)',
                    data: data,
                },
                {   label: label2,
                    backgroundColor:  'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                    data: data2,
                }
            ]
        };
        return return_data
    };


    render() {

        const {player_info_loading} = this.props;

        const {playerInfo} = this.state;
        const {shotsInfo, shotsAnalytics, shots_radar}= this.state;
        const {rankings, rankings_radar} =this.state;
        const {matches, matches_radar} =this.state;
        const {passesInfo,passesAnalytics, passes_radar } = this.state;
        const{duelsAnalytics , duelsInfo,duels_radar} = this.state;


        if(player_info_loading) return <p>...Loading</p>;

        return (
            <Container>

                <Row  style={mystyle}>
                    <Col>
                        <Card title={'Player Info'}>
                            <PlayerInfo playerinfo={playerInfo}/>
                        </Card>
                    </Col>
                    <Col>
                        <Card title={'Matches'} extra={this.popOverMatches}>
                            <EventInfo eventInfo={matches}/>
                        </Card>

                    </Col>
                    <Col>
                        <Card title={'Rankings'} extra={this.popOverRankings}>
                            <EventInfo  eventInfo={rankings}/>
                        </Card>
                    </Col>

                </Row>
                <Divider/>
                <Row >
                    <Col className={'col-md-6'} >
                        <Card title={'Compare match data'}>
                            <Radar data={ matches_radar} />
                        </Card>
                    </Col>
                    <Col className={'col-md-6'}>
                        <Card title={'Compare rank data'}>
                            <Radar data={rankings_radar} />
                        </Card>
                    </Col>
                </Row>

                <Divider/>
                <Divider/>
                <h5>Shots</h5>
                <Row  style={mystyle}>
                    <Col className={'col-md-8 col-md-offset-2'}>
                        <Card title={'Compare Shots analytics'}>
                            <Radar data={shots_radar}/>
                        </Card>
                    </Col>
                    <Col className={'col-md-4'}>
                        <Card title={'Shots analytics'} extra={this.popOverShots}>
                            <EventInfo eventInfo={shotsAnalytics}/>
                        </Card>
                    </Col>

                </Row>
                <Row  style={mystyle}>

                    <Col>
                        <Card title={'Shots info'}>
                            <EventInfo  eventInfo={shotsInfo}/>
                        </Card>
                    </Col>
                </Row>
                <Divider/>
                <h5>Duels</h5>
                <Row style={mystyle}>
                    <Col className={'col-md-8 col-md-offset-2'}>
                        <Card title={'Compare duels analytics'}>
                            <Radar data={duels_radar}/>
                        </Card>
                    </Col>

                    <Col className={'col-md-4'}>
                        <Card  title={'Duels analytics'} extra={this.popOverDuels}>
                            <EventInfo eventInfo={duelsAnalytics}/>
                        </Card>
                    </Col>
                </Row>
                <Row  style={mystyle}>
                    <Col >
                        <Card title={'Duels info'}>

                            <EventInfo eventInfo={duelsInfo}/>
                        </Card>
                    </Col>
                </Row>
                <Divider/>
                <h5>Passes</h5>
                <Row  style={mystyle}>
                    <Col className={'col-md-8 col-md-offset-2'}>
                        <Card title={'Compare Passes analytics'}>
                            <Radar data={passes_radar}/>
                        </Card>
                    </Col>
                    <Col className={'col-md-4'}>
                        <Card title={'Passes analytics'} extra={this.popOverPasses}>
                            <EventInfo eventInfo={passesAnalytics}/>
                        </Card>
                    </Col>

                </Row>
                <Row  style={mystyle}>

                    <Col>
                        <Card title={'Passes info'}>
                            <EventInfo  eventInfo={passesInfo}/>
                        </Card>
                    </Col>
                </Row>

            </Container>
        )
    }
}








const mystyle = {
    paddingTop:'20px', display:'flex', justifyContent: 'center', alignItems:'center'
};






const mapStateToProps = state => {
    const {current_player_id} = state.playersPivot;
    //playerinfo
    const {player_info,player_info_loading} = state.forward;
    //duels info
    const {duels_info,duels_analytics} = state.forward;
    //passes
    const {passes_info,passes_analytics} = state.forward;
    //Shots
    const {shots_info,shots_analytics} = state.forward;


    const {matches, rankings} = state.forward;

    const {duels_stats,passes_stats,matches_stats,rankings_stats, shots_stats} = state.forward;


    return {current_player_id,player_info,
        duels_info,duels_analytics,
        passes_info,passes_analytics,
        shots_info,shots_analytics,
        player_info_loading,matches, rankings,
        duels_stats,passes_stats,matches_stats,rankings_stats,shots_stats
    }
};




const mapDispatchToProps = dispatch =>  {
    return{
        fetch_player_info: (id) => dispatch(actions.fetch_player_info(id)),

        fetch_duels_info: (id) =>  dispatch(actions.fetch_duels_info(id)),
        fetch_duels_analytics: (id) => dispatch(actions.fetch_duels_analytics(id)),

        fetch_passes_info: (id) =>  dispatch(actions.fetch_passes_info(id)),
        fetch_passes_analytics: (id) => dispatch(actions.fetch_passes_analytics(id)),



        fetch_shots_info: (id) =>  dispatch(actions.fetch_shots_info(id)),
        fetch_shots_analytics: (id) => dispatch(actions.fetch_shots_analytics(id)),


        fetch_matches: (id) =>  dispatch(actions.fetch_matches(id)),
        fetch_rankings: (id) =>  dispatch(actions.fetch_rankings(id)),


        //

        //stats
        fetch_duels_stats: () => dispatch(actions.fetch_duels_stats()),
        fetch_passes_stats: () => dispatch(actions.fetch_passes_stats()),
        fetch_shots_stats: ()=> dispatch(actions.fetch_shots_stats()),
        fetch_rankings_stats: () => dispatch(actions.fetch_rankings_stats()),
        fetch_matches_stats: () => dispatch(actions.fetch_matches_stats()),

    }
};





export default connect(mapStateToProps,mapDispatchToProps)(Player)
