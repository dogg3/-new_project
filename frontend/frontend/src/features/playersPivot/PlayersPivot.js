import React from "react";
import {fetch_defenders_overall,fetch_midfielders_overall,fetch_forwards_overall, set_currentPlayer, set_current_position} from "./playerPivotSlice";
import {connect} from 'react-redux'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Table from 'antd/lib/table';
import {Modal} from "antd";
import {shortlist_add_defender, shortlist_get_defenders} from "../playerShortlist/DefendersShortList/DefendersShortListSlice";
import {shortlist_add_midfielder, shortlist_get_midfielders} from "../playerShortlist/MidfieldersShortList/MidfieldersShortListSlice";
import {shortlist_add_forward, shortlist_get_forwards} from "../playerShortlist/ForwardsShortList/ForwardsShortListSlice";

import * as defenderActions from '../player/defenderSlice'
import * as midfielderActions from '../player/midfielderSlice'
import * as forwardActions from '../player/forwardSlice'


import {getFirebase} from "react-redux-firebase";

import {
    withRouter
} from 'react-router-dom'

class PlayersPivot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addPlayerModalVisible:false,
            columns: [],
            addToShortList: null
        }
    }

    componentDidMount(props) {
        this.set_listener();
        switch (this.props.position) {
            case 'defender':
                this.props.fetch_defenders_overall()
                    .then(()=>{
                        this.state.players = this.props.defenders
                    })
                    .then(()=>{
                        this.populate_player_table()
                    });
                break;
            case 'midfielder':
                  this.props.fetch_midfielders_overall()
                    .then(()=>{
                        this.state.players = this.props.midfielders
                    })
                    .then(()=>{
                        this.populate_player_table()
                    });
                break;
            case 'forward':
                  this.props.fetch_forwards_overall()
                    .then(()=>{
                        this.state.players = this.props.forwards
                    })
                    .then(()=>{
                        this.populate_player_table()
                    });
                break;
            default:
                this.setState({error:'No position specified in props'});
                break
        }
    }


    set_listener = () => {


        const shortlist_get_defenders = this.props.shortlist_get_defenders;
        const shortlist_get_midfielders = this.props.shortlist_get_midfielders;
        const shortlist_get_forwards = this.props.shortlist_get_forwards;
        const position = this.props.position;

        const update_state = () =>{
           this.setState({short_listed_players:'loaded'})
        };


        getFirebase().auth().onAuthStateChanged(user =>{
            if(position=='defender' && shortlist_get_defenders){
                shortlist_get_defenders(user.uid).then(()=>{
                    update_state()
                })
            }
            if(position=='midfielder' && shortlist_get_midfielders){
                shortlist_get_midfielders(user.uid).then(()=>{
                    update_state()

                })
            }
            if(position=='forward' && shortlist_get_forwards){
                shortlist_get_forwards(user.uid).then(()=>{
                    update_state()
                })
            }

        })


    };



    showModal = () => {
        this.setState({
            addPlayerModalVisible: true,
        });
    };

    handleOk = e => {
        //console.log()(e);
        this.setState({
            addPlayerModalVisible: false,
        });
    };

    handleCancel = e => {
        //console.log()(e);
        this.setState({
            addPlayerModalVisible: false,
        });
    };

    add_player_to_short_list = (playerId) => {
        switch(this.props.position){
            case "defender":
                this.props.shortlist_add_defender(this.props.auth.uid, playerId)
                    .then(()=>{
                        this.showModal();
                        this.props.shortlist_get_defenders(this.props.auth.uid).then(()=>{
                            this.setState({add_player_to_short_list_loading:false})
                        })
                    }).catch(e => {
                    //console.log()(e)
                    {alert('Not success, check console for error!')}
                });
                break;
            case "midfielder":
                this.props.shortlist_add_midfielder(this.props.auth.uid, playerId)
                    .then(()=>{
                        this.showModal();
                        this.props.shortlist_get_midfielders(this.props.auth.uid).then(()=>{
                            this.setState({add_player_to_short_list_loading:false})
                        })
                    }).catch(e => {
                    //console.log()(e)
                    {alert('not success')}
                });
                break;
            case "forward":
                this.props.shortlist_add_forward(this.props.auth.uid, playerId)
                    .then(()=>{
                        this.showModal();
                        this.props.shortlist_get_forwards(this.props.auth.uid).then(()=>{
                            this.setState({add_player_to_short_list_loading:false})
                        })
                    }).catch(e => {
                //console.log()(e)
                    {alert('not success')}
                });
                break;
            default:
                alert("Something went wrong! oppsy!")
        }

    };






    renderShortListButton = (text, record) =>{
        if(this.props.short_listed_defenders && this.props.short_listed_defenders.includes(record.key)){
            return <span>Already shortlsited</span>
        }
        if(this.props.short_listed_midfielders && this.props.short_listed_midfielders.includes(record.key)){
            return <span>Already shortlsited</span>
        }
        if(this.props.short_listed_forwards && this.props.short_listed_forwards.includes(record.key)){
            return <span>Already shortlsited</span>
        }
        return <a href="" onClick={e =>{ e.preventDefault(); this.add_player_to_short_list(record.key)}} >Shortlist</a>

    };

    populate_player_table =  () =>{
        const {players} = this.state;

            if(players) {
                let columnsArray = Object.keys((Object.entries(players)[0])[1]);

                const columns = columnsArray.map(x => {

                    if (x == "Name")
                        return {
                            title: x,
                            dataIndex: x,
                            key: x,
                            width: 200,
                            height: 10,
                            fixed: 'left',
                            render: (text, record) => <a href="" onClick={async e => {
                                e.preventDefault();
                                await this.props.set_currentPosition(this.props.position);
                                this.props.set_currentPlayer(record.key);
                                this.props.history.push({pathname: '/player-profile'})
                            }}>{text}</a>
                        };


                    if (x.includes('%'))
                        return {
                            title: x, dataIndex: x, key: x, width: 190, height: 10, defaultSortOrder: 'descend',
                            sorter: (a, b) => a[x] - b[x]
                        };
                    if (x.includes('rank')) {
                        return {
                            title: x,
                            dataIndex: x,
                            key: x,
                            width: 90,
                            height: 10,
                            fixed: 'right',
                            defaultSortOrder: 'descend',
                            sorter: (a, b) => a[x] - b[x]
                        }
                    }
                    return {
                        title: x, dataIndex: x, key: x, width: 90, height: 10, defaultSortOrder: 'descend',
                        sorter: (a, b) => a[x] - b[x]
                    }
                });


                ///ACTIOPOM columns
                const actionColumn = {
                    title: 'Action',
                    key: 'operation',
                    fixed: 'right',
                    width: 100,
                    height: 10,
                    render: (text, record) => this.renderShortListButton(text, record)
                };
                columns.push(actionColumn);

                ///Recereate object for table
                const datasource = Object.entries(players).map((x) => {
                    let playerObj = {key: x[0]};
                    return Object.assign(playerObj, x[1])

                });
                this.setState({columns:columns, datasource: datasource})


            }
    };



    render(){

        const {columns, datasource} = this.state;
        if(columns){
            return (
                <div>
                <Table size={'small'} dataSource={datasource} columns={columns} scroll={{x:200}} bordered={true}   />

                    <Modal
                        title="Succesfully added player"
                        visible={this.state.addPlayerModalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        You find your shortlisted players under the playerlist tab.
                    </Modal>
                </div>
            );
        }
    }

}

