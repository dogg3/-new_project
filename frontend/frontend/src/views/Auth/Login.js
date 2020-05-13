import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "./Layout";
import {connect} from "react-redux";
import {signIn} from "./FireabaseSlice";

import {checkUser} from "./FireabaseSlice";
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};



class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
        this.onChange.bind(this);
        this.onSubmit.bind(this)
    }

    componentDidMount() {

        this.props.checkUser()
            .then((f)=>{
                this.props.history.push("/start")
            }).catch(err =>{
                //console.log()(err) //just show the login page
        })

    }

    onSubmit = event => {
        event.preventDefault();
        // eslint-disable-next-line no-undef
        const  {email, password} = this.state;
        this.props.signIn(email, password)
            .then(()=>{
                this.props.history.push("/start")
            }).catch(err =>{
                this.setState({
                    error: err
                })
        })
    };


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


render() {




    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
            <Layout header="Soccerease Login">
                <Form.Input
                    fluid
                    name="email"
                    icon="user"
                    value={email}
                    onChange={this.onChange}
                    iconPosition="left"
                    placeholder="E-mail address"
                    className="auth-input-field"
                />
                <Form.Input
                    fluid
                    icon="lock"
                    name="password"
                    onChange={this.onChange}
                    value={password}
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    className="auth-input-field"
                />


                    <Button onClick={this.onSubmit} id="submit" disabled={isInvalid} color="teal" fluid size="huge">
                        Login
                    </Button>
                {error && error}
                <Message size="big">
                    <Link to="/signup">Not Registered?</Link>
                </Message>
                <Message size="big">
                    <Link to="/reset-password">Forgot password?</Link>
                </Message>
            </Layout>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        firebase: state.firebase,
        auth: state.firebase.auth

    }
};

const mapDispatchToProps = (dispatch) =>{

    return{
        checkUser: () => dispatch(checkUser()),
        signIn: (email, password) =>dispatch(signIn(email, password))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login)


