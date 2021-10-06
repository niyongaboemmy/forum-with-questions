import React, { Component } from 'react'
import setAuthToken from '../../utils/setAuthToken'
import axios from 'axios'
import { API_URL } from '../../utils/api'
import searchData from "../../utils/search"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from "prop-types"
import { LogoutTheUser, toogleNav } from "../../actions/auth"
import SubNav from '../../components/SubNav'
import Loading from '../../shared/Loading/Loading'
import AdminSideNav from '../../components/AdminSideNav'
import AdminNav from '../../components/AdminNav'


export class TopicComments extends Component {
    state = {
        loading: false,
        comments: "",
        topic: "",
    }

    loadComments = async (topic_id) => {
        this.setState({ loading: true });
        try {
            const res = await axios.get(`${API_URL}/discs/topic/${topic_id}`);
            this.setState({ comments: res.data.data });
            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log("Comm err: ", {...error});
        }
    }

    loadTopicDetails = async () => {
        try {
            this.setState({ loading: true });
            setAuthToken();
            const res = await axios.get(`${API_URL}/topics`);
            this.setState({ topics: res.data.data });
            if (this.state.topic === "" && this.props.match.params.topic_id !== undefined) {
                for (let i in res.data.data) {
                    if (res.data.data[i].topic_id === this.props.match.params.topic_id) {
                        this.setState({ topic: res.data.data[i] });
                        this.loadComments(res.data.data[i].topic_id);
                        console.log("Slect: ", res.data.data[i]);
                        break;
                    }
                }
            }
            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log("Topic err: ", error);
        }
    }

    componentDidMount = () => {
        if (this.props.match.params.topic_id !== null && this.props.match.params.topic_id !== undefined) {
            this.loadTopicDetails();
            this.loadComments(this.props.match.params.topic_id);
        } else {
            alert("Please select topic");
        }
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
                                <div className="row" style={{marginTop: '20px'}}>
                                    {   this.state.loading === true ? (
                                        <div style={{marginTop: '30px'}} className="list-item-small animate__animated animate__zoomIn center">
                                            <Loading msg="Please wait" />
                                        </div>
                                    ) : (<>
                                    <div class="list-title center">{this.state.topic !== "" ? this.state.topic.topic_title : ""}</div>
                                    <div class="list-title center">{this.state.topic.image !== undefined ? <img className="topic-img" src={`${API_URL}/${this.state.topic.image}`} /> : ""}</div>
                                    <div class="list-details-selected"><center>{this.state.topic !== "" ? this.state.topic.description !== undefined ? this.state.topic.description : "" : ""}</center></div>
                                    
                                    <hr style={{marginBottom: '0px'}} />
                                    <div class="row hidden-lg" style={{marginBottom: "0px", boxShadow: '0px 11px 8px -10px #797979' ,paddingBottom: '20px'}}>
                                        <div class="col xl6 l6 m6 s6" style={{marginTop: "5px"}}>
                                            <span class="editor-title"><i class="fas fa-edit"></i></span>
                                            <span class="editor-name">{this.state.topic !== "" ? this.state.topic.fname + " " + this.state.topic.lname : ""}</span>
                                        </div>
                                        <div class="col xl6 l6 m6 s6">
                                            <div class="time-cont"><i className="fas fa-calendar"></i> {this.state.topic !== "" ? `${this.state.topic.hour} ${this.state.topic.date} ${this.state.topic.year}` : ""}</div>
                                        </div>
                                    </div>
                                    </>)}
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
                                                        <th>Comment</th>
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

                                                    {this.state.comments === "" || this.state.loading === true ? "" : 
                                                        this.state.comments.map((item, i) => (
                                                            <tr key={i + 1}>
                                                                <td>{i + 1}</td>
                                                                <td>{item.fname} {item.lname}</td>
                                                                <td>{item.image !== undefined ? (<img className="topic-img" style={{maxHeight: '100px'}} src={`${API_URL}/${item.image}`} />) : ""}</td>
                                                                <td>{item.comment}</td>
                                                                <td>{item.description}</td>
                                                                <td>{item.hour} {item.day} {item.date} {item.year}</td>
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

export default TopicComments
