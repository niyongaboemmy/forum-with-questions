import React, { Component } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
import searchData from "../../utils/search";
import { API_URL } from '../../utils/api'
import Loading from '../../shared/Loading/Loading';
import { Link } from 'react-router-dom'

export class TopicsList extends Component {
    state = {
        loading: false,
        topics: "",
        search: "",
        modal: true,
    }
    loadTopics = async () => {
        this.setState({ loading: true });
        try {
            setAuthToken();
            const res = await axios.get(`${API_URL}/topics`);
            this.setState({ topics: res.data.data });
            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log("Topic err: ", error);
        }
    }
    componentDidMount = () => {
        this.loadTopics();
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
                            <div class="container-fluid">
                                <div className="row" style={{backgroundColor: '#fff'}}>
                                    <center>
                                        <h4 style={{fontSize: '20px', margin: '0px', paddingTop: '36px'}} class="my-title">List of topics</h4>
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
                                                        <th>Names</th>
                                                        <th>Image</th>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Date and Time</th>
                                                        <th></th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.loading === true && (
                                                        <tr>
                                                            <td colSpan={7}>
                                                                <center>
                                                                    <div className="list-item">
                                                                        <center><Loading msg="Please wait" /></center>
                                                                    </div>
                                                                </center>
                                                            </td>
                                                        </tr>
                                                    )}

                                                    {this.state.topics === "" ? "" : 
                                                        searchData(this.state.topics, this.state.search, { fname: true, lname: true, }).map((item, i) => (
                                                            <tr key={i + 1}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.fname} {item.lname}</td>
                                                                <td>{item.image !== undefined ? (<img className="topic-img" style={{maxHeight: '100px'}} src={`${API_URL}/${item.image}`} />) : ""}</td>
                                                                <td>{item.topic_title}</td>
                                                                <td>{item.description}</td>
                                                                <td>{item.hour} {item.day} {item.date} {item.year}</td>
                                                                <td><Link to={`/topic-comments/${item.topic_id}`}><i className="fas fa-list table-tools"></i></Link></td>
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

export default TopicsList
