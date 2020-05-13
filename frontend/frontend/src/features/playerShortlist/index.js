import React from "react";
import {connect} from 'react-redux'
import Table from 'antd/lib/table';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'



import {withRouter} from "react-router-dom";
import * as defenderActions from './DefendersShortList/DefendersShortListSlice'
import * as midfielderActions from './MidfieldersShortList/MidfieldersShortListSlice'
import * as forwardActions from './ForwardsShortList/ForwardsShortListSlice'
import {getFirebase} from "react-redux-firebase";
import {
    fetch_defenders_overall,
    fetch_forwards_overall,
    fetch_midfielders_overall, set_current_position, set_currentPlayer
} from "../playersPivot/playerPivotSlice";
import {Modal} from "antd";


class PlayersShortList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            removePlayerModalVisible:false,
            columns: [],
            datasource:[],
            addToShortList: null
        }
    }


    componentDidMount() {
            this.load_list_and_uid()
    }


    showModal = () => {
        this.setState({
            removePlayerModalVisible: true,
        });
    };

    handleOk = e => {
        //console.log()(e);
        this.setState({
            removePlayerModalVisible: false,
        });
    };

    handleCancel = e => {
        //console.log()(e);
        this.setState({
            removePlayerModalVisible: false,
        });
    };

    //Load uid
    //Load list
    load_list_and_uid = () =>{


        const user = null;
        const shortlist_get_defenders = this.props.shortlist_get_defenders;
        const shortlist_get_midfielders = this.props.shortlist_get_midfielders;
        const shortlist_get_forwards = this.props.shortlist_get_forwards;





        const position = this.props.position;
        const populate_player_table = this.populate_player_table;

        getFirebase().auth().onAuthStateChanged(user =>{
            if(position=='defender' && shortlist_get_defenders){
                shortlist_get_defenders(user.uid).then(()=>{
                    populate_player_table()
                })
            }
            if(position=='midfielder' && shortlist_get_midfielders){
                shortlist_get_midfielders(user.uid).then(()=>{
                    populate_player_table()

                })
            }
            if(position=='forward' && shortlist_get_forwards){
                shortlist_get_forwards(user.uid).then(()=>{
                    populate_player_table()
                })
            }

        })
    };



    populate_player_table =  () =>{
        let players = [];
        switch (this.props.position) {
           case 'defender':
               players = this.props.short_listed_defenders;
               break;
           case 'midfielder':
               players = this.props.short_listed_midfielders;
               break;
            case 'forward':
                players = this.props.short_listed_forwards;
                break;
            default:
                this.setState({error:'no_position'})
       }



       if(players && players.length>0) {


           let columnsArray = Object.keys(players[0][1]);

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



           const renderRemoveButton = (text, record) =>{
               return <a href="" onClick={e =>{ e.preventDefault(); this.remove_player_from_shortlist(record.key)}}>Remove</a>
           };


           ///ACTIOPOM columns
           const actionColumn = {
               title: 'Action',
               key: 'operation',
               fixed: 'right',
               width: 100,
               height: 10,
               render: (text, record) => renderRemoveButton(text, record)
           };
           columns.push(actionColumn);


           const datasource = [];
           players.forEach(player => {
               datasource.push(Object.assign({key: player[0]}, player[1]))

           });

           //console.log()(columns)
           //console.log()(datasource)
           this.setState({columns: columns, datasource: datasource})
       }
    };




     remove_player_from_shortlist = (playerId) => {
        switch (this.props.position) {
            case "defender":
                this.props.shortlist_remove_defender(this.props.auth.uid,playerId)
                    .then(()=>{
                        this.showModal();
                        this.props.shortlist_get_defenders(this.props.auth.uid).then(()=>{
                            this.populate_player_table();
                            //console.log()('in here not real')
                            this.setState({removedPlayer:true})

                        })
                    }).catch(e=>{
                        //console.log()(e)
                    alert('Failure! Try again')
                });
                break;
            case "midfielder":
                this.props.shortlist_remove_midfielder(this.props.auth.uid,playerId)
                    .then(()=>{
                        this.showModal();
                        this.props.shortlist_get_midfielders(this.props.auth.uid).then(()=>{
                            this.populate_player_table();
                            //console.log()('in here not real')
                            this.setState({removedPlayer:true})

                        })
                    }).catch(e=>{
                    //console.log()(e)
                    alert('Failure! Try again')
                });
                break;
            case "forward":
                this.props.shortlist_remove_forward(this.props.auth.uid,playerId)
                    .then(()=>{
                        this.showModal();
                        this.props.shortlist_get_forwards(this.props.auth.uid).then(()=>{
                            this.populate_player_table();
                            //console.log()('in here not real')
                            this.setState({removedPlayer:true})

                        })
                    }).catch(e=>{
                    //console.log()(e)
                    alert('Failure! Try again')
                });
                break;
            default:
                alert("Something went wrong! oppsy!")

        }
    };









    render() {
        const {position} = this.props;
        const {columns, datasource} = this.state;


        if(columns){
            return (
                <div>
                <Table  size={'small'} dataSource={datasource} columns={columns} scroll={{x:200}} bordered={true}   />
                    <Modal
                        title="Succesfully added player"
                        visible={this.state.removePlayerModalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        You removed a player from the shortlist!
                    </Modal>
                </div>

        );
        }
    }
}


const mapStateToProps = state => {
    const {short_listed_defenders,get_defenders_loading} = state.defenderShortList;
    const {short_listed_midfielders} = state.midfielderShortList;
    const {short_listed_forwards} = state.forwardShortList;
    const {auth} = state.firebase;


    return {short_listed_defenders,short_listed_midfielders, short_listed_forwards,get_defenders_loading ,auth}
};


const mapDispatchToProps = dispatch =>{
    return {

        //For profile page redirect
        set_currentPlayer: (id) => dispatch(set_currentPlayer(id)),
        set_currentPosition: (pos) => dispatch(set_current_position(pos)),



        //DEFENDERS
        shortlist_get_defenders: (uid) => dispatch(defenderActions.shortlist_get_defenders(uid,true)),
        shortlist_remove_defender: (uid,playerId) => dispatch(defenderActions.shortlist_remove_defender(uid,playerId)),

        //MIDFIELDERS
        shortlist_get_midfielders: (uid) => dispatch(midfielderActions.shortlist_get_midfielders(uid,true)),
        shortlist_remove_midfielder: (uid,playerId) => dispatch(midfielderActions.shortlist_remove_midfielder(uid,playerId)),


        //FORWARDS
        shortlist_get_forwards: (uid) => dispatch(forwardActions.shortlist_get_forwards(uid,true)),
        shortlist_remove_forward: (uid, playerId) => dispatch(forwardActions.shortlist_remove_forward(uid,playerId)),

        
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayersShortList))
