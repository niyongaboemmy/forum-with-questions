import React, { Component } from 'react'
import Sidenav from '../../components/Sidenav'
import Navbar from '../../components/Navbar'
import { NavLink } from 'react-router-dom'
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { LoginSuccess } from "../../actions/auth";
import Loading from '../../shared/Loading/Loading';
import Alert from '../../shared/Alert/Alert';

export class Profile extends Component {
    state = {
        fname: "",
        lname: "",
        gender: "",
        email: "",
    }
    componentDidMount = () => {
        if (this.props.auth.user === null) {
            this.setState({ fname: this.props.auth.data.fname });
            this.setState({ lname: this.props.auth.data.lname });
            this.setState({ gender: this.props.auth.data.gender });
            this.setState({ email: this.props.auth.data.useremail });
            if (this.props.auth.userCategory === "members") {
                this.setState({ email: this.props.auth.data.memberemail });
            } else {
                this.setState({ email: this.props.auth.data.useremail });
            }

        } else {
            this.setState({ fname: this.props.auth.user.data.fname });
            this.setState({ lname: this.props.auth.user.data.lname });
            this.setState({ gender: this.props.auth.user.data.gender });
            if (this.props.auth.userCategory === "members") {
                this.setState({ email: this.props.auth.user.data.memberemail });
            } else {
                this.setState({ email: this.props.auth.user.data.useremail });
            }
        }
    }
    render() {
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                    <div className="row">
                        <div className="col xl2 l2 m2 s12">
                            <div class="fixed-actin-btn">
                            <div class="btn-floating btn-large hoverable bg-color">
                                <i class="large material-icons">person</i>
                            </div>
                        </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <h5><b className="title-txt">My profile</b></h5>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <table>
                            <tr>
                                <td><b>First name</b></td>
                                <td>{this.state.fname}</td>
                            </tr>
                            <tr>
                                <td><b>Last name</b></td>
                                <td>{this.state.lname}</td>
                            </tr>
                            {/* <tr>
                                <td><b>Gender</b></td>
                                <td>{this.state.gender}</td>
                            </tr> */}
                            <tr>
                                <td><b>Email</b></td>
                                <td>{this.state.email}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    Profile
);