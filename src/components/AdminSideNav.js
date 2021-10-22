import React, { Component } from 'react'
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogoutTheUser, toogleNav } from "../actions/auth";
import { MdAdd, MdDashboard, MdInsertDriveFile, MdList } from "react-icons/md";
import { GoCommentDiscussion } from "react-icons/go";
import { ImUsers } from "react-icons/im";
import { IoMdLogOut } from 'react-icons/io';
import { RiAdminLine } from 'react-icons/ri';


export class AdminSideNav extends Component {
    render() {
        return (
            <ul className="side-nav fixed transparent z-depth-0">
                <li className="active"><Link to="/admin" className="admin-side-menu"><MdDashboard className="admin-side-menu-icon" /> Dashboard</Link></li>
                <li><Link to="/admin-create-topic" className="admin-side-menu"><MdAdd className="admin-side-menu-icon" /> Create topic</Link></li>
                <li><Link to="/topics-list" className="admin-side-menu"><GoCommentDiscussion className="admin-side-menu-icon" /> Topics & Discussions</Link></li>
                <li><Link to="/users" className="admin-side-menu"><ImUsers className="admin-side-menu-icon" /> Users</Link></li>
                <li><Link to="/admins" className="admin-side-menu"><RiAdminLine className="admin-side-menu-icon" /> Administrators</Link></li>
                <li><Link to="/test" className="admin-side-menu"><MdInsertDriveFile className="admin-side-menu-icon" /> Prepare test</Link></li>
                <li><Link to="/tests" className="admin-side-menu"><MdList className="admin-side-menu-icon" /> Tests list</Link></li>
                <li><div className="divider"></div></li>
                <li onClick={() => this.props.LogoutTheUser()}><Link className="admin-side-menu"><IoMdLogOut className="admin-side-menu-icon" /> Logout</Link></li>
                {/* <li><Link to="/admin"><i className="material-icons">help</i>Help & Feedback</Link></li> */}
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