const mapStateToProps = state => {
    const {defenders,midfielders,forwards} = state.playersPivot;
    const {auth} = state.firebase;
    const {short_listed_defenders} = state.defenderShortList;
    const {short_listed_midfielders} = state.midfielderShortList;
    const {short_listed_forwards} = state.forwardShortList;
    return {defenders,midfielders, forwards,auth, short_listed_defenders,short_listed_midfielders,short_listed_forwards}
};


const mapDispatchToProps = dispatch =>  {
    return{
        fetch_defenders_overall: () => dispatch(fetch_defenders_overall()),
        fetch_midfielders_overall: () => dispatch(fetch_midfielders_overall()),
        fetch_forwards_overall: () => dispatch(fetch_forwards_overall()),
        set_currentPlayer: (id) => dispatch(set_currentPlayer(id)),
        set_currentPosition: (pos) => dispatch(set_current_position(pos)),


        //Defender shorlitss methods
        shortlist_add_defender: (uid, playerId) => dispatch(shortlist_add_defender(uid, playerId)),
        shortlist_get_defenders: (uid) => dispatch(shortlist_get_defenders(uid)),


        //Midfielders shorlitss methods
        shortlist_add_midfielder: (uid, playerId) => dispatch(shortlist_add_midfielder(uid, playerId)),
        shortlist_get_midfielders: (uid) => dispatch(shortlist_get_midfielders(uid)),


        //Forwards shorlitss methods
        shortlist_add_forward: (uid, playerId) => dispatch(shortlist_add_forward(uid, playerId)),
        shortlist_get_forwards: (uid) => dispatch(shortlist_get_forwards(uid)),

    
        
        defender_fetch_player_info: (playerId) => dispatch(defenderActions.fetch_player_info(playerId)),
        midfielder_fetch_player_info: (playerId) => dispatch(midfielderActions.fetch_player_info(playerId)),
        forward_fetch_player_info: (playerId) => dispatch(forwardActions.fetch_player_info(playerId))

    }
};






export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayersPivot))