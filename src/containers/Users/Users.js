import React, { Component } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
import searchData from "../../utils/search";
import { API_URL } from '../../utils/api'
import Loading from '../../shared/Loading/Loading';

export class Users extends Component {
    state = {
        loading: false,
        users: "",
        search: "",
        modal: true,
    }
    loadUsers = async () => {
        this.setState({ loading: true });
        try {
            setAuthToken();
            const res = await axios.get(`${API_URL}/users`);
            this.setState({ users: res.data.data });
            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log("Topic err: ", error);
        }
    }
    componentDidMount = () => {
        this.loadUsers();
    }
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
                                <div className="row" style={{backgroundColor: '#fff'}}>
                                    <center>
                                        <h4 style={{fontSize: '20px', margin: '0px', paddingTop: '36px'}} class="my-title">List of system users</h4>
                                    </center>
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
                                                        <th>Username</th>
                                                        <th></th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.loading === true && (
                                                        <tr>
                                                            <td colSpan={5}>
                                                                <center>
                                                                    <div className="list-item">
                                                                        <center><Loading msg="Please wait" /></center>
                                                                    </div>
                                                                </center>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    {this.state.users === "" ? "" : 
                                                        searchData(this.state.users, this.state.search, { fname: true, lname: true, username: true }).map((item, i) => (
                                                            <tr key={i + 1}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.fname}</td>
                                                                <td>{item.lname}</td>
                                                                <td>{item.username}</td>
                                                                <td></td>
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

export default Users
