import React, { Component, Fragment } from "react";
import axios from "axios";
import { AiOutlineLogin, AiOutlineUserAdd, } from "react-icons/ai";
import { API_URL, CONFIG } from "../../utils/api";
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import { AdminSideNav } from "../../components/AdminSideNav";
import { AdminNav } from "../../components/AdminNav";

class RegisterAdmin extends Component {
    state = {
        loading: false,
        error: { element: "", msg: "" },
        fname: "",
        lname: "",
        username: "",
        password: "",
        modal: false,
        loggedMember: "",
    };

    componentDidMount() {
        
    }
    RegisterNewAdmin = async (e) => {
        e.preventDefault();
        
        console.log("Button clicked!");
        this.setState({error: {
            element: "",
            msg: "",
        }});
        try {
            // validation
            if (this.state.fname.length <= 1) {
                return this.setState({error: {
                    element: "fname",
                    msg: "The first name must not be less than 1 character",
                }});
            }
            if (this.state.lname.length <= 1) {
                return this.setState({error: {
                    element: "lname",
                    msg: "The last name must not be less than 1 character",
                }});
            }
        
            if (this.state.username.length <= 1) {
                return this.setState({error: {
                    element: "username",
                    msg: "The username must not be less than 1 character",
                }});
            }
        
        
            // password
            if (this.state.password.length <= 1) {
                return this.setState({error: {
                    element: "password",
                    msg: "The password must not be less than 1 character",
                }});
            }
    
            this.setState({loading: true});

            let fname = this.state.fname;
            let lname = this.state.lname;
            let username = this.state.username;
            let password = this.state.password;

            const res = await axios.post(
                `${API_URL}/users`,
                {
                    fname,
                    lname,
                    username,
                    password,
                },
                CONFIG
            );
            
            this.setState({loading: true});
    
            this.props.history.push("/login");  
            return false;
    
        // errors
        } catch (error) {
            console.log("Reg err: ", {...error});
            this.setState({loading: false});
    
            if (error.response === undefined) {
                return this.setState({error: {
                    element: "main",
                    msg: "Network error!",
                }});
            }
        
            if (error.response.status === 401) {
                return this.setState({error: {
                    element: "main",
                    msg: error.response.data.msg,
                }});
            } else if (error.response.status === 400) {
                return this.setState({error: {
                    element: "main",
                    msg: error.response.data.errors ? error.response.data.errors[0].msg : "Something went wrong",
                }});
            } else {
                return this.setState({error: {
                    element: "main",
                    msg: error.response.data.msg,
                }});
            }
        }
    };
    render() {
        return (
            <Fragment>
              <div className="admin-container">
                {/* Nav Bar here */}
                <AdminNav />
                <div className="row">
                    <div className="col xl2 l2 m3 s12">
                        {/* Side Nav here */}
                        <AdminSideNav />
                    </div>
                    <div className="col xl10 l10 m10 s12">
                        <div class="main admin-container-main animate__animated animate__zoomIn">
                            <div class="container-fluid">
                              <form onSubmit={this.RegisterNewAdmin}>
                                  <h1 className="center-align" style={{margin: '0px'}}><AiOutlineUserAdd className="login-icon" /></h1>
                                  <div className="center-align">
                                      <div className="my-title" style={{marginBottom: '0px'}}>Register new admin</div>
                                  </div>
                                  {/* <h4 style={{margin: '5px'}} className="center-align">Cooperative</h4> */}
                                  <div className="row">
                                      <div className="input-field col s12">
                                          <input
                                              onChange={(e) => {
                                                  this.setState({fname: e.target.value});
                                                  this.setState({error: { element: "", msg: "" }});
                                              }}
                                              value={this.state.fname}
                                              disabled={this.state.loading}
                                              placeholder="First name" type="text" className={`validate browser-default my-input ${this.state.error.element === "fname" ? 'danger-input' : ''}`} />
                                          {this.state.error.element === "fname" ? (
                                              <span className="helper-text danger-color">{this.state.error.msg}</span>
                                          ) : ""}
                                          
                                      </div>
                                      <div className="input-field col s12">
                                          <input
                                              onChange={(e) => {
                                                  this.setState({lname: e.target.value});
                                                  this.setState({error: { element: "", msg: "" }});
                                              }}
                                              value={this.state.lname}
                                              disabled={this.state.loading}
                                              placeholder="Last name" type="text" className={`validate browser-default my-input ${this.state.error.element === "lname" ? 'danger-input' : ''}`} />
                                          {this.state.error.element === "lname" ? (
                                              <span className="helper-text danger-color">{this.state.error.msg}</span>
                                          ) : ""}
                                          
                                      </div>
                                      <div className="input-field col s12">
                                          <input
                                              onChange={(e) => {
                                                  this.setState({username: e.target.value});
                                                  this.setState({error: { element: "", msg: "" }});
                                              }}
                                              value={this.state.username}
                                              disabled={this.state.loading}
                                              placeholder="Username" type="text" className={`validate browser-default my-input ${this.state.error.element === "username" ? 'danger-input' : ''}`} />
                                          {this.state.error.element === "username" ? (
                                              <span className="helper-text danger-color">{this.state.error.msg}</span>
                                          ) : ""}
                                          
                                      </div>
                                      <div className="input-field col s12">
                                          <input
                                              onChange={(e) => {
                                                  this.setState({password: e.target.value});
                                                  this.setState({error: { element: "", msg: "" }});
                                              }}
                                              value={this.state.password}
                                              disabled={this.state.loading}
                                              placeholder="Password" type="password" className={`validate browser-default my-input ${this.state.error.element === "password" ? 'danger-input': ''}`} />
                                          {this.state.error.element === "password" ? (
                                              <span className="helper-text danger-color">{this.state.error.msg}</span>
                                          ) : ""}
                                          
                                      </div> 
                                      <div className="input-field col s12">
                                          <center>
                                              <Alert alert="danger" msg={this.state.error.element === "main" ? (this.state.error.msg) : ''} />
                                              {this.state.loading === true ? (<Loading msg="Please wait" />) : 
                                              (<button type="submit" className="my-btn bg-color hoverable main-btn"><AiOutlineLogin className="icon" /> Register</button>)}
                                          </center>
                                      </div>
                                  </div>
                              </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </Fragment>
        )
    }
}

export default RegisterAdmin;