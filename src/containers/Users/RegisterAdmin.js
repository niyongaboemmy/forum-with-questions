import React, { Component } from 'react'
import AdminNav from '../../components/AdminNav'
import { Link } from 'react-router-dom'
import AdminSideNav from '../../components/AdminSideNav'
import axios from 'axios'
import { API_URL } from '../../utils/api'
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import { AiOutlineLogin } from 'react-icons/ai'

export class RegisterAdmins extends Component {
    state = {
        loading: false,
        modal: true,
        loading: false,
        error: { element: "", msg: "" },
        fname: "",
        lname: "",
        email: "",
        password: "",
        loggedMember: "",
    }

    componentDidMount = () => {
      
    }
    registerAdmin = async (e) => {
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
      
          if (this.state.email.length <= 1) {
              return this.setState({error: {
                  element: "email",
                  msg: "The email must not be less than 1 character",
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
          let email = this.state.email;
          let password = this.state.password;

          await axios.post(
              `${API_URL}/admin`,
              {
                  fname,
                  lname,
                  email,
                  password,
              }
          );
          this.setState({loading: false});
          this.props.history.push("/admins"); 
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
            <div className="admin-container">
                {console.log("users::: ", this.state.users)}
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
                                <div className="row" style={{backgroundColor: '#fff', margin: '0px', paddingTop: '20px'}}>
                                    <div className="col m6 l6 xl6">
                                        <h4 style={{fontSize: '20px', margin: '0px', marginLeft: '10px'}} class="my-title">Register new administrator</h4>
                                    </div>
                                    <div className="col m6 l6 xl6">
                                      <Link to="/users" className="waves-effect waves-light right my-btn hoverable main-btn" style={{marginBottom: '10px'}}>View list</Link>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col s12 m12">
                                        <div class="card" style={{padding: '10px'}}>
                                            <form onSubmit={this.registerAdmin}>
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
                                                              this.setState({email: e.target.value});
                                                              this.setState({error: { element: "", msg: "" }});
                                                          }}
                                                          value={this.state.email}
                                                          disabled={this.state.loading}
                                                          placeholder="email" type="text" className={`validate browser-default my-input ${this.state.error.element === "email" ? 'danger-input' : ''}`} />
                                                      {this.state.error.element === "email" ? (
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
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterAdmins
