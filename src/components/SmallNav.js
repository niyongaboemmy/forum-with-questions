import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { Menus } from '../utils/menus';
import { LogoutTheUser } from "../actions/auth";


class Sidenav extends Component {

    render() {
        return (
            <div className="hide-sm">
                <u className="sidenav small-side-nav sidenav-fixed animate__animated animate__fadeIn hide-sm">
                    <div>
                        <h1 className="center-align nav-header"><AiOutlineUser className="user-icon animate__animated animate__zoomIn" /></h1>
                    </div>
                    {/* <li>
                        <div style={{backgroundColor: 'gainsboro', paddingLeft: '10px', paddingRight: '10px'}}>
                            Mr. Emmy <label>Cooperative name</label><AiFillCaretDown style={{float: "right", marginTop: '16px', cursor: 'pointer'}} />
                        </div>
                    </li> */}
                    {Menus.map((item) => {
                        if (item.user === this.props.auth.userCategory || item.user === "all") {
                            return (
                                <div className="animate__animated animate__zoomIn" key={item.key}><NavLink to={`${item.link}`}>{item.icon}<br /><div className="small-side-text">{item.name}</div></NavLink></div>
                            )
                        } else { return "" }
                    })}
                </u>
            </div>
        )
    }
}
Sidenav.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    Sidenav
);