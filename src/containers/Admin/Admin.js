import React, { Component } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../utils/api'
import { GoCommentDiscussion } from 'react-icons/go'
import { IoMdTime } from 'react-icons/io'
import { ImUsers } from 'react-icons/im'
import { RiAdminLine } from 'react-icons/ri'

export class Admin extends Component {
    state = {
        modal: true,
        loading: false,
        summary: null,
    }
    loadDetails = async () => {
        this.setState({ loading: true });
        try {
            const res = await axios.get(`${API_URL}/summary`);
            this.setState({ summary: res.data })
            console.log("Summary: ", res.data);
        } catch (error) {
            console.log("Er: ", {...error});
        }
        this.setState({ loading: false });
    }
    componentDidMount = () => {
        this.loadDetails();
    }
    render() {
        return (
            <div className="admin-container">
                {/* Nav Bar here */}
                <AdminNav />
                <div className="row">
                    <div className="col xl2 l2 m3 s12">
                        {/* Side Nav here */}
                        <AdminSideNav />
                    </div>
                    <div className="col xl10 l10 m10 s12">
                        <div className="main admin-container-main animate__animated animate__zoomIn">
                            <div className="container-fluid admin-bg">
                                <div className="row">
                                    <div className="col s12 m4">
                                        <div className="card dashboard-card blue white-text">
                                            <div className="card-content valign-wrapper">
                                                <div className="card-text">
                                                    <h6 className="dashboard-count">{this.state.loading === true ? "Loading..." : this.state.summary !== null && this.state.summary.totalTodayTopics}</h6>
                                                    <p>Today topics</p>
                                                </div>
                                                <div className="card-icon"><IoMdTime className="dashboard-icon" /></div>
                                            </div>
                                            <div className="card-action"><Link to="/topics-list">View report</Link></div>
                                        </div>
                                    </div>
                                    <div className="col s12 m4">
                                        <div className="card dashboard-card blue white-text">
                                            <div className="card-content valign-wrapper">
                                                <div className="card-text">
                                                    <h6 className="dashboard-count">{this.state.loading === true ? "Loading..." : this.state.summary !== null && this.state.summary.totalUsers}</h6>
                                                    <p>System Users</p>
                                                </div>
                                                <div className="card-icon"><ImUsers className="dashboard-icon" /></div>
                                            </div>
                                            <div className="card-action"><Link to="/users">View report</Link></div>
                                        </div>
                                    </div>
                                    <div className="col s12 m4">
                                        <div className="card dashboard-card blue white-text">
                                            <div className="card-content valign-wrapper">
                                                <div className="card-text">
                                                    <h6 className="dashboard-count">{this.state.loading === true ? "Loading..." : this.state.summary !== null && this.state.summary.totalAdmins}</h6>
                                                    <p>Total admins</p>
                                                </div>
                                                <div className="card-icon"><RiAdminLine className="dashboard-icon" /></div>
                                            </div>
                                            <div className="card-action"><Link to="/topics-list">View report</Link></div>
                                        </div>
                                    </div>
                                    <div className="col s12 m4">
                                        <div className="card dashboard-card blue white-text">
                                            <div className="card-content valign-wrapper">
                                                <div className="card-text">
                                                    <h6 className="dashboard-count">{this.state.loading === true ? "Loading..." : this.state.summary !== null && this.state.summary.totalTopics}</h6>
                                                    <p>All topics</p>
                                                </div>
                                                <div className="card-icon"><GoCommentDiscussion className="dashboard-icon" /></div>
                                            </div>
                                            <div className="card-action"><Link to="/topics-list">View report</Link></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col s12 m8">
                                        <div className="card">
                                            <table className="bordered highlight">
                                                <thead>
                                                <tr>
                                                    <th colspan="2">TODO List</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>Upgrade to SSD harddisks</td>
                                                </tr>
                                                <tr>
                                                    <td>Pay server invoice</td>
                                                </tr>
                                                <tr>
                                                    <td>Upgrade to SSD harddisks</td>
                                                </tr>
                                                <tr>
                                                    <td>Pay server invoice</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin
