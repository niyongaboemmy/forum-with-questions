import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { LoginSuccess } from "../../actions/auth";
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import { AiOutlineLogin, AiOutlineUser, AiOutlineUserAdd, AiFillStepBackward, AiFillForward, AiFillStepForward, AiOutlineFastForward, AiOutlineLeft, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineFileAdd } from "react-icons/ai";
import { RiArrowLeftSLine, RiArrowRightSLine, RiSave2Fill } from "react-icons/ri";
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';

export class RegisterMemberShare extends Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        gender: "",
        sector: "",
        password: "",
        retypePassword: "",
        loading: false,
        error: { element: "", msg: "" },
        success: "",
        coop_id: "",
    };
    render() {
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                    <div className="row">
                        <div className="col xl2 l2 m2 s12">
                            <div class="fixed-actin-btn">
                                <Link to="/shares" class="btn-floating btn-large hoverable bg-color">
                                    <i class="large material-icons">list</i>
                                </Link>
                            </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <div style={{paddingTop: '15px'}}>
                                <b className="title-txt">Member share</b>
                                <Link to="/cooperative-share" className="my-btn right bg-color"><AiOutlineUserAdd /> Cooperative share</Link>
                            </div>
                        </div>
                    </div>
                    {/* <hr /> */}
                    <div className="row">
                        <div className="col l12">
                            {this.state.success !== "" ? (<div className="alert-success">{this.state.success}</div>) : ""}
                            {this.state.error.element === "main" ? (<div className="alert-danger">{this.state.error.msg}</div>) : ""}
                        </div>
                    </div>
                    <form className="row">
                        
                        <div className="input-field col l12">
                            {this.state.loading === true ? 
                            (<center><Loading msg="Please wait" /></center>) : (
                            <center>
                            <NavLink className="my-btn left hoverable text-dark" to="/shares"><RiArrowLeftSLine className="icon" /> Back to list</NavLink>
                                <Alert alert="danger" msg={this.state.error.element === "main" ? (this.state.error.msg) : ''} />
                                {this.state.loading === true ? (<Loading msg="Please wait" />) : 
                                (<button type="submit" className="my-btn bg-color hoverable center"><AiOutlineFileAdd className="icon" /> Add share</button>)}
                            </center>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

RegisterMemberShare.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    RegisterMemberShare
);