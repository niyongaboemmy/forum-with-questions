import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogoutTheUser, toogleNav } from "../actions/auth";

export class AdminNav extends Component {
    state = {
        user: null,
        modal: false,
    }
    componentDidMount = () => {
        if (this.props.auth.userCategory === "admin" && this.props.auth.user_id !== null) {
            if (this.props.auth.user !== null) {
                this.setState({ user: this.props.auth.user.data[0] });
            } else {
                this.setState({ user: this.props.auth.data });
            }
        } else {
            this.props.LogoutTheUser();
        }
    }
    render() {
        return (
            <div class="navbar-fixed">
                {console.log("Logged: ", this.state.user)}
                <nav>
                    <div class="nav-wrapper">
                        <ul>
                            <li><Link to="/admin"><i class="material-icons">menu</i></Link></li>
                            <li><Link class="title" to="/admin">Dashboard</Link></li>
                        </ul>
                        <ul class="right">
                            <li><a href="#!"><i class="fas fa-user"></i> {this.state.user !== null && this.state.user.fname}</a></li>
                            {/* <li><a href="#!"><i class="material-icons">apps</i></a></li>
                            <li><a href="#!"><i class="material-icons">settings</i></a></li>
                            <li><a href="#!"><i class="material-icons">help</i></a></li> */}
                            <li><span style={{marginRight: '10px', cursor: 'pointer'}} onClick={() => this.props.LogoutTheUser()}><i class="fas fa-sign-out-alt"></i></span></li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

AdminNav.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    toogleNav: state.toogleNav,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser, toogleNav })(
    AdminNav
);
