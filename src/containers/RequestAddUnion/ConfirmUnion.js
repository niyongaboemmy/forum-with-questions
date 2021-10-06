import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiFillMessage, AiOutlineCheck, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineDelete, AiOutlineDeleteRow, AiOutlineUserAdd } from 'react-icons/ai';
import Loading from '../../shared/Loading/Loading';

class ConfirmUnion extends Component {
    state = {
        loading: false,
        coopId: "",
        accountCategory: "",
        unions: "",
        error: "",
        success: "",
        cooperatives: "",
        step: false,
        union_id: "",
    }
    initializeData = () => {
        this.setState({ accountCategory: this.props.auth.userCategory });
        if (this.props.auth.user === null) {
            this.setState({ union_id: this.props.auth.data.register_id });
        } else {
            this.setState({ union_id: this.props.auth.user.data.register_id });
        }
    }
    loadUnionCooperatives = async () => {
        this.setState({ loading: true });
        let id = "";
        if (this.props.auth.user === null) {
            id = this.props.auth.data.register_id;
        } else {
            id = this.props.auth.user.data.register_id;
        }
        if (id !== "") {
            try {
                const res = await axios.get(`${API_URL}/coopunion/union/${id}`);
                console.log("My coops: ", res.data.data);
                this.setState({ union_id: id });
                this.setState({ cooperatives: res.data.data });
                this.setState({ loading: false });
            } catch (error) {
                this.setState({ loading: false });
                console.log({...error});
            }
        }
    }
    updateCooperativeStatus = async (coop_union_id, decision) => {
        if (coop_union_id !== null || coop_union_id !== undefined || coop_union_id !== "") {
            this.setState({ loading: true });
            try {
                const res = await axios.patch(
                    `${API_URL}/coopunion`,
                    {
                        coop_union_id,
                        decision,
                    },
                    CONFIG
                );
                this.setState({ loading: false });
                if (res.status === 200) {
                    this.loadUnionCooperatives();
                    return this.setState({ success: res.data.msg });
                }
                
            } catch (error) {
                this.setState({ loading: false });
                console.log("Err: ", {...error});
                if (error.response === undefined) {
                    return this.setState({error: "Network error!"});
                }
            
                if (error.response.status === 401) {
                    return this.setState({ error: error.response.data.msg });
                } else {
                    return this.setState({ error: error.response.data.msg });
                }
            }
        }
    }

    componentDidMount = () => {
        if (this.props.auth.userCategory !== "union") {
            this.props.history.push("/dashboard");
        }
        this.initializeData();
        this.loadUnionCooperatives();
    }
    render() {
        let count = 0;
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                
                {
                    this.state.loading === true ? (
                        <div style={{marginTop: '14%', marginBottom: '14%'}}>
                            <center>
                                <Loading msg="Please wait" />
                            </center>
                        </div>
                    ) : (<div>
                    <div className="row">
                        <div className="col xl2 l2 m2 s12">
                            <div class="fixed-actin-btn">
                            <div class="btn-floating btn-large hoverable bg-color">
                                <i class="large material-icons">list</i>
                            </div>
                        </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <h5><b className="title-txt">List of my cooperatives</b></h5>
                        </div>
                    </div>
                        {this.state.success !== "" ? (<div className="alert-success">{this.state.success}</div>) : ""}
                        {this.state.error !== "" ? (<div className="alert-danger">{this.state.error}</div>) : ""}
                    <hr/>
                    <div>
                        {console.log("New coops:", this.state.cooperatives)}
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Cooperative Name</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Status</th>
                                <th>Date joined</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                                {this.state.cooperatives !== "" ? (
                                    this.state.cooperatives.map((item, i) => {
                                        if (item.coop_id !== null) {
                                            count += 1;
                                            return (
                                            <tr key={i + 1}>
                                                <td>{count}</td>
                                                <td>{item.cooperative_name}</td>
                                                <td>{item.cooperative_email}</td>
                                                <td>{item.phone_number}</td>
                                                <td>{item.date_added}</td>
                                                <td>
                                                    {
                                                        item.decision === 0 ?
                                                        (<div className="status status-warning"><AiFillInfoCircle /> Pending</div>) : 
                                                        item.decision === 1 ?
                                                        (<div className="status status-success"><AiFillCheckCircle /> Confirmed</div>) :
                                                        (<div className="status status-danger"><AiFillCloseCircle /> Canceled</div>)
                                                    }
                                                    
                                                </td>
                                                <td>
                                                    <div className="table-icons">
                                                        <AiFillMessage className="table-icons-icon-info" />
                                                        <AiFillCheckCircle onClick={() => this.updateCooperativeStatus(item.coop_union_id, 1)} className="table-icons-icon-success" />
                                                        <AiFillCloseCircle onClick={() => this.updateCooperativeStatus(item.coop_union_id, 2)} className="table-icons-icon-danger" />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}})
                                ) : ""}
                            </tbody>
                        </table>
                    </div>
                    </div>)
                }
                </div>
            </div>
        )
    }
}

ConfirmUnion.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {  })(
    ConfirmUnion
);