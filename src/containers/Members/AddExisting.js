import React, { Component } from 'react'
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { Link } from 'react-router-dom';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillFileAdd, AiFillMessage, AiOutlineUserAdd } from 'react-icons/ai';
import setAuthToken from '../../utils/setAuthToken';
import searchData from "../../utils/search";
import Loading from '../../shared/Loading/Loading';

export class AddExisting extends Component {
    state = {
        loading: false,
        allMembers: "",
        coopId: "",
        search: "",
        error: "",
        success: "",
    }
    loadAllMembers = async () => {
        try {
            this.setState({ loading: true });
            const res = await axios.get(`${API_URL}/members`);
            if (res.status === 200) {
                this.setState({ allMembers: res.data.data })
                console.log("All members: ", res.data.data);
            }
            this.setState({ loading: false });
        } catch (error) {
            this.setState({ loading: false });
            console.log({...error})
        }
    }

    AddExistingMember = async (member_id) => {
        try {
            this.setState({loading: true});

            let coop_id = this.state.coopId;

            const res = await axios.post(
                `${API_URL}/membership`,
                {
                    member_id,
                    coop_id,
                },
                CONFIG
            );
            if (res.status === 200) {
                this.setState({ success: res.data.msg });
                console.log("success: ", res);
                this.props.history.push("/members");
            }
        // errors
        } catch (error) {
            this.setState({loading: false});
            console.log("error: ", {...error});
            if (error.response === undefined) {
                return this.setState({error: "Network error!"});
            }
        
            if (error.response.status === 401) {
                return this.setState({error: error.response.data.msg});
            } 
            else if (error.response.status === 404) {
                return this.setState({error: error.response.data.msg});
            } 
            else {
                return this.setState({error: error.response.data.msg});
            }
        }
    }

    componentDidMount = () => {
        if (this.props.auth.selectedCoop !== undefined) {
            this.setState({coopId: this.props.auth.selectedCoop});
        }
        this.loadAllMembers();
    }
    render() {
        return (
            <div className="body-container animate__animated animate__zoomIn">
                {console.log('COO: ', this.state.coopId)}
                <div className="body-container-page">
                    <div className="row">
                        <div className="col xl2 l2 m2 s12">
                            <div class="fixed-actin-btn">
                                <Link to="/members" class="btn-floating btn-large hoverable bg-color">
                                    <i class="large material-icons">list</i>
                                </Link>
                            </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <input 
                            onKeyUp={(e)=>{
                                this.setState({ search: e.target.value });
                            }}
                            type="search" placeholder="Search member by typing keyword to join" />
                            {this.state.success !== "" ? (<div className="alert-success">{this.state.success}</div>) : ""}
                            {this.state.error !== "" ? (<div className="alert-danger">{this.state.error}</div>) : ""}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col l12">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First name</th>
                                        <th>Last name</th>
                                        <th>Gender</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.allMembers === "" || this.state.search === "" ? "" : 
                                     searchData(this.state.allMembers, this.state.search, { fname: true, lname: true, memberemail: true }).map((item, i) => (
                                         <tr>
                                            <td>{i + 1}</td>
                                            <td>{item.fname}</td>
                                            <td>{item.lname}</td>
                                            <td>{item.gender}</td>
                                            <td>{item.memberemail}</td>
                                            <td>
                                                <div className="table-icons">
                                                    <AiFillMessage className="table-icons-icon-info" />
                                                    <AiOutlineUserAdd onClick={() => this.AddExistingMember(item.member_id)} className="table-icons-icon-success" />
                                                </div>
                                            </td>
                                         </tr>
                                     ))
                                    }
                                </tbody>
                            </table>
                            <center>
                                <br/>
                                {this.state.loading === true ? <Loading msg="Please wait" /> : ""}
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddExisting.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    AddExisting
);