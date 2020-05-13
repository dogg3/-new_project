import React from "react";import { Link } from "react-router-dom";
import {signOut} from "../../../../views/Auth/FireabaseSlice";
import {connect} from 'react-redux'




import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink, Button, Col, ButtonGroup
} from "shards-react";




class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);

  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }



  render() {



    return (
        <ButtonGroup style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center'}} className="mb-3">

        {!this.props.auth.isEmpty && <span style={{margin:'10px'}}>{this.props.profile.email}</span>}
        <Button onClick={e=> {this.props.signOut()}} outline theme="info">
          Logout
        </Button>
        </ButtonGroup>
    );
  }
}
const mapStateToProps = state => {
  const {auth,profile} = state.firebase;
  return {auth,profile}
};


const mapDispatchToProps = dispatch => {
return {
    signOut: () => dispatch(signOut())

  }
};
export default connect(mapStateToProps, mapDispatchToProps) (UserActions)