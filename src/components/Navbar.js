import React, { Component, Fragment } from 'react'
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { LogoutTheUser, toogleNav } from "../actions/auth";
import Modal from '../shared/Modal/Modal';

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
        return (
            <Fragment>
                <div class="navbar-fixed">
                    <nav>
                        <div class="container-fluid">
                            <div class="nav-wrapper">
                                <span style={{cursor: 'pointer'}} onClick={() => this.setState({ modal: true })} class="brand-logo-icon"><i class="fas fa-bars"></i>&nbsp; UCN</span>
                                <span style={{cursor: 'pointer'}} onClick={() => this.setState({ modal: true })}><i className="fas fa-bars right menus-bar"></i></span>
                                {this.state.user !== null ? (
                                    <ul class="right hide-on-med-and-down" style={{marginRight: '15px'}}>
                                        <li><NavLink to="/create-topic"><i className="fas fa-edit"></i> Create a topic</NavLink></li>
                                        <li><Link to="/topics"><i className="fas fa-list"></i> View topics</Link></li>
                                        <li style={{paddingLeft: '15px'}}><i className="fas fa-user"></i> {this.state.user.fname} {this.state.user.lname} </li>
                                        <li style={{paddingLeft: '15px', cursor: 'pointer'}} onClick={() => this.props.LogoutTheUser()}><i class="fa fa-arrow-alt-circle-right" style={{cursor: 'pointer'}}></i> Logout</li>
                                    </ul>
                                ) : (
                                    <ul class="right hide-on-med-and-down">
                                        <li><Link to="/"><i className="fas fa-home"></i> Home</Link></li>
                                        <li><Link to="/admin-login"><i className="fas fa-home"></i> Admin</Link></li>
                                        <li><Link to="/login"><i className="fas fa-user-circle"></i> Login</Link></li>
                                        <li><Link to="/register" class="btn-small waves-effect outline-btn nav-outline-btn">Register</Link></li>
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