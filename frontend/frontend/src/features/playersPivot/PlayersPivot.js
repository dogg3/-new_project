import React, {Component, useEffect, useState} from "react";
import Player from "../player/Player"
import {getAllPlayers} from "../../lib/services/footballApi";

export default class PlayersPivot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            errorFetch: false,
            isFetching:true,
            players: []
        }
    }

  async  componentDidMount() {

        await getAllPlayers()
            .then((data)=>{
                this.setState({players:data})
            }).catch((error)=>{
                this.setState({errorFetch:true})
                console.log(error)
            }).finally(()=>{
                this.setState({isFetching:false})
            })
    }

    render(){

        const {players} = this.state;


       const playerList = this.state.players && players.map(player =>{
            return (<li key={player.name}> {player.name}
                   {Object.entries(player.info).map(info =>{
                       return <p key={info[1]}>{info[0]} {info[1]}</p>
                   })}
                </li>)
        })







            return(
                <div>
                    <div className="playersTable">
                        {this.state.players &&

                        <ul>
                        {playerList}
                        </ul>
                        }
                    </div>
                    {this.state.errorFetch && <span className="fetchError">Could not load the players.. :(</span>}
                    {this.state.isFetching && !this.state.errorFetch && <p className="loading">"fetching players"</p>}
                </div>
            )




   }

}