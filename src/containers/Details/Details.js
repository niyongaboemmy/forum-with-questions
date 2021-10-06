import React, { Component } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BG_IMAGE from '../../assets/content/img1.png'
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


export class Details extends Component {
    state = {
        loading: false,
        topics: "",
        search: "",
        topic: "",
        user: null,
        tab: 1,
        topic_comment: "",
        files: [],
        error: { element: "", msg: "" },
        img_desc: "",
        success: "",
        comments: "",
        loadingComment: false,
    }

    loadTopics = async () => {
        try {
            this.setState({ loading: true });
            setAuthToken();
            const res = await axios.get(`${API_URL}/topics/today`);
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
    selectTopic = async (id) => {
        this.setState({ loading: true });
        for (let i in this.state.topics) {
            if (this.state.topics[i].topic_id === id) {
                this.setState({ topic: this.state.topics[i] });
                this.loadComments(id);
                break;
            }
        }
        this.setState({ loading: false });
    }

    loadComments = async (topic_id) => {
        this.setState({ loadingComment: true });
        try {
            const res = await axios.get(`${API_URL}/discs/topic/${topic_id}`);
            this.setState({ comments: res.data.data });
            this.setState({ loadingComment: false });
        } catch (error) {
            this.setState({ loadingComment: false });
            console.log("Comm err: ", {...error});
        }
    }

    createPostComment = async (e) => {
        e.preventDefault();

        if (this.state.tab === 1) {
            if ((this.state.topic_comment.length === 0 || this.state.topic_comment === "")) {
                return this.setState({error: {
                    element: "topic_comment",
                    msg: "Please type comment"
                }})
            }
            try {
                this.setState({ loadingComment: true })
                const res = await axios({
                    url: `${API_URL}/discs/text`,
                    method: 'POST',
                    data: {
                        user_id: this.state.user.user_id,
                        comment: this.state.topic_comment,
                        topic_id: this.state.topic.topic_id,
                    },
                });
                if (res.status === 200) {
                    this.setState({ topic_comment: "" })
                    this.loadComments(this.state.topic.topic_id);
                    this.setState({ success: "Topic has been created successfully" });
                }
                console.log("Post res: ", res);
                this.setState({ loadingComment: false });
            } catch (error) {
                this.setState({ loadingComment: false });
                console.log("To err: ", {...error});
            }
        } else {
            // Post text
            if ((this.state.files.length === 0)) {
                return this.setState({error: {
                    element: "image",
                    msg: "Please select image file"
                }})
            }
            if ((this.state.img_desc.length === 0 || this.state.img_desc === "")) {
                return this.setState({error: {
                    element: "img_desc",
                    msg: "Please type image description"
                }})
            }
            // Image upload
            try {
                this.setState({ loadingComment: true });
                const formData = new FormData();
                formData.append("topic_id", this.state.topic.topic_id);
                formData.append("user_id", this.state.user.user_id);
                formData.append("image", this.state.files[0]);
                formData.append("description", this.state.img_desc);

                const result = await axios({
                    url: `${API_URL}/topics/img`,
                    method: 'POST',
                    data: formData,
                    headers: {
                        'Content-Type': "multipart/form-data"
                    }
                });
                if (result.status === 200) {
                    this.loadComments(this.state.topic.topic_id);
                    this.setState({ success: "Topic has been created successfully" });
                }
                this.setState({ loadingComment: false });
                console.log("Post res: ", result);
            } catch (error) {
                this.setState({ loadingComment: false });
                console.log("To err img: ", {...error});
            }
        }
        
    }

    componentDidMount = () => {
        this.loadTopics();
        // alert(this.props.match.params.topic_id);
        if (this.props.auth.userCategory === "user" && this.props.auth.user_id !== null) {
            if (this.props.auth.user !== null) {
                this.setState({ user: this.props.auth.user.data[0] });
            } else {
                this.setState({ user: this.props.auth.data });
            }
        }
    }
    render() {
        return (
            <div>
                <Navbar />
                <section>
                    <div class="container-fluid">
                        <div class="row" style={{marginBottom: '0px'}}>
                            <div class="col xl3 l3 m5 s12 left-col hidden-sm">
                                <br />
                                <h5 class="my-title side-nav-title">All available topics</h5>
                                <input type="text" class="browser-default my-input" placeholder="Search keyword..." />
                                <section class="section left-section">
                                    <center>
                                        {this.state.loading === true && (
                                            <div className="list-item-small">
                                                <Loading msg="Please wait" />
                                            </div>
                                        )}
                                    </center>
                                    {this.state.topics === "" ? "" : 
                                        searchData(this.state.topics, this.state.search, { topic_id: true }).map((item, i) => (
                                            <div onClick={() => this.selectTopic(item.topic_id)} style={{cursor: 'pointer'}} key={i + 1} to="">
                                                <div className="list-item-small  animate__animated animate__zoomIn">
                                                    <div className="row">
                                                        <div className="col xl2 l2 m2 s3">
                                                            <div className="user-list-icon-small">
                                                                <i className="fas fa-user-circle"></i>
                                                            </div>
                                                        </div>
                                                        <div className="col xl10 l10 m10 s9">
                                                            <div className="list-title-small">{item.topic_title !== undefined ? item.topic_title : ""}</div>
                                                            <div>{item.image !== undefined ? (<img className="topic-img" src={`${API_URL}/${item.image}`} />) : ""}</div>
                                                            <div className="list-details-small">{item.description !== undefined ? item.description : ""}</div>
                                                            <div className="row" style={{marginBottom: "0px"}}>
                                                                <div className="col xl6 l6 m6 s6" style={{marginTop: "5px"}}>
                                                                    <span className="editor-title-small"><i className="fas fa-edit"></i></span>
                                                                    <span className="editor-name-small">{item.lname}</span>
                                                                </div>
                                                                <div className="col xl6 l6 m6 s6">
                                                                    <div className="time-cont"><i className="fas fa-calendar"></i> {item.hour} {item.month} {item.date} {item.year}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </section>
                            </div>
                            <div class="col xl9 l9 m12 s12">
                                <div class="list-item right-col animate__animated animate__zoomIn">
                                    <div class="row" style={{marginLeft: 'auto', marginRight: 'auto'}}>
                                        <div class="col xl2 l2 m2 s12">
                                            <div class="user-list-icon">
                                                <Link to="/topics">
                                                    <i className="fas fa-arrow-alt-circle-left left hidden-lg" style={{marginRight: '-65px'}}></i>
                                                </Link>
                                                <i class="fas fa-user-circle"></i>
                                            </div>
                                            <div class="row hidden-sm" style={{marginBottom: "0px"}}>
                                                <div class="col xl12 l12" style={{marginTop: "5px"}}>
                                                    <span class="editor-title"><i class="fas fa-edit"></i></span>
                                                    <span class="editor-name">{this.state.topic !== "" ? this.state.topic.fname + " " + this.state.topic.lname : ""}</span>
                                                </div>
                                                <div class="col xl12 l12">
                                                    <br />
                                                    <div class="time-cont"><i className="fas fa-calendar"></i> {this.state.topic !== "" ? `${this.state.topic.hour} ${this.state.topic.date} ${this.state.topic.year}` : ""}</div>
                                                </div>
                                                <div class="col xl12 l12">
                                                    <br />
                                                    <div class="time-cont"><i className="fas fa-comment"></i> {this.state.topic !== "" ? `${this.state.topic.totalComments}` : ""}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col xl10 l10 m10 s12">
                                            {this.state.loading === true ? (
                                                <div style={{marginTop: '30px'}} className="list-item-small animate__animated animate__zoomIn center">
                                                    <Loading msg="Please wait" />
                                                </div>
                                            ) : (<>
                                            

                                            <div class="list-title center">{this.state.topic !== "" ? this.state.topic.topic_title : ""}</div>
                                            <div class="list-title center">{this.state.topic.image !== undefined ? <img className="topic-img" src={`${API_URL}/${this.state.topic.image}`} /> : ""}</div>
                                            <div class="list-details-selected"><center>{this.state.topic !== "" ? this.state.topic.description !== undefined ? this.state.topic.description : "" : ""}</center></div>
                                            
                                            <hr style={{marginBottom: '0px'}} />
                                            <div class="row hidden-lg" style={{marginBottom: "0px", boxShadow: '0px 11px 8px -10px #797979' ,paddingBottom: '20px'}}>
                                                <div class="col xl4 l4 m4 s4" style={{marginTop: "5px"}}>
                                                    <span class="editor-title"><i class="fas fa-edit"></i></span>
                                                    <span class="editor-name">{this.state.topic !== "" ? this.state.topic.fname + " " + this.state.topic.lname : ""}</span>
                                                </div>
                                                <div class="col xl4 l4 m4 s4">
                                                    <div class="time-cont"><i className="fas fa-calendar"></i> {this.state.topic !== "" ? `${this.state.topic.hour} ${this.state.topic.date} ${this.state.topic.year}` : ""}</div>
                                                </div>
                                                <div class="col xl4 l4 m4 s4">
                                                    <div class="time-cont"><i className="fas fa-calendar"></i> {this.state.topic !== "" ? `${this.state.topic.hour}` : ""}</div>
                                                </div>
                                            </div>
                                            <br />
                                            <div class="row chat-div">
                                                <center>
                                                    {this.state.loadingComment === true && (
                                                        <div className="list-item-small animate__animated animate__zoomIn">
                                                            <Loading msg="Please wait" />
                                                        </div>
                                                    )}
                                                </center>
                                                {this.state.comments === "" || this.state.loadingComment === true ? "" : 
                                                this.state.comments.map((item, i) => (
                                                    <div className="col xl12 l12 s12">
                                                        <div className="list-item-small animate__animated animate__bounceIn">
                                                            <div className="row">
                                                                <div className="col xl2 l2 m2 s3">
                                                                    <div className="user-list-icon-small">
                                                                        <i className="fas fa-user-circle"></i>
                                                                    </div>
                                                                </div>
                                                                <div className="col xl10 l10 m10 s9">
                                                                    <div className="list-title-small">{item.comment !== undefined ? item.comment : ""}</div>
                                                                    <div>{item.image !== undefined ? <img className="topic-img" src={`${API_URL}/${item.image}`} /> : ""}</div>
                                                                    <div className="list-details-small">{item.description !== undefined ? item.description : ""}</div>
                                                                    <div className="row" style={{marginBottom: "0px"}}>
                                                                        <div className="col xl6 l6 m6 s6" style={{marginTop: "5px"}}>
                                                                            <span className="editor-title-small"><i className="fas fa-edit"></i></span>
                                                                            <span className="editor-name-small">{item.fname} {item.lname}</span>
                                                                        </div>
                                                                        <div className="col xl6 l6 m6 s6">
                                                                            <div className="time-cont"><i className="fas fa-calendar"></i> {item.hour} {item.monty} {item.date} {item.year}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                
                                            </div>
                                            </>)}
                                        </div>
                                    </div>
                                </div>
                                <div class="submit-comment">
                                    <form onSubmit={this.createPostComment}>
                                        <div class="row">
                                            <div class="col l4 m4 s2">
                                                <div class="user-list-icon-small">
                                                    <i class="fas fa-user-circle"></i>
                                                    <div className="hidden-sm">
                                                        {this.state.user !== null ? this.state.user.fname : ""} {this.state.user !== null ? this.state.user.lname : ""}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col l4 m4 s7">
                                            <input 
                                                type="text"
                                                onChange={(e) => {
                                                    this.setState({ topic_comment: e.target.value });
                                                    this.setState({ error: { element: "", msg: "" } });
                                                    this.setState({ success: "" });
                                                }}
                                                style={{padding: '10px', color: 'black', backgroundColor: '#fff'}} placeholder="Comment" cols="30" rows="40" 
                                                className={`browser-default comment-input ${this.state.error.element === "topic_comment" ? 'danger-input': ''}`} 
                                                value={this.state.topic_comment !== "" ? this.state.topic_comment : ""}
                                                />
                                                {this.state.error.element === "topic_comment" ? (
                                                    <span className="helper-text danger-color"></span>
                                                ) : ""}
                                            </div>
                                            <div class="col l4 m4 s3">
                                                <button style={{maxWidth: '100%'}} class="btn-small waves-effect outline-btn nav-outline-btn submit-comment-btn" type="submit"><i class="fas fa-edit"></i> <span className="hidden-sm">Comment</span></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

Details.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    toogleNav: state.toogleNav,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser, toogleNav })(
    Details
);