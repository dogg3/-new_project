import React from "react"
import Defender from "./Defender";
import Midfielder from "./Midfielder";
import Forward from "./Forward";
import {connect} from "react-redux";


import {
    withRouter
} from 'react-router-dom'

 const Player = (props) =>{
    //Check if it is passed
    console.log(props.current_position);
    if (props.current_position)
        switch (props.current_position) {
            case 'defender':
                return <Defender />;
                break;
            case 'midfielder':
                return <Midfielder/>;
                break;
            case 'forward':
                return <Forward/>;
                break;
            default:
                return <p>No position specified </p>
        }

    //Return if not position is passde in history
    return <p>Opps..</p>

};



const mapStateToProps = state => {
    const {current_position} = state.playersPivot;
    return {current_position}

};

export default withRouter(connect(mapStateToProps,null)(Player))