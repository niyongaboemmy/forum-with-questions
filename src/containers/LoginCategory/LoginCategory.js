import React, { Component } from "react";
import axios from "axios";
import { AiFillAlipayCircle, AiOutlineDashboard, AiOutlineLogin, AiOutlineSetting, AiOutlineUser, AiOutlineUserAdd, AiOutlineUsergroupAdd } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { API_URL, CONFIG } from "../../utils/api";
import { TOKEN_NAME } from "../../utils/api";
import { connect } from "react-redux";
import { LoginSuccess } from "../../actions/auth";
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import PublicNav from "../../components/PublicNav";
import PublicFooter from "../../components/PublicFooter";
import AdminRegister from "../AdminRegister/AdminRegister";
import AdminLogin from "../AdminLogin/AdminLogin";

export class LoginCategory extends Component {
    state = {
        step: 1,
        loading: false,
        category: "",
    }
    componentDidMount() {
        if (this.props.isAuthenticated === true) {
            this.props.history.push("/dashboard");
        }
    }
    UpdateCategory = (input) => {
        this.setState({ category: input })
    }
    pushDashboardPage = () => {
        this.props.history.push("/dashboard");
    }

    render() {
        // if (this.state.loading === false) {
        //     return (<div style={{marginTop: '20%'}}><center><Loading msg="Please wait" /></center></div>)
        // }
        return (
            <div>
                <PublicNav />
                {this.state.category === "" ? 
                <div className="row">
                    <div className="col xl1 l1 m1 s12" />
                    <div className="col xl10 l10 m10 s12">
                        <div className="login-container account-category-container animate__animated animate__zoomIn">
                            <form>
                                <h1 className="center-align" style={{marginBottom: '5px', marginTop: '10px'}}><AiOutlineLogin className="login-icon" style={{backgroundColor: 'transparent'}} /></h1>
                                <div style={{marginBottom: '10px'}} className="center-align">
                                    <div className="title-txt-white-admin-register">Choose login category</div>
                                </div>
                                <div className="account-category">
                                    <div className="row account-category-container">
                                        <div className="col xl3 l3 m3 s6">
                                            <center>
                                                <Link style={{color: '#fff'}} to="/login">
                                                    <div className="account-category-item">
                                                        <AiFillAlipayCircle className="account-category-item-icon" />
                                                        <div className="account-category-item-text">Cooperative</div>
                                                    </div>
                                                </Link>
                                            </center>
                                        </div>
                                        <div className="col xl3 l3 m3 s6">
                                            <center>
                                                <div className="account-category-item" onClick={() => this.setState({ category: "union" })}>
                                                    <AiFillAlipayCircle className="account-category-item-icon" />
                                                    <div className="account-category-item-text">Union</div>
                                                </div>
                                            </center>
                                        </div>
                                        <div className="col xl3 l3 m3 s6">
                                            <center>
                                                <div className="account-category-item" onClick={() => this.setState({ category: "federation" })}>
                                                    <AiFillAlipayCircle className="account-category-item-icon" />
                                                    <div className="account-category-item-text">Federation</div>
                                                </div>
                                            </center>
                                        </div>
                                        <div className="col xl3 l3 m3 s6">
                                            <center>
                                                <div className="account-category-item" onClick={() => this.setState({ category: "confederation" })}>
                                                    <AiFillAlipayCircle className="account-category-item-icon" />
                                                    <div className="account-category-item-text">Confederation</div>
                                                </div>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginBottom: '20px'}}>
                                    <center>
                                        <Link to="/register-category" className="my-btn bg-color">New account</Link>
                                    </center>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col xl1 l1 m1 s12" />
                </div>
                : <AdminLogin pushDashboardPage={this.pushDashboardPage} UpdateCategory={this.UpdateCategory} category={this.state.category} />}
                <PublicFooter />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { LoginSuccess })(LoginCategory);
