import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillInfoCircle, AiFillMessage, AiOutlineCheck, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineDelete, AiOutlineDeleteRow, AiOutlineUserAdd } from 'react-icons/ai';
import Loading from '../../shared/Loading/Loading';

class ConfirmConfederation extends Component {
    state = {
        loading: false,
        coopId: "",
        accountCategory: "",
        error: "",
        success: "",
        federations: "",
        step: false,
        federation_id: "",
        confederation_id: "",
    }
    initializeData = () => {
        this.setState({ accountCategory: this.props.auth.userCategory });
        if (this.props.auth.user === null) {
            this.setState({ confederation_id: this.props.auth.data.register_id });
        } else {
            this.setState({ confederation_id: this.props.auth.user.data.register_id });
        }
    }
    loadConfFeds = async () => {
        this.setState({ loading: true });
        let id = "";
        if (this.props.auth.user === null) {
            id = this.props.auth.data.register_id;
        } else {
            id = this.props.auth.user.data.register_id;
        }
        if (id !== "") {
            try {
                const res = await axios.get(`${API_URL}/fedconf/conf/${id}`);
                console.log("My federations: ", res.data.data);
                this.setState({ confederation_id: id });
                this.setState({ federations: res.data.data });
                this.setState({ loading: false });
            } catch (error) {
                this.setState({ loading: false });
                console.log({...error});
            }
        }
    }
    updatefederationstatus = async (federation_conf_id, decision) => {
        if (federation_conf_id !== null || federation_conf_id !== undefined || federation_conf_id !== "") {
            this.setState({ loading: true });
            try {
                const res = await axios.patch(
                    `${API_URL}/fedconf`,
                    {
                        federation_conf_id,
                        decision,
                    },
                    CONFIG
                );
                this.setState({ loading: false });
                if (res.status === 200) {
                    this.loadConfFeds();
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
        if (this.props.auth.userCategory !== "confederation") {
            this.props.history.push("/dashboard");
        }
        this.initializeData();
        this.loadConfFeds();
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
                            <h5><b className="title-txt">List of my federations</b></h5>
                        </div>
                    </div>
                        {this.state.success !== "" ? (<div className="alert-success">{this.state.success}</div>) : ""}
                        {this.state.error !== "" ? (<div className="alert-danger">{this.state.error}</div>) : ""}
                    <hr/>
                    <div>
                        {console.log("New coops:", this.state.federations)}
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Union Name</th>
                                <th>Date joined</th>
                                <th>Date requested</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                                {this.state.federations !== "" ? (
                                    this.state.federations.map((item, i) => {
                                        if (item.coop_id !== null) {
                                            count += 1;
                                            return (
                                            <tr key={i + 1}>
                                                <td>{count}</td>
                                                <td>{item.federation_name}</td>
                                                <td>{item.date_added}</td>
                                                <td>{item.req_date}</td>
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
                                                        <AiFillCheckCircle onClick={() => this.updatefederationstatus(item.federation_conf_id, 1)} className="table-icons-icon-success" />
                                                        <AiFillCloseCircle onClick={() => this.updatefederationstatus(item.federation_conf_id, 2)} className="table-icons-icon-danger" />
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

ConfirmConfederation.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {  })(
    ConfirmConfederation
);
