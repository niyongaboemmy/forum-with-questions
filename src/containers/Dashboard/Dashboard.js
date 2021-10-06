import React, { Component } from 'react'
import Chart from "react-apexcharts";
import { AiFillBell, AiFillInteraction, AiOutlineAreaChart, AiOutlineCamera, AiOutlineGroup, AiOutlineInteraction, AiOutlineSetting, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd } from 'react-icons/ai'
// Components
import Navbar from '../../components/Navbar'
import Sidenav from '../../components/Sidenav'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { LoginSuccess } from "../../actions/auth";
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import axios from 'axios'
import { API_URL } from '../../utils/api'
import setAuthToken from '../../utils/setAuthToken'

export class Dashboard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            coop_id: "",
            cooperative_name: "",
            summary: {
                total_members: "",
                total_male: "",
                total_female: "",
                total_unions: "",
            },

            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: []
                }
            },
            series: [
                {
                    name: "series-1",
                    data: []
                }
            ],
            graph1: "bar",
            graph2: "area",
        };
    }
    setCoopName = () => {
        if (this.props.auth.user === null) {
            if (this.props.auth.userCategory === "members") {
                for (let i in this.props.auth.data.allCoops) {
                    if (this.props.auth.data.allCoops[i].coop_id === this.props.auth.selectedCoop) {
                        this.setState({ coop_id: this.props.auth.data.allCoops[i].coop_id });
                        this.setState({ cooperative_name: this.props.auth.data.allCoops[i].cooperative_name });
                    }
                }
            }
        } else {
            if (this.props.auth.userCategory === "members") {
                for (let i in this.props.auth.user.data.allCoops) {
                    if (this.props.auth.user.data.allCoops[i].coop_id === this.props.auth.selectedCoop) {
                        this.setState({ coop_id: this.props.auth.user.data.allCoops[i].coop_id });
                        this.setState({ cooperative_name: this.props.auth.user.data.allCoops[i].cooperative_name });
                    }
                }
            }
        }
    }

    // Union only
    getCooperatives = async () => {
        if (this.props.auth.userCategory === "union") {
            var union_id = "";
            if (this.props.auth.user === null) {
                union_id = this.props.auth.data.register_id;
            } else {
                union_id = this.props.auth.user.data.register_id;
            }
            setAuthToken();
            try {
                let titles = [];
                let values1 = [];
                let values2 = [];
                let values3 = [];
                const res_union = await axios.get(`${API_URL}/coopunion/union/${union_id}`);
                if (res_union.status === 200) {
                    // Get summary by ID:::
                    for(let iterate in res_union.data.data) {
                        try {
                            const res = await axios.get(`${API_URL}/summary/tcmember/${res_union.data.data[iterate].coop_id}`);
                            if (res.status === 200) {
                                titles.push(res_union.data.data[iterate].cooperative_name);
                                values1.push(res.data.totalCoopMember);
                                values2.push(res.data.totalMale);
                                values3.push(res.data.totalFemale);

                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    this.setState({
                        options: {
                            xaxis: {
                                categories: titles
                            }
                        }
                    });
                    this.setState({
                        series: [{
                            name: "Cooperatives",
                            data: values1,
                        },
                        {
                            name: "Male",
                            data: values2,
                        },
                        {
                            name: "Female",
                            data: values3,
                        }]
                    });
                }
            } catch (error) {
                console.log("err: ", error);
            }
        }
    }

    // Federation only
    getUnions = async () => {
        if (this.props.auth.userCategory === "federation") {
            var federation_id = "";
            if (this.props.auth.user === null) {
                federation_id = this.props.auth.data.register_id;
            } else {
                federation_id = this.props.auth.user.data.register_id;
            }
            setAuthToken();
            try {
                let titles = [];
                let values1 = [];
                const res_union = await axios.get(`${API_URL}/unionfed/fed/${federation_id}`);
                if (res_union.status === 200) {
                    // Get summary by ID:::
                    for(let iterate in res_union.data.data) {
                        try {
                            const res = await axios.get(`${API_URL}/coopunion/union/${res_union.data.data[iterate].union_id}`);
                            if (res.status === 200) {
                                console.log("BBB: ", res.data.resultCount)
                                titles.push(res_union.data.data[iterate].union_name);
                                values1.push(res.data.resultCount);
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    this.setState({
                        options: {
                            xaxis: {
                                categories: titles
                            }
                        }
                    });
                    this.setState({
                        series: [{
                            name: "Members",
                            data: values1,
                        }]
                    });
                }
            } catch (error) {
                console.log("err: ", error);
            }
        }
    }

    // Confederation only
    getFederations = async () => {
        if (this.props.auth.userCategory === "confederation") {
            var confederation_id = "";
            if (this.props.auth.user === null) {
                confederation_id = this.props.auth.data.register_id;
            } else {
                confederation_id = this.props.auth.user.data.register_id;
            }
            setAuthToken();
            try {
                let titles = [];
                let values1 = [];
                const res_conf = await axios.get(`${API_URL}/fedconf/conf/${confederation_id}`);
                if (res_conf.status === 200) {
                    // Get summary by ID:::
                    for(let iterate in res_conf.data.data) {
                        try {
                            const res = await axios.get(`${API_URL}/unionfed/fed/${res_conf.data.data[iterate].federation_id}`);
                            if (res.status === 200) {
                                titles.push(res_conf.data.data[iterate].federation_name);
                                values1.push(res.data.resultCount);
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    this.setState({
                        options: {
                            xaxis: {
                                categories: titles
                            }
                        }
                    });
                    this.setState({
                        series: [{
                            name: "Unions",
                            data: values1,
                        }]
                    });
                }
            } catch (error) {
                console.log("err: ", error);
            }
        }
    }

    getSummary = async () => {
        if (this.props.auth.userCategory === "members") {
            if (this.props.auth.selectedCoop !== null) {
                setAuthToken();
                try {
                    const res = await axios.get(`${API_URL}/summary/tcmember/${this.props.auth.selectedCoop}`);
                    this.setState({ 
                        summary: {
                            total_members: res.data.totalCoopMember,
                            total_male: res.data.totalMale,
                            total_female: res.data.totalFemale,
                            total_unions: res.data.totalCoopUnion
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }

    componentDidMount = () => {
        this.setCoopName();
        this.getSummary();
        this.getCooperatives();
        this.getUnions();
        this.getFederations();
    }
    render() {
        return (
            <div className="body-container" style={{marginLeft: '10px', marginRight: '10px'}}>
                    {this.props.auth.userCategory !== "members" ? 
                    <div className="body-container-page animate__animated animate__zoomIn">
                        <div className="row">
                            <div className="col xl6 l6 m12 s12">
                            <h5 className="title-txt">
                            {
                            this.props.auth.userCategory === "members" ? "Cooperative members" :
                            this.props.auth.userCategory === "union" ? "Union cooperatives" :
                            this.props.auth.userCategory === "federation" ? "Unions" : "Federations"

                            } summary | Bar chart <hr /></h5>
                                <div className="mixed-chart">
                                    <Chart
                                        options={this.state.options}
                                        series={this.state.series}
                                        type="bar"
                                        width="100%"
                                        // height="500px"
                                    />
                                </div>
                            </div>
                            <div className="col xl6 l6 m12 s12">
                            <h5 className="title-txt">
                            {
                            this.props.auth.userCategory === "members" ? "Cooperative members" :
                            this.props.auth.userCategory === "union" ? "Union cooperatives" :
                            this.props.auth.userCategory === "federation" ? "Unions" : "Federations"

                            } summary | Area chart <hr /></h5>
                                <div className="mixed-chart">
                                    <Chart
                                        options={this.state.options}
                                        series={this.state.series}
                                        type="area"
                                        width="100%"
                                        // height="500px"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    : ""}
                    <div className="row animate__animated animate__zoomIn" style={{marginLeft: '-10px', marginRight: '-10px'}}>
                        {this.props.auth.userCategory === "members" && this.state.summary.total_female !== "" ? 
                        <div className="body-container-page">
                            <div className="row">
                                <div className="col xl3 l3 m3 s12">
                                    <div className="summary-count bg-green">
                                        <center>
                                            <AiOutlineUsergroupAdd style={{fontSize: '120px'}} />
                                            <div className="summ-title">Members</div>
                                            <div className="summ-count">{this.state.summary.total_members}</div>
                                            <Link style={{color: '#fff'}} to="/members">
                                                <div className="my-btn my-btn-summ">View details</div>
                                            </Link>
                                        </center>
                                    </div>
                                </div>
                                <div className="col xl3 l3 m3 s12">
                                    <div className="summary-count animate__animated animate__zoomIn">
                                        <center>
                                            <AiOutlineUser style={{fontSize: '120px'}} />
                                            <div className="summ-title">Male</div>
                                            <div className="summ-count">{this.state.summary.total_male}</div>
                                            <Link style={{color: '#fff'}} to="/members">
                                                <div className="my-btn my-btn-summ">View details</div>
                                            </Link>
                                        </center>
                                    </div>
                                </div>
                                <div className="col xl3 l3 m3 s12">
                                    <div className="summary-count bg-orange animate__animated animate__zoomIn">
                                        <center>
                                            <AiOutlineUser style={{fontSize: '120px'}} />
                                            <div className="summ-title">Female</div>
                                            <div className="summ-count">{this.state.summary.total_female}</div>
                                            <Link style={{color: '#fff'}} to="/members">
                                                <div className="my-btn my-btn-summ">View details</div>
                                            </Link>
                                        </center>
                                    </div>
                                </div>
                                <div className="col xl3 l3 m3 s12">
                                    <div className="summary-count bg-blue animate__animated animate__zoomIn">
                                        <center>
                                            <AiOutlineSetting style={{fontSize: '120px'}} />
                                            <div className="summ-title">My unions</div>
                                            <div className="summ-count">{this.state.summary.total_unions}</div>
                                            <Link style={{color: '#fff'}} to="/request-union">
                                                <div className="my-btn my-btn-summ">View details</div>
                                            </Link>
                                        </center>
                                    </div>
                                </div>
                            </div>
                    </div>
                         : ""}
                    <br/>
                    <div className="body-container-page animate__animated animate__zoomIn">
                        <div className="row">
                            <div className="col l12">
                            <br/>
                            <center>
                                <Link to={
                                    this.props.auth.userCategory === "members" ? "/cooperative-tree" : 
                                    this.props.auth.userCategory === "union" ? "/union-tree" : 
                                    this.props.auth.userCategory === "federation" ? "/federation-tree" :
                                    this.props.auth.userCategory === "confederation" ? "/confederation-tree" : ""
                                }>
                                    <div className="big-circle-btn">
                                        <center>
                                            <AiOutlineInteraction style={{fontSize: '114px'}} /><br/>
                                            View tree structure
                                        </center>
                                    </div>
                                </Link>
                            </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    Dashboard
);