import React, { Component } from "react";
import axios from "axios";
import { AiFillAlipayCircle, AiOutlineDashboard, AiOutlineLogin, AiOutlineSetting, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { API_URL, CONFIG } from "../../utils/api";
import { TOKEN_NAME } from "../../utils/api";
import { connect } from "react-redux";
import { LoginSuccess } from "../../actions/auth";
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import PublicNav from "../../components/PublicNav";
import PublicFooter from "../../components/PublicFooter";
import { IoMdArrowRoundBack } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';

export class AdminRegister extends Component {
    state = {
        step: 1,
        loading: false,
        error: { element: "", msg: "" },
        success: "",
        sector_id: "",
        name: "",
        fname: "",
        lname: "",
        gender: "",
        phonenumber: "",
        useremail: "",
        userpassword: "",
        retypepassword: "",
    }
    submitRegistration = async (accountCategory) => {
        if (this.state.name === "") {
            return this.setState({ error: { element: "name", msg: `Please fill ${accountCategory} name` } })
        }
        else if (this.state.sector_id === "") {
            return this.setState({ error: { element: "sector_id", msg: "Please select location" } })
        }
        else if (this.state.fname === "") {
            return this.setState({ error: { element: "fname", msg: `Please fill first name` } })
        }
        else if (this.state.lname === "") {
            return this.setState({ error: { element: "lname", msg: `Please fill last name` } })
        }
        else if (this.state.gender === "") {
            return this.setState({ error: { element: "gender", msg: `Please select gender` } })
        }
        else if (this.state.phonenumber === "") {
            return this.setState({ error: { element: "phonenumber", msg: `Please fill phone number` } })
        }
        else if (this.state.useremail === "") {
            return this.setState({ error: { element: "useremail", msg: `Please fill email` } })
        }
        else if (this.state.userpassword === "") {
            return this.setState({ error: { element: "userpassword", msg: `Please fill password` } })
        }
        else if (this.state.retypepassword === "") {
            return this.setState({ error: { element: "retypepassword", msg: `Please confirm password` } })
        }
        else if (this.state.userpassword !== this.state.retypepassword) {
            return this.setState({ error: { element: "retypepassword", msg: `Please password not match` } })
        }
        else {
            let postLocation = null;
            let postLocationUser = null;
            switch (accountCategory) {
                case "union":
                    postLocation = "unions";
                    postLocationUser = "unionUsers";
                    break;
                case "federation":
                    postLocation = "federations";
                    postLocationUser = "fedusers";
                    break;
                case "confederation":
                    postLocation = "confederations";
                    postLocationUser = "confusers";
                    break;
                default:
                    break;
            }
            let sector_id = this.state.sector_id;
            let register_name = this.state.name;
            let fname = this.state.fname;
            let lname = this.state.lname;
            let gender = this.state.gender;
            let phonenumber = this.state.phonenumber;
            let useremail = this.state.useremail;
            let userpassword = this.state.userpassword;
            
            this.setState({ loading: true });
            try {
                let register_id = uuidv4();
                // register cooperative
                const res = await axios.post(
                    `${API_URL}/${postLocation}`,
                    {
                        register_id,
                        sector_id,
                        register_name
                    },
                    CONFIG
                );
                if (res.status === 200) {
                    try {
                        let register_user_id = uuidv4();
                        const res_user = await axios.post(
                            `${API_URL}/${postLocationUser}`,
                            {
                                register_user_id,
                                register_id,
                                fname,
                                lname,
                                gender,
                                phonenumber,
                                useremail,
                                userpassword
                            },
                            CONFIG
                        );
                        console.log("Success: ", res_user);
                        if (res_user.status === 200) {
                            this.setState({ loading: false });
                            this.setState({ success: res_user.data.msg })
                        }
                    } catch (error) {
                        this.setState({ loading: false });
                        console.log("user error: ", {...error});
                        if (error.response === undefined) {
                            return this.setState({
                                error: { element: "main", msg: "Network error!" }
                            });
                        }
                
                        if (error.response.status === 401) {
                            return this.setState({
                                error: { element: "main", msg: error.response.data.msg }
                            });
                        } else if (error.response.status === 400) {
                            return this.setState({
                                error: { element: "main", msg: error.response.data.errors[0].msg }
                            });
                        }
                        else {
                            return this.setState({
                                error: { element: "main", msg: error.response.data.msg }
                            });
                        }
                    }
                }
            } catch (error) {
                this.setState({ loading: false });
                console.log("err req: ", {...error});
                if (error.response === undefined) {
                    return this.setState({
                        error: { element: "main", msg: "Network error!" }
                    });
                }
        
                if (error.response.status === 401) {
                    return this.setState({
                        error: { element: "main", msg: error.response.data.msg }
                    });
                } else if (error.response.status === 400) {
                    return this.setState({
                        error: { element: "main", msg: error.response.data.errors[0].msg }
                    });
                } else {
                    return this.setState({
                        error: { element: "main", msg: error.response.data.msg }
                    });
                }
            }
        }
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col xl1 l1 m1 s12" />
                    <div className="col xl10 l10 m10 s12">
                        <div className="login-container animate__animated animate__fadeIn">
                            <div style={{height: '30px'}}><IoMdArrowRoundBack className="left regist-bars" onClick={() => this.props.UpdateCategory("")} /> <div style={{width: 'fill-content', paddingTop: '11px', paddingLeft: '48px', color: '#165877'}}>Back</div></div>
                            <form>
                                <h1 className="center-align" style={{marginBottom: '5px', marginTop: '10px'}}><AiOutlineUserAdd className="login-icon" /></h1>
                                <div style={{marginBottom: '10px'}} className="center-align">
                                    <div className="title-txt">Register a {this.props.category}</div>
                                </div>
                                <div className="row">
                                    <div className="col xl2 l2 m1 s12" />
                                    <div className="col xl8 l8 m10 s12">
                                        <div className="row">
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                                <input
                                                onChange={(e) => {
                                                    this.setState({name: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                disabled={this.state.loading}
                                                placeholder={`Name of ${this.props.category}`} type="text" className={`browser-default validate ${this.state.error.element === 'name' ? 'danger-input' : ''}`} />
                                                {this.state.error.element === "name" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                                <select 
                                                disabled={this.state.loading}
                                                onChange={(e) => {
                                                    this.setState({sector_id: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                className={`browser-default validate ${this.state.error.element === 'sector_id' ? 'danger-input' : ''}`}>
                                                    <option value="">select {this.props.category} location</option>
                                                    <option value="1">Muhanga</option>
                                                </select>
                                                {this.state.error.element === "sector_id" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="col xl 12 l12"><br/><center>Personal Information</center></div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                                <input
                                                disabled={this.state.loading}
                                                onChange={(e) => {
                                                    this.setState({fname: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                placeholder="First name" type="text" className={`browser-default validate ${this.state.error.element === 'fname' ? 'danger-input' : ''}`} />
                                                {this.state.error.element === "fname" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                                <input
                                                disabled={this.state.loading}
                                                onChange={(e) => {
                                                    this.setState({lname: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                placeholder="Last name" type="text" className={`browser-default validate ${this.state.error.element === 'lname' ? 'danger-input' : ''}`} />
                                                {this.state.error.element === "lname" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                            <select 
                                                disabled={this.state.loading}
                                                onChange={(e) => {
                                                    this.setState({gender: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                className={`browser-default validate ${this.state.error.element === 'gender' ? 'danger-input' : ''}`}>
                                                    <option value="">select gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select>
                                                {this.state.error.element === "gender" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                                <input
                                                disabled={this.state.loading}
                                                onChange={(e) => {
                                                    this.setState({phonenumber: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                placeholder="Phone" type="text" className={`browser-default validate ${this.state.error.element === 'phonenumber' ? 'danger-input' : ''}`} />
                                                {this.state.error.element === "phonenumber" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                                <input
                                                disabled={this.state.loading}
                                                onChange={(e) => {
                                                    this.setState({useremail: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                placeholder="Email" type="email" className={`browser-default validate ${this.state.error.element === 'useremail' ? 'danger-input' : ''}`} />
                                                {this.state.error.element === "useremail" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                                <input
                                                disabled={this.state.loading}
                                                onChange={(e) => {
                                                    this.setState({userpassword: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                placeholder="Password" type="password" className={`browser-default validate ${this.state.error.element === 'userpassword' ? 'danger-input' : ''}`} />
                                                {this.state.error.element === "userpassword" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                                <input
                                                disabled={this.state.loading}
                                                onChange={(e) => {
                                                    this.setState({retypepassword: e.target.value});
                                                    this.setState({error: { element: "", msg: "" } });
                                                }}
                                                placeholder="Password" type="password" className={`browser-default validate ${this.state.error.element === 'retypepassword' ? 'danger-input' : ''}`} />
                                                {this.state.error.element === "retypepassword" ? (
                                                    <span className="helper-text danger-color">{this.state.error.msg}</span>
                                                ) : ""}
                                            </div>
                                            <div className="input-field col xl6 l6 m6 s12 register-input-container">
                                            {this.state.loading === true && (
                                                <div style={{marginTop: '0%', marginBottom: '0%'}}>
                                                    <center><Loading msg="Please wait" /></center>
                                                </div>
                                            )}
                                            {this.state.success === "" ? (
                                                <div>
                                                    {this.state.error.element === "main" && (
                                                        <div className="alert-danger">
                                                            <center>{this.state.error.msg}</center>
                                                        </div>
                                                    )}
                                                    {this.state.loading === false &&
                                                    <div onClick={() => this.submitRegistration(this.props.category)} className="my-btn bg-success hoverable right">Register {this.props.category}</div>
                                                    }
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="alert-success">
                                                        <center>{this.state.success}</center>
                                                    </div>
                                                    <center>
                                                        <br />
                                                        <Link className="my-btn bg-success hoverable" to="/login-category">Click here to login</Link>
                                                    </center>
                                                </div>
                                                
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col xl2 l2 m1 s12" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col xl1 l1 m1 s12" />
                </div>
            </div>
        )
    }
}

export default AdminRegister
