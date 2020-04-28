import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "./Layout";
import {connect} from "react-redux";
import {resetPassword} from "./FireabaseSlice";
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
        this.onChange.bind(this)
        this.onSubmit.bind(this)
    }

    componentDidMount() {

        //Goes back to dashboard if it is logged in
        this.props.checkUser()
            .then((f)=>{
                this.props.history.push("/start")
            }).catch(err =>{
            console.log(err) //just show the login page
        })

    }

    onSubmit = event => {
        event.preventDefault()
        // eslint-disable-next-line no-undef
        const  {email, password} = this.state;
        this.props.resetPassword(email)
            .then(()=>{
               this.setState({
                   error:"Check your email!"
               })
            }).catch(err =>{
            this.setState({
                error: err
            })
        })
    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


    render() {




        const { email, error } = this.state;

        const isInvalid =  email === '';

        return (
            <Layout header="Reset Password">
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

                <Button onClick={this.onSubmit} id="submit" disabled={isInvalid} color="teal" fluid size="huge">
                    Reset
                </Button>
                {error && error}
                <Message size="big">
                    <Link to="/login">Back to Login</Link>
                </Message>
                <Message size="big">
                    <Link to="/signup">Not Registered?</Link>
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
}

const mapDispatchToProps = (dispatch) =>{

    return{
        checkUser: () => dispatch(checkUser()),
        resetPassword: (email) => dispatch(resetPassword(email))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)


