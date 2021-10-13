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
        if (this.props.auth.token === null) {
            this.props.LogoutTheUser();
        }
    }
    render() {
        const user = this.props.auth.userCategory === "admin" ? this.props.auth.user !== null ? this.props.auth.user : this.props.auth.data : null;
        return (
            <div class="navbar-fixed">
                {console.log("Logged: ", this.props.auth)}
                <nav>
                    <div class="nav-wrapper">
                        <ul>
                            <li><Link to="/admin"><i class="material-icons nav-text">menu</i></Link></li>
                            <li><Link class="title nav-text" to="/admin">Dashboard</Link></li>
                        </ul>
                        <ul class="right">
                            <li className="nav-text"><a href="#!" className="nav-text"><i class="fas fa-user nav-text"></i> {user !== null && user.fname}</a></li>
                            {/* <li><a href="#!"><i class="material-icons">apps</i></a></li>
                            <li><a href="#!"><i class="material-icons">settings</i></a></li>
                            <li><a href="#!"><i class="material-icons">help</i></a></li> */}
                            <li><span style={{marginRight: '10px', cursor: 'pointer'}} onClick={() => user !== null && this.props.LogoutTheUser()}><i class="fas fa-sign-out-alt nav-text"></i></span></li>
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
