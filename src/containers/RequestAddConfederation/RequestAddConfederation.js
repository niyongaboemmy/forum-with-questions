import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillFileAdd, AiFillInfoCircle } from 'react-icons/ai';
import Loading from '../../shared/Loading/Loading';

class RegisterAddConfederation extends Component {
    state = {
        loading: false,
        accountCategory: "",
        federations: "",
        error: "",
        success: "",
        my_confederation: "",
        step: false,
        confederationList: "",
        federation_id: "",
    }
    initializeData = () => {
        this.setState({ accountCategory: this.props.auth.userCategory })
    }
    loadConfederations = async () => {
        try {
            const res = await axios.get(`${API_URL}/confederations`);
            console.log("Confederations: ", res.data.data);
            this.setState({ confederations: res.data.data });
            this.setState({ confederationList: res.data.data });
        } catch (error) {
            console.log({...error});
        }
    }
    loadMyConfederations = async () => {
        let id = "";
        if (this.props.auth.user === null) {
            id = this.props.auth.data.register_id;
        } else {
            id = this.props.auth.user.data.register_id;
        }
        if (id !== "") {
            this.setState({ federation_id: id });
            try {
                const res = await axios.get(`${API_URL}/fedconf/fed/${id}`);
                console.log("My conf: ", res.data.data);
                this.setState({ my_confederation: res.data.data });
                this.setState({ confederationList: this.state.my_confederation });
            } catch (error) {
                this.setState({ confederationList: this.state.confederations });
                console.log("Fed err: ", {...error});
            }
        }
    }
    joinConfederation = async (federation_id, confederation_id) => {
        this.setState({ loading: true });
        try {
            const res = await axios.post(
                `${API_URL}/fedconf`,
                {
                    federation_id,
                    confederation_id,
                },
                CONFIG
            );
            this.setState({ loading: false });
            if (res.status === 200) {
                this.loadConfederations();
                this.loadMyConfederations();
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

    setconFederationList = () => {
        this.setState({ step: !this.state.step });
        if (this.state.step === false) {
            this.setState({ confederationList: this.state.confederations });
        } else {
            this.setState({ confederationList: this.state.my_confederation });
        }
        console.log("conf: ", this.state.federation_id);
    }

    componentDidMount = () => {
        if (this.props.auth.userCategory !== "federation") {
            this.props.history.push("/dashboard");
        }
        this.initializeData();
        this.loadConfederations();
        this.loadMyConfederations();
    }
    render() {
        let count1 = 0;
        let count2 = 0;
        return (
            <div className="body-container animate__animated animate__zoomIn">
                {console.log("Next data: ", this.props.auth)}
                {console.log("List data: ", this.state.confederationList)}

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
                            <div onClick={() => this.setconFederationList(this.state.step)} className="btn-floating btn-large hoverable bg-color">
                                <i className="large material-icons">{this.state.step === true ? "list" : "add"}</i>
                            </div>
                        </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <h5><b className="title-txt">{this.state.step === true ? "List of confederations | Select new confederation" : "List of my confederations"}</b></h5>
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
                                {this.state.my_confederation === "" && this.state.confederationList !== "" && this.state.step === true ? 
                                this.state.confederationList.map((item, i) => {
                                    if (item.confederation_id !== null) {
                                        count1 += 1;
                                        return (
                                        <tr key={i + 1}>
                                            <td>{count1}</td>
                                            <td>{item.confederation_name}</td>
                                            <td>
                                                {(this.state.step === true ? (<div onClick={() => this.joinConfederation(this.state.federation_id, item.confederation_id)} className="table-icons my-tb-icon"><AiFillFileAdd className="table-icons-icon-success" /> <lable style={{fontSize: '15px', position: 'relative', top: '9px'}}>Join request</lable></div>) : <div className="alert-info">Pending</div>)}
                                            </td>
                                        </tr>
                                    )} else { return "" }
                                }) : 
                                this.state.confederationList !== "" ? (
                                    this.state.my_confederation !== "" ?
                                    this.state.confederationList.map((item, i) => {
                                        if (item.federation_id !== null) {
                                            count2 += 1;
                                            let check_union = this.state.my_confederation.find(itm => itm.confederation_id === item.confederation_id);
                                            return (
                                            <tr key={i + 1}>
                                                <td>{count2}</td>
                                                <td>{item.confederation_name}</td>
                                                <td>
                                                    {check_union === undefined ? 
                                                    (this.state.step === true ? 
                                                        (<div onClick={() => this.joinConfederation(this.state.federation_id, item.confederation_id)} className="table-icons my-tb-icon"><AiFillFileAdd className="table-icons-icon-success" /> <lable style={{fontSize: '15px', position: 'relative', top: '9px'}}>Join request</lable></div>) : "") : 
                                                        check_union.confederation_id === item.confederation_id ? 
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

RegisterAddConfederation.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {  })(
    RegisterAddConfederation
);
