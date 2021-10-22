import React, { Component } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
import searchData from "../../utils/search";
import { API_URL } from '../../utils/api'
import Loading from '../../shared/Loading/Loading';
import { Link } from 'react-router-dom'
import { MdDeleteForever } from 'react-icons/md'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LogoutTheUser, toogleNav } from "../../actions/auth";

export class Admins extends Component {
    state = {
        loading: false,
        users: "",
        search: "",
        modal: true,
    }
    loadAdmins = async () => {
        this.setState({ loading: true });
        try {
            setAuthToken();
            const res = await axios.get(`${API_URL}/admin`);
            console.log("Admins: ", res.data)
            this.setState({ users: res.data });
            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log("Topic err: ", error);
        }
    }
    removeAdmin = async (admin_id) => {
      this.setState({ loading: true });
      try {
          setAuthToken();
          const res = await axios.delete(`${API_URL}/admin/disactive/${admin_id}`);
          this.loadAdmins();
      } catch (error) {
          this.setState({ loading: false });
          console.log("remove err: ", error);
      }
  }
    componentDidMount = () => {
        this.loadAdmins();
    }
    render() {
      const user = this.props.auth.userCategory === "admin" ? this.props.auth.user !== null ? this.props.auth.user : this.props.auth.data : null;
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
                                        <h4 style={{fontSize: '20px', margin: '0px', marginLeft: '10px'}} class="my-title">List of system administrators</h4>
                                    </div>
                                    <div className="col m6 l6 xl6">
                                      <Link to="/register-admin" className="waves-effect waves-light right my-btn hoverable main-btn">Add new</Link>
                                    </div>
                                    <div className="col xl2 l2 m2 s12" />
                                    <div class="input-field col xl8 l8 m8 s12 search-topic-container" style={{margin: "0px"}}>
                                        <i class="fas fa-search prefix" style={{top: '26px'}}></i>
                                        <input value={this.state.search}  onChange={(e) => { this.setState({ search: e.target.value }) }} placeholder="Search topic" id="home-search" type="text" class="home-search-input autocomplete search-topics" />
                                    </div>
                                    <div className="col xl2 l2 m2 s12" />
                                </div>
                                <div class="row">
                                    <div class="col s12 m12">
                                        <div class="card">
                                            <table class="bordered highlight responsive-table">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>First name</th>
                                                        <th>Last name</th>
                                                        <th>Email</th>
                                                        <th>Account type</th>
                                                        <th></th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.loading === true && (
                                                        <tr>
                                                            <td colSpan={6}>
                                                                <center>
                                                                    <div className="list-item">
                                                                        <center><Loading msg="Please wait" /></center>
                                                                    </div>
                                                                </center>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    {this.state.users === "" ? "" : 
                                                        this.state.loading === false && searchData(this.state.users, this.state.search, { fname: true, lname: true, username: true }).map((item, i) => (
                                                            <tr style={item.category === 1 ? {fontWeight: 'bold', color: '#004ddb'} : {}} key={i + 1}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.fname}</td>
                                                                <td>{item.lname}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.category === 1 ? "Super Admin" : "Standard Admin"}</td>
                                                                <td>{user !== null && user.category === 1 && <MdDeleteForever className="remove-icon right" onClick={() => this.removeAdmin(item.admin_id)} />}</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
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

Admins.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  toogleNav: state.toogleNav,
  userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser, toogleNav })(
  Admins
);