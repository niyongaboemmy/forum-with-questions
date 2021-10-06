import React, { Component } from 'react'
import Sidenav from '../../components/Sidenav'
import Navbar from '../../components/Navbar'
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

export class CooperativeShares extends Component {
    state = {
        loading: true,
        members: "",
    }
    getShares = async () => {
        let coop_id = '';
        if (this.props.auth.selectedCoop !== null) {
            coop_id = this.props.auth.selectedCoop;
            setAuthToken();
            try {
                const res = await axios.get(`${API_URL}/contrshares/shares/${coop_id}`);
                if (res.status === 200) {
                    this.setState({ members: res.data.data });
                    console.log("res: ", res.data.data)
                }
            } catch (error) {
                console.log("error: ", {...error});
            }
        }
    }
    componentDidMount = () => {
        this.getShares();
    }
    render() {
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                    <div className="row">
                        <div className="col xl2 l2 m2 s12">
                            <div class="fixed-actin-btn">
                            <Link to="/members" class="btn-floating btn-large hoverable bg-color">
                                <i class="large material-icons">add</i>
                            </Link>
                        </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <h5><b className="title-txt">Cooperative shares history</b></h5>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Share</th>
                                <th>Date</th>
                            </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.members === "" ? <tr><td colSpan={5}><center><h5>Loading...</h5></center></td></tr> : 
                                    this.state.members.length === 0 ? <tr><td colSpan={5}><center><h5>No data found!</h5></center></td></tr> : 
                                    this.state.members.map((item, i) => {
                                        return (
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{item.fname}</td>
                                                <td>{item.lname}</td>
                                                <td>{item.memberemail}</td>
                                                <td>{item.contributed_share}</td>
                                                <td>{item.contributed_date}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

CooperativeShares.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    CooperativeShares
);