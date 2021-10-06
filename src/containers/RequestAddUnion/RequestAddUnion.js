import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
// import setAuthToken from '../../utils/setAuthToken';
import axios from 'axios';
import { API_URL, CONFIG } from '../../utils/api';
import { AiFillCheckCircle, AiFillCloseCircle, AiFillFileAdd, AiFillInfoCircle } from 'react-icons/ai';
import Loading from '../../shared/Loading/Loading';

class RequestAddUnion extends Component {
    state = {
        loading: false,
        coopId: "",
        accountCategory: "",
        unions: "",
        error: "",
        success: "",
        my_union: "",
        step: false,
        unionList: "",
    }
    initializeData = () => {
        this.setState({ accountCategory: this.props.auth.userCategory });
        if (this.props.auth.selectedCoop !== null) {
            this.setState({ coopId: this.props.auth.selectedCoop });
        }
    }
    loadUnions = async () => {
        try {
            const res = await axios.get(`${API_URL}/unions`);
            console.log("Unions: ", res.data.data);
            this.setState({ unions: res.data.data });
        } catch (error) {
            console.log({...error});
        }
    }
    loadMyUnion = async () => {
        let id = this.props.auth.selectedCoop;
        if (id !== "") {
            try {
                const res = await axios.get(`${API_URL}/coopunion/coop/${id}`);
                console.log("My union: ", res.data.data);
                this.setState({ my_union: res.data.data });
                this.setState({ unionList: this.state.my_union });
            } catch (error) {
                this.setState({ unionList: this.state.unions });
                console.log({...error});
            }
        }
    }
    joinUnion = async (coop_id, union_id) => {
        this.setState({ loading: true });
        try {
            const res = await axios.post(
                `${API_URL}/coopunion`,
                {
                    coop_id,
                    union_id,
                },
                CONFIG
            );
            this.setState({ loading: false });
            if (res.status === 200) {
                this.loadMyUnion();
                this.loadUnions();
                this.setState({ step: false });
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

    setUnionList = () => {
        this.setState({ step: !this.state.step });
        if (this.state.step === false) {
            this.setState({ unionList: this.state.unions });
        } else {
            this.setState({ unionList: this.state.my_union });
        }
    }

    componentDidMount = () => {
        if (this.props.auth.userCategory !== "members") {
            this.props.history.push("/dashboard");
        }
        this.initializeData();
        this.loadMyUnion();
        this.loadUnions();
    }
    render() {
        let count1 = 0;
        let count2 = 0;
        return (
            <div className="body-container animate__animated animate__zoomIn">
                {console.log("Next data: ", this.state.step)}
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
                            <div onClick={() => this.setUnionList(this.state.step)} class="btn-floating btn-large hoverable bg-color">
                                <i class="large material-icons">{this.state.step === true ? "list" : "add"}</i>
                            </div>
                        </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <h5><b className="title-txt">{this.state.step === true ? "List of unions | Select new union" : "List of my unions"}</b></h5>
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
                                <th>Union Name</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            </thead>

                            <tbody>
                                {this.state.my_union === "" && this.state.unionList !== "" && this.state.step === true ? 
                                this.state.unionList.map((item, i) => {
                                    if (item.union_id !== null) {
                                        count1 += 1;
                                        return (
                                        <tr key={i + 1}>
                                            <td>{count1}</td>
                                            <td>{item.union_name}</td>
                                            <td>
                                                {(this.state.step === true ? (<div onClick={() => this.joinUnion(this.state.coopId, item.union_id)} className="table-icons my-tb-icon"><AiFillFileAdd className="table-icons-icon-success" /> <lable style={{fontSize: '15px', position: 'relative', top: '9px'}}>Join request</lable></div>) : <div className="alert-info">Pending</div>)}
                                            </td>
                                        </tr>
                                    )} else { return "" }
                                }) : 
                                this.state.unionList !== "" ? (
                                    this.state.my_union !== "" ?
                                    this.state.unionList.map((item, i) => {
                                        if (item.union_id !== null) {
                                            count2 += 1;
                                            let check_union = this.state.my_union.find(itm => itm.union_id === item.union_id);
                                            return (
                                            <tr key={i + 1}>
                                                <td>{count2}</td>
                                                <td>{item.union_name}</td>
                                                <td>
                                                    {check_union === undefined ? 
                                                    (this.state.step === true ? 
                                                        (<div onClick={() => this.joinUnion(this.state.coopId, item.union_id)} className="table-icons my-tb-icon"><AiFillFileAdd className="table-icons-icon-success" /> <lable style={{fontSize: '15px', position: 'relative', top: '9px'}}>Join request</lable></div>) : <div className="alert-info">Pending</div>) : 
                                                        check_union.union_id === item.union_id ? 
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

RequestAddUnion.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
});
export default connect(mapStateToProps, {  })(
    RequestAddUnion
);