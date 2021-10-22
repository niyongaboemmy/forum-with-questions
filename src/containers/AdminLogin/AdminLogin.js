import React, { Component, Fragment } from "react";
import axios from "axios";
import { AiOutlineLogin, AiOutlineUser, } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API_URL, CONFIG } from "../../utils/api";
import { TOKEN_NAME } from "../../utils/api";
import { connect } from "react-redux";
import { LoginSuccess, storeAccountCategory, storeUserId } from "../../actions/auth";
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import Navbar from "../../components/Navbar";
import { ACCOUNT_CATEGORY, USER_ID } from "../../actions/types";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from "../../components/Footer";

class AdminLogin extends Component {
    state = {
        loading: false,
        error: { element: "", msg: "" },
        username: "",
        password: "",
        loggedMember: "",
    };

    componentDidMount() {
        if (this.props.isAuthenticated === true) {
            this.props.history.push("/admin");
        }
    }
    LoginUser = async (e) => {
        e.preventDefault();
        
        console.log("Button clicked!");
        this.setState({error: {
            element: "",
            msg: "",
        }});
        try {
            // validation
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

            let email = this.state.username;
            let password = this.state.password;

            const res = await axios.post(
                `${API_URL}/admin/login`,
                {
                    email,
                    password,
                },
                CONFIG
            );
            // Set user details
            localStorage.setItem(TOKEN_NAME, res.data.token);
            this.props.LoginSuccess(res.data, this.props.history);
            console.log("Login res: ", res.data);

            // Set account category
            localStorage.setItem(USER_ID, res.data.data.user_id);
            localStorage.setItem(ACCOUNT_CATEGORY, "admin");
            this.props.storeAccountCategory(localStorage.getItem(ACCOUNT_CATEGORY));
            this.props.storeUserId(localStorage.getItem(USER_ID));
    
            this.setState({loading: true});
    
            if (this.props.isAuthenticated === true) {
                this.props.history.push("/admin");
            }    
            return false;
    
        // errors
        } catch (error) {
            console.log("Login err: ",{...error});
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
            } else if (error.response.status === 500) {
                return this.setState({error: {
                    element: "main",
                    msg: error.response.data.error.msg,
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
                <div>
                    <Navbar />
                    <div className="row">
                        <div className="col xl4 l4 m3 s12"/>
                        <div className="col xl4 l4 m3 s12">
                        <div className="login-container admin-login animate__animated animate__zoomIn">
                            <Link to="/" style={{height: '30px'}}><IoMdArrowRoundBack className="left regist-bars" /> <div style={{width: 'fill-content', paddingTop: '7px', paddingLeft: '48px', color: '#165877', paddingBottom: '6px'}}>Back</div></Link>
                            <form onSubmit={this.LoginUser}>
                                <h1 className="center-align" style={{margin: '0px'}}><AiOutlineUser className="login-icon" /></h1>
                                
                                <div className="center-align">
                                    <div className="my-title" style={{marginBottom: '0px'}}>Administrator</div>
                                </div>
                                {/* <h4 style={{margin: '5px'}} className="center-align">Cooperative</h4> */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input
                                            onChange={(e) => {
                                                this.setState({username: e.target.value});
                                                this.setState({error: { element: "", msg: "" }});
                                            }}
                                            value={this.state.username}
                                            disabled={this.state.loading}
                                            placeholder="Email" type="text" className={`validate browser-default my-input ${this.state.error.element === "username" ? 'danger-input' : ''}`} />
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
                                            (<button type="submit" className="my-btn bg-color hoverable main-btn"><AiOutlineLogin className="icon" /> Login</button>)}
                                        </center>
                                    </div>
                                </div>
                                {/* <center><NavLink to="/register" className="hoverable" style={{cursor: 'pointer', padding: '10px', borderRadius: '3px', color: '#004161'}}>New user ? Register</NavLink></center> */}
                                <br/>
                                <center>
                                    <label>Physics Network Community</label><br/>
                                    <small><label>@2021</label></small>
                                </center>
                            </form>
                        </div>
                        </div>
                        <div className="col xl4 l4 m3 s12"/>
                    </div>
                    <Footer />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});
  
export default connect(mapStateToProps, { LoginSuccess, storeAccountCategory, storeUserId })(AdminLogin);