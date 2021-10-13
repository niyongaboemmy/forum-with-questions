import React, { Component } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import { Link } from 'react-router-dom'

export class Admin extends Component {
    state = {
        modal: true,
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
                        <div class="main admin-container-main animate__animated animate__zoomIn">
                            <div class="container-fluid admin-bg">
                                <div class="row">
                                    <div class="col s12 m4">
                                        <div class="card blue white-text">
                                            <div class="card-content valign-wrapper">
                                                <div class="card-text">
                                                    <h6>25,000</h6>
                                                    <p>Today topics</p>
                                                </div>
                                                <div class="card-icon"><i class="material-icons medium valign">pie_chart</i></div>
                                            </div>
                                            <div class="card-action"><Link to="/topics-list">View report</Link></div>
                                        </div>
                                    </div>
                                    <div class="col s12 m4">
                                        <div class="card blue white-text">
                                            <div class="card-content valign-wrapper">
                                                <div class="card-text">
                                                    <h6>156</h6>
                                                    <p>System Users</p>
                                                </div>
                                                <div class="card-icon"><i class="material-icons medium valign">check_circle</i></div>
                                            </div>
                                            <div class="card-action"><Link to="/users">View report</Link></div>
                                        </div>
                                    </div>
                                    <div class="col s12 m4">
                                        <div class="card blue white-text">
                                            <div class="card-content valign-wrapper">
                                                <div class="card-text">
                                                    <h6>50</h6>
                                                    <p>Today comments</p>
                                                </div>
                                                <div class="card-icon"><i class="material-icons medium valign">build</i></div>
                                            </div>
                                            <div class="card-action"><Link to="/topics-list">View report</Link></div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="row">
                                    <div class="col s12 m8">
                                        <div class="card">
                                            <table class="bordered highlight">
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
