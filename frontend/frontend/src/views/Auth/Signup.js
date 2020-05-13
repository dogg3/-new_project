import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";
import Layout from "./Layout";
import {checkUser, signUp} from "./FireabaseSlice";
import {connect} from 'react-redux'

const INITIAL_STATE = {
    email: '',
    password1: '',
    password2:'',
    error: null,
    finished:null
};




class Signup extends Component {

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
        this.state.finished = false;
        event.preventDefault();
        // eslint-disable-next-line no-undef
        const  {email, password1} = this.state;
        //console.log()("Email from inside signup" +  email)
         this.props.signUp(email, password1)
             .then(()=>{
                 this.setState()
            }).catch((err)=>{
            //console.log()(err)
             this.setState({
                 error:err
             })
         })
    };


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };


render() {


        const { email, password1, password2, error } = this.state;
        const isInvalid = password1 === '' || email === '' ;
        return (
            <Layout header="Sign up to get started">
                <Form.Input
                    fluid
                    icon="user"
                    name="email"
                    onChange={this.onChange}
                    iconPosition="left"
                    placeholder="E-mail address"
                    className="auth-input-field"
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    name="password1"
                    onChange={this.onChange}
                    placeholder="Password"
                    type="password"
                    className="auth-input-field"
                />
                <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    onChange={this.onChange}
                    name="password2"
                    placeholder="Confirm Password"
                    type="password"
                    className="auth-input-field"
                />


                    <Button  onClick={this.onSubmit} disabled={isInvalid} color="teal" fluid size="huge">
                        Sign up
                    </Button>

                {error && error}
                <Message size="big">
                    <Link to="/login">Already Registered?</Link>
                </Message>
            </Layout>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return{
        signUp: (email, password) => dispatch(signUp(email, password)),
        checkUser: () => dispatch(checkUser())
    }
};

const mapStateToProps = state => {
    const {auth} = state;
    return auth
};


export default connect(mapStateToProps, mapDispatchToProps)(Signup)