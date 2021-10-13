import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogoutTheUser, toogleNav } from "../actions/auth";
import Modal from '../shared/Modal/Modal';
import MyLogo from '../assets/content/logo1.png';

class Navbar extends Component {
    state = {
        user: null,
        modal: false,
    }
    componentDidMount = () => {
        if (this.props.auth.userCategory === "user" && this.props.auth.user_id !== null) {
            if (this.props.auth.user !== null) {
                this.setState({ user: this.props.auth.user.data[0] });
            } else {
                this.setState({ user: this.props.auth.data });
            }
        }
    }
    render() {
        // const { isAuthenticated, user, loading, navOpen } = this.props.auth;
        const user = this.props.auth.userCategory === "user" && this.props.auth.user_id !== null ? this.props.auth.user !== null ? this.props.auth.user.data[0] : this.props.auth.data : null;
        return (
            <Fragment>
                <div className="navbar-fixed">
                    <nav>
                        <div className="container">
                            <div className="nav-wrapper">
                                <Link to="/" style={{cursor: 'pointer'}} className="brand-logo-icon">&nbsp; <img src={MyLogo} style={{height: '40px', marginTop: '10px'}} alt="" /></Link>
                                <span style={{cursor: 'pointer', marginTop: '10px'}} onClick={() => this.setState({ modal: true })}><i className="fas fa-bars right menus-bar nav-text hidden-lg" style={{cursor: 'pointer', marginTop: '10px'}}></i></span>
                                {console.log(this.props.auth.user)}
                                {user !== null ? (
                                    <ul className="right hide-on-med-and-down nav-text" style={{marginRight: '15px'}}>
                                        <li><NavLink  className="nav-text"to="/create-topic">Create a topic</NavLink></li>
                                        <li><Link className="nav-text" to="/topics">View topics</Link></li>
                                        <li style={{paddingLeft: '15px'}}>{user.fname} {user.lname} </li>
                                        <li style={{paddingLeft: '15px', cursor: 'pointer'}} onClick={() => this.props.LogoutTheUser()}>Logout</li>
                                    </ul>
                                ) : (
                                    <ul className="right hide-on-med-and-down nav-text">
                                        <li><Link className="nav-text" to="/">Home</Link></li>
                                        <li><Link className="nav-text" to="/admin-login">Admin</Link></li>
                                        <li><Link className="nav-text" to="/login">Login</Link></li>
                                        <li><Link to="/register" className="btn-small waves-effect outline-btn nav-outline-btn">Register</Link></li>
                                    </ul>
                                )}
                                
                            </div>
                        </div>
                    </nav>
                </div>
                {this.state.modal === true && (
                    <Modal
                        close={() => this.setState({modal: false})}
                        backDrop={true}
                        closeBackdrop={false}
                        theme="primary"
                        title="Menus"
                        className="open animate-in sm-modal menus-container-mobile animate__animated animate__bounceIn"
                        >
                        <div className="row">
                            <div className="col xl2 l2 m2 s4">
                                <div className="modal-menu animate__animated animate__zoomIn"><NavLink to="/"><i className="fas fa-home"></i><br /><div className="modal-menu-text">Home</div></NavLink></div>
                            </div>
                            {this.state.user !== null ? (
                                <>
                                    <div className="col xl2 l2 m2 s4">
                                        <div className="modal-menu animate__animated animate__zoomIn"><NavLink to="/"><i className="fas fa-user-circle"></i><br /><div className="modal-menu-text">{this.state.user.fname} {this.state.user.lname}</div></NavLink></div>
                                    </div>
                                    <div className="col xl2 l2 m2 s4">
                                        <div className="modal-menu animate__animated animate__zoomIn"><NavLink to="/create-topic"><i className="fas fa-edit"></i><br /><div className="modal-menu-text">Create topic</div></NavLink></div>
                                    </div>
                                    <div className="col xl2 l2 m2 s4">
                                        <div className="modal-menu animate__animated animate__zoomIn"><NavLink to="/topics"><i className="fas fa-list"></i><br /><div className="modal-menu-text">Topics list</div></NavLink></div>
                                    </div>
                                    <div className="col xl2 l2 m2 s4">
                                        <div className="modal-menu animate__animated animate__zoomIn" onClick={() => this.props.LogoutTheUser()}><NavLink to="#"><i className="fas fa-arrow-alt-circle-right"></i><br /><div className="modal-menu-text">Logout</div></NavLink></div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="col xl2 l2 m2 s4">
                                        <div className="modal-menu animate__animated animate__zoomIn"><NavLink to="/admin-login"><i className="fas fa-home"></i><br /><div className="modal-menu-text">Admin</div></NavLink></div>
                                    </div>
                                    <div className="col xl2 l2 m2 s4">
                                        <div className="modal-menu animate__animated animate__zoomIn"><NavLink to="/login"><i className="fas fa-user-circle"></i><br /><div className="modal-menu-text">Login</div></NavLink></div>
                                    </div>
                                    <div className="col xl2 l2 m2 s4">
                                        <div className="modal-menu animate__animated animate__zoomIn"><NavLink to="/register"><i className="fas fa-user-plus"></i><br /><div className="modal-menu-text">Register</div></NavLink></div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Modal>
                )}
            </Fragment>
        )
    }
}

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    toogleNav: state.toogleNav,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser, toogleNav })(
    Navbar
);