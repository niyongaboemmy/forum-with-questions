import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillFileAdd, AiFillInfoCircle } from 'react-icons/ai';
import Loading from '../../shared/Loading/Loading';

class RequestAddFederation extends Component {
    state = {
        loading: false,
        accountCategory: "",
        federations: "",
        error: "",
        success: "",
        my_federation: "",
        step: false,
        federationList: "",
        union_id: "",
    }
    initializeData = () => {
        this.setState({ accountCategory: this.props.auth.userCategory })
    }
    loadFederations = async () => {
        try {
            const res = await axios.get(`${API_URL}/federations`);
            console.log("federations: ", res.data.data);
            this.setState({ federations: res.data.data });
            this.setState({ federationList: res.data.data });
        } catch (error) {
            console.log({...error});
        }
    }
    loadMyFederations = async () => {
        let id = "";
        if (this.props.auth.user === null) {
            id = this.props.auth.data.register_id;
        } else {
            id = this.props.auth.user.data.register_id;
        }
        if (id !== "") {
            this.setState({ union_id: id });
            try {
                const res = await axios.get(`${API_URL}/unionfed/union/${id}`);
                console.log("My feds: ", res.data.data);
                this.setState({ my_federation: res.data.data });
                this.setState({ federationList: this.state.my_federation });
            } catch (error) {
                this.setState({ federationList: this.state.federations });
                console.log("Fed err: ", {...error});
            }
        }
    }
    joinFederation = async (union_id, federation_id) => {
        this.setState({ loading: true });
        try {
            const res = await axios.post(
                `${API_URL}/unionfed`,
                {
                    union_id,
                    federation_id,
                },
                CONFIG
            );
            this.setState({ loading: false });
            if (res.status === 200) {
                this.loadFederations();
                this.loadMyFederations();
                this.setState({ success: res.data.msg });
                this.setState({ step: false });
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

    setFederationList = () => {
        this.setState({ step: !this.state.step });
        if (this.state.step === false) {
            this.setState({ federationList: this.state.federations });
        } else {
            this.setState({ federationList: this.state.my_federation });
        }
        console.log("un: ", this.state.union_id);
    }

    componentDidMount = () => {
        if (this.props.auth.userCategory !== "union") {
            this.props.history.push("/dashboard");
        }
        this.initializeData();
        this.loadFederations();
        this.loadMyFederations();
    }
    render() {
        let count1 = 0;
        let count2 = 0;
        return (
            <div className="body-container animate__animated animate__zoomIn">
                {console.log("Next data: ", this.props.auth)}
                {console.log("List data: ", this.state.federationList)}

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
                            <div className="fixed-actin-btn">
                            <div onClick={() => this.setFederationList(this.state.step)} className="btn-floating btn-large hoverable bg-color">
                                <i className="large material-icons">{this.state.step === true ? "list" : "add"}</i>
                            </div>
                        </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <h5><b className="title-txt">{this.state.step === true ? "List of federations | Select new federation" : "List of my federations"}</b></h5>
                        </div>
                    </div>
                        {this.state.success !== "" ? (<div className="alert-success">{this.state.success}</div>) : ""}
                        {this.state.error !== "" ? (<div className="alert-danger">{this.state.error}</div>) : ""}
                    <hr/>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Federation Name</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                                {this.state.my_federation === "" && this.state.federationList !== "" && this.state.step === true ? 
                                this.state.federationList.map((item, i) => {
                                    if (item.federation_id !== null) {
                                        count1 += 1;
                                        return (
                                        <tr key={i + 1}>
                                            <td>{count1}</td>
                                            <td>{item.federation_name}</td>
                                            <td>
                                                {(this.state.step === true ? (<div onClick={() => this.joinFederation(this.state.union_id, item.federation_id)} className="table-icons my-tb-icon"><AiFillFileAdd className="table-icons-icon-success" /> <lable style={{fontSize: '15px', position: 'relative', top: '9px'}}>Join request</lable></div>) : <div className="alert-info">Pending</div>)}
                                            </td>
                                        </tr>
                                    )} else { return "" }
                                }) : 
                                this.state.federationList !== "" ? (
                                    this.state.my_federation !== "" ?
                                    this.state.federationList.map((item, i) => {
                                        if (item.federation_id !== null) {
                                            count2 += 1;
                                            let check_union = this.state.my_federation.find(itm => itm.federation_id === item.federation_id);
                                            return (
                                            <tr key={i + 1}>
                                                <td>{count2}</td>
                                                <td>{item.federation_name}</td>
                                                <td>
                                                    {check_union === undefined ? 
                                                    (this.state.step === true ? 
                                                        (<div onClick={() => this.joinFederation(this.state.union_id, item.federation_id)} className="table-icons my-tb-icon"><AiFillFileAdd className="table-icons-icon-success" /> <lable style={{fontSize: '15px', position: 'relative', top: '9px'}}>Join request</lable></div>) : "") : 
                                                        check_union.federation_id === item.federation_id ? 
                                                        item.decision === undefined ? "Already member" : 
                                                        item.decision === 0 ?
                                                        (<div className="status status-warning"><AiFillInfoCircle /> Pending</div>) : 
                                                        item.decision === 1 ?
                                                        (<div className="status status-success"><AiFillCheckCircle /> Confirmed</div>) :
                                                        (<div className="status status-danger"><AiFillCloseCircle /> Canceled</div>)
                                                        : 
                                                        ""
                                                    }
                                                </td>
                                            </tr>
                                        )} else { return "" }}) : ""
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

RequestAddFederation.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {  })(
    RequestAddFederation
);