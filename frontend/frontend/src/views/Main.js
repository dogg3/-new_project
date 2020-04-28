import React from "react";
import { connect } from "react-redux";
import Start from "./Start";
import Login from "./Auth/Login";
import DefaultLayout from "../layouts/Default";


const Main = ({ auth }) => {
    return (
        <div>
            {!auth.isLoaded ? <h2>Loading</h2> : !auth.isEmpty ? DefaultLayout(Start) : <Login />}
        </div>
    );
};

function mapStateToProps(state) {
    return {
        auth: state.firebase.auth
    };
}

export default connect(mapStateToProps)(Main);