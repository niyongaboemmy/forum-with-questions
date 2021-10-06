import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogoutTheUser, toogleNav } from "../actions/auth";

export class AdminSideNav extends Component {
    render() {
        return (
            <ul class="side-nav fixed transparent z-depth-0">
                <li class="active"><Link to="/admin"><i class="material-icons">dashboard</i>Dashboard</Link></li>
                <li><Link to="/topics-list"><i class="material-icons">mail</i>Topics</Link></li>
                <li><Link to="/users"><i class="material-icons">person</i>Users</Link></li>
                <li><div class="divider"></div></li>
                <li onClick={() => this.props.LogoutTheUser()}><Link to="/admin"><i class="material-icons">logout</i>Logout</Link></li>
                {/* <li><Link to="/admin"><i class="material-icons">help</i>Help & Feedback</Link></li> */}
            </ul>
        )
    }
}

AdminSideNav.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    toogleNav: state.toogleNav,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser, toogleNav })(
    AdminSideNav
);