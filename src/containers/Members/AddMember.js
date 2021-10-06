import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { LoginSuccess } from "../../actions/auth";
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import { AiOutlineLogin, AiOutlineUser, AiOutlineUserAdd, AiFillStepBackward, AiFillForward, AiFillStepForward, AiOutlineFastForward, AiOutlineLeft, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { RiArrowLeftSLine, RiArrowRightSLine, RiSave2Fill } from "react-icons/ri";
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';

export class AddMember extends Component {
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

    componentDidMount = () => {
        // this.setState({ coop_id:  });
    }

    handleFname = (input) => {
        this.setState({ fname: input })
    }
    handleLname = (input) => {
        this.setState({ lname: input })
    }
    handleGender = (input) => {
        this.setState({ gender: input })
    }
    handleSector = (input) => {
        this.setState({ sector: input })
    }
    handleEmail = (input) => {
        this.setState({ email: input })
    }
    handlePassword = (input) => {
        this.setState({ password: input })
    }
    handleRetypePassword = (input) => {
        this.setState({ retypePassword: input })
    }

    validatePersonalInfo = async (e) => {
        e.preventDefault();

        if (this.state.fname.length === 0) {
            return this.setState({error: { element: "fname", msg: "Please fill first name" }})
        }
        else if (this.state.lname.length === 0) {
            return this.setState({error: { element: "lname", msg: "Please fill last name" }})
        }
        else if (this.state.email.length < 4) {
            return this.setState({error: { element: "email", msg: "Please email should be 5 characters min" }})
        }
        else if (this.state.gender.length === 0) {
            return this.setState({error: { element: "gender", msg: "Please select gender" }})
        }
        else if (this.state.sector.length === 0) {
            return this.setState({error: { element: "sector", msg: "Please select sector" }})
        }
        else if (this.state.password.length < 5) {
            return this.setState({error: { element: "password", msg: "Please password should be 5 characters min" }})
        }
        else if (this.state.retypePassword.length === 0) {
            return this.setState({error: { element: "retypePassword", msg: "Please confirm password" }})
        }
        else if (this.state.retypePassword !== this.state.password) {
            return this.setState({error: { element: "retypePassword", msg: "Please password not match" }})
        }
        else {
            if (this.props.auth.selectedCoop !== null) {
                // Values of Member
                let member_id = uuidv4();
                let coop_id = "";
                let sector_id = this.state.sector;
                let fname = this.state.fname;
                let lname = this.state.lname;
                let gender = this.state.gender;
                let dob = "none";
                let nid = "none";
                let complete_share = "0";
                let given_share = "0";
                let memberemail = this.state.email;
                let memberpassword = this.state.password;
                let profile_img = "none";
                let leader = 0;

                // Setting coop id
                coop_id = this.props.auth.selectedCoop;

                try {
                    this.setState({ loading: true });
                    const res_member = await axios.post(
                        `${API_URL}/members`,
                        {
                            member_id,
                            sector_id,
                            coop_id,
                            fname,
                            lname,
                            gender,
                            dob,
                            nid,
                            complete_share,
                            given_share,
                            memberemail,
                            memberpassword,
                            profile_img,
                            leader,
                        },
                        CONFIG
                    );
                    console.log("Success: ", res_member);
                    if (res_member.status === 200) {
                        this.setState({ loading: false });
                        this.setState({ success: res_member.data.msg })
                    }
                } catch (error) {
                    this.setState({ loading: false });
                    console.log("member error: ", {...error});
                    if (error.response === undefined) {
                        return this.setState({
                            error: {element: "main", msg: "Network error!"}
                        });
                    }
            
                    if (error.response.status === 401) {
                        return this.setState({
                            error: {element: "main", msg: error.response.data.msg}
                        });
                    } else {
                        return this.setState({
                            error: {element: "main", msg: error.response.data.msg}
                        });
                    }
                }
            }
        }
    }
    render() {
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                    <div className="row">
                        <div className="col xl2 l2 m2 s12">
                            <div class="fixed-actin-btn">
                                <Link to="/members" class="btn-floating btn-large hoverable bg-color">
                                    <i class="large material-icons">list</i>
                                </Link>
                            </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <div style={{paddingTop: '15px'}}>
                                <b className="title-txt">Add new member</b>
                                <Link to="/existing-member" className="my-btn right bg-color"><AiOutlineUserAdd /> Existing</Link>
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
                    <form onSubmit={this.validatePersonalInfo} className="row">
                        <div className="col l12 m12 s12">
                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                <input 
                                disabled={this.state.loading}
                                    onChange={(e) => {
                                        this.handleFname(e.target.value);
                                        this.setState({error: { element: "", msg: "" } });
                                    }}
                                    value={this.state.fname !== "" ? (this.state.fname) : ("")}
                                placeholder="First name" type="text" className={`browser-default validate ${this.state.error.element === 'fname' ? 'danger-input' : ''}`} />
                                {this.state.error.element === "fname" ? (
                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                ) : ""}
                            </div>
                            <div className={`input-field col xl6 l6 m6 s12 register-input-container`}>
                                <input 
                                disabled={this.state.loading}
                                    onChange={(e) => {
                                        this.handleLname(e.target.value);
                                        this.setState({error: { element: "", msg: "" } });
                                    }}
                                    value={this.state.lname !== "" ? (this.state.lname) : ("")}
                                
                                placeholder="Last name" type="text" className={`browser-default validate ${this.state.error.element === 'lname' ? 'danger-input' : ''}`} />
                                {this.state.error.element === "lname" ? (
                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                ) : ""}
                            </div>
                            <div className="input-field col s12 register-input-container">
                                <input 
                                disabled={this.state.loading}
                                    onChange={(e) => {
                                        this.handleEmail(e.target.value);
                                        this.setState({error: { element: "", msg: "" } });
                                    }}
                                    value={this.state.email !== "" ? (this.state.email) : ("")}
                                placeholder="Email" type="email" className={`browser-default validate ${this.state.error.element === 'email' ? 'danger-input' : ''}`} />
                                {this.state.error.element === "email" ? (
                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                ) : ""}
                            </div>
                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                <select 
                                disabled={this.state.loading}
                                onChange={(e) => {
                                    this.handleGender(e.target.value);
                                    this.setState({error: { element: "", msg: "" } });
                                }}
                                className={`browser-default validate ${this.state.error.element === 'gender' ? 'danger-input' : ''}`}>
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {this.state.error.element === "gender" ? (
                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                ) : ""}
                            </div>
                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                <select 
                                disabled={this.state.loading}
                                onChange={(e) => {
                                    this.handleSector(e.target.value);
                                    this.setState({error: { element: "", msg: "" } });
                                }}
                                className={`browser-default validate ${this.state.error.element === 'sector' ? 'danger-input' : ''}`}>
                                    <option value="">Select sector</option>
                                    <option value="1">Muhanga</option>
                                </select>
                                {this.state.error.element === "sector" ? (
                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                ) : ""}
                            </div>
                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                <input 
                                disabled={this.state.loading}
                                    onChange={(e) => {
                                        this.handlePassword(e.target.value);
                                        this.setState({error: { element: "", msg: "" } });
                                    }}
                                    value={this.state.password !== "" ? (this.state.password) : ("")}
                                placeholder="Password" type="password" className={`browser-default validate ${this.state.error.element === 'password' ? 'danger-input' : ''}`} />
                                {this.state.error.element === "password" ? (
                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                ) : ""}
                            </div>
                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                <input 
                                disabled={this.state.loading}
                                    onChange={(e) => {
                                        this.handleRetypePassword(e.target.value);
                                        this.setState({error: { element: "", msg: "" } });
                                    }}
                                    value={this.state.retypePassword !== "" ? (this.state.retypePassword) : ("")}
                                placeholder="Retype Password" type="password" className={`browser-default validate ${this.state.error.element === 'retypePassword' ? 'danger-input' : ''}`} />
                                {this.state.error.element === "retypePassword" ? (
                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                ) : ""}
                            </div>
                        </div>
                        <div className="input-field col l12">
                            {this.state.loading === true ? 
                            (<center><Loading msg="Please wait" /></center>) : (
                            <center>
                            <NavLink className="my-btn left hoverable text-dark" to="/members"><RiArrowLeftSLine className="icon" /> Back to list</NavLink>
                                <Alert alert="danger" msg={this.state.error.element === "main" ? (this.state.error.msg) : ''} />
                                {this.state.loading === true ? (<Loading msg="Please wait" />) : 
                                (<button type="submit" className="my-btn bg-color hoverable center"><AiOutlineUserAdd className="icon" /> Add member</button>)}
                            </center>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

AddMember.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    AddMember
);