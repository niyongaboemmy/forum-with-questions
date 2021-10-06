import React, { Component, Fragment } from 'react'
// Components
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillFileAdd, AiFillInfoCircle, AiFillMessage } from 'react-icons/ai';
import setAuthToken from '../../utils/setAuthToken';
import Modal from '../../shared/Modal/Modal';
class Members extends Component {
    state = {
        loading: "",
        members: "",
        coop_id: "",
        modal: false,
        selected_membership_id: "",
        member_name: "",
        success: "",
        error: "",
        share_value: "",
    }
    addShare = (selected_membership_id, fname, lname) => {
        let member_name = fname + " " + lname;
        this.setState({ selected_membership_id: selected_membership_id });
        this.setState({ member_name: member_name });
    }

    recordShare = async () => {
        if (this.state.share_value === "") {
            return this.setState({ error: "Please fill share" });
        } else {
            let contributed_share = this.state.share_value;
            let membership_id = this.state.selected_membership_id;
            try {
                this.setState({ loading: true });
                const res = await axios.post(
                    `${API_URL}/contrshares`,
                    {
                        membership_id,
                        contributed_share,
                    },
                    CONFIG
                );
                console.log("Success: ", res);
                if (res.status === 200) {
                    this.setState({ share_value: "" });
                    this.setState({ loading: false });
                    this.setState({ success: res.data.msg })
                }
            } catch (error) {
                this.setState({ loading: false });
                console.log("member error: ", {...error});
                if (error.response === undefined) {
                    return this.setState({
                        error: "Network error!"
                    });
                }
        
                if (error.response.status === 401) {
                    return this.setState({
                        error: error.response.data.msg
                    });
                } else {
                    return this.setState({
                        error: error.response.data.msg
                    });
                }
            }
        }
    }

    getMembers = async () => {
        let coop_id = "";
        if (this.props.auth.selectedCoop !== null) {
            this.setState({ coop_id: this.props.auth.selectedCoop });
            coop_id = this.props.auth.selectedCoop;
            if (coop_id !== "") {
                setAuthToken();
                try {
                    const res = await axios.get(`${API_URL}/members/coop/${coop_id}`);
                    this.setState({ members: res.data.data });
                    this.setState({ coop_id: coop_id });
                    console.log("My members", res);
                } catch (error) {
                    console.log({...error});
                }
            }
        }

    }
    componentDidMount = () => {
        if (this.props.auth) {
            this.getMembers();
        }
        console.log("Auth: ", this.props.auth);
    }
    render() {
        let iterate = 0;
        return (
            <Fragment>
                <div className="body-container animate__animated animate__zoomIn">
                    <div className="body-container-page">
                        <div className="row">
                            <div className="col xl2 l2 m2 s12">
                                <div class="fixed-actin-btn">
                                <Link to="/add-member" class="btn-floating btn-large hoverable bg-color">
                                    <i class="large material-icons">add</i>
                                </Link>
                            </div>
                            </div>
                            <div className="col xl10 l19 m10 s12">
                                <div style={{paddingTop: '10px'}}>
                                    <b className="title-txt">List of members</b>
                                    <Link className="my-btn bg-color right" to="/shares">Shares history</Link>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Member Names</th>
                                    <th>Gender</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                                </thead>

                                <tbody>
                                    {this.state.members === "" ? "Not found" : 
                                    this.state.members.map((item) => {
                                        iterate = iterate + 1;
                                        return (
                                            <tr key={iterate}>
                                                <td>{iterate}</td>
                                                <td>{item.fname} {item.lname}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.memberemail}</td>
                                                <td>
                                                    <div className="table-icons">
                                                        <AiFillFileAdd className="table-icons-icon-success" onClick={() => {this.setState({ modal: true }); this.addShare(item.membership_id, item.fname, item.lname)}} />
                                                        <AiFillInfoCircle className="table-icons-icon-info" />
                                                        <AiFillCloseCircle className="table-icons-icon-danger" />
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Member share */}
                {this.state.modal === true && (
                    <Modal
                        close={() => this.setState({modal: false})}
                        backDrop={true}
                        closeBackdrop={false}
                        theme="primary"
                        title={`Member share`}
                        className="open animate-in sm-modal share-modal animate__animated animate__zoomIn"
                        >
                        <center>
                            <div className="row">
                                {this.state.member_name}
                                <br /><br />
                                <div className="row">
                                    <div className="col l12">
                                        {this.state.success !== "" ? (<div className="alert-success">{this.state.success}</div>) : ""}
                                        {this.state.error !== "" ? (<div className="alert-danger">{this.state.error}</div>) : ""}
                                    </div>
                                </div>
                                <input 
                                disabled={this.state.loading}
                                onChange={(e) => {
                                    this.setState({share_value: e.target.value});
                                    this.setState({ error: "" });
                                    this.setState({ success: "" });
                                }}
                                value={this.state.share_value}
                                placeholder="Member share" type="number" min={1} className="browser-default" />
                                <br /><br />
                                <div onClick={() => this.recordShare()} className="my-btn bg-color"><AiFillFileAdd /> Add</div>
                            </div>
                        </center>
                    </Modal>
                )}
            </Fragment>
        )
    }
}
Members.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    Members
);