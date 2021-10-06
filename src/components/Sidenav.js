// import React, { Component } from 'react'
// import { NavLink } from "react-router-dom";
// import PropTypes from 'prop-types'
// import { connect } from "react-redux";
// import { LogoutTheUser } from "../actions/auth";
// import { AiOutlineUser, AiFillCaretDown } from "react-icons/ai";
// import { Menus } from '../utils/menus';
// import { ACCOUNT_CATEGORY, SELECTED_COOP } from '../actions/types';

// class Sidenav extends Component {
//     state = {
//         user: "",
//         loading: true,
//         account_category: "",
//         userCategory: "",
//         fname: "",
//         lname: "",
//         register_name: "",
//         account_type_title: "",
//     }

//     setAccountCaegory = (input) => {
//         this.setState({ account_category: input })
//     }
//     userDetails = () => {
//         console.log(this.props.auth);
//         switch (this.props.auth.userCategory) {
//             case "union":
//                 this.setState({ account_type_title: "Union" });
//                 break;
//             case "federation":
//                 this.setState({ account_type_title: "Federation" });
//                 break;
//             case "confederation":
//                 this.setState({ account_type_title: "Confederation" });
//                 break;
//             case "members":
//                 this.setState({ account_type_title: "Cooperative" });
//                 break;
//             default:
//                 this.setState({ account_type_title: "" });
//                 break;
//         }
//         if (this.props.auth.user === null) {
//             this.setState({ user: this.props.auth.data });
//             this.setState({ fname: this.props.auth.data.fname });
//             this.setState({ lname: this.props.auth.data.lname });
//             if (this.props.auth.userCategory === "members") {
//                 for (let i in this.props.auth.data.allCoops) {
//                     if (this.props.auth.data.allCoops[i].coop_id === localStorage.getItem(SELECTED_COOP)) {
//                         this.setState({ register_name: this.props.auth.data.allCoops[i].cooperative_name });
//                     }
//                 }
//             } else {
//                 this.setState({ register_name: this.props.auth.data.register_name });
//             }
//         } else {
//             this.setState({ user: this.props.auth.user.data });
//             this.setState({ fname: this.props.auth.user.data.fname });
//             this.setState({ lname: this.props.auth.user.data.lname });
//             if (this.props.auth.userCategory === "members") {
//                 for (let i in this.props.auth.user.data.allCoops) {
//                     if (this.props.auth.user.data.allCoops[i].coop_id === localStorage.getItem(SELECTED_COOP)) {
//                         this.setState({ register_name: this.props.auth.user.data.allCoops[i].cooperative_name });
//                     }
//                 }
//             } else {
//                 this.setState({ register_name: this.props.auth.user.data.register_name });
//             }
//         }
//     };

//     componentDidMount = () => {
//         this.userDetails(localStorage.getItem(ACCOUNT_CATEGORY));
//     }
//     render() {
//         return (
//             <div className="hide-sm">
//                 {console.log("New user: ", this.state.user)}
//                 <ul id="sidenav-1" className="sidenav sidenav-fixed animate__animated animate__fadeInLeft hide-sm">
//                     <li>
//                         <h1 className="center-align nav-header"><AiOutlineUser className="user-icon animate__animated animate__zoomIn" />
//                             <center><div className="coop-name-tag">
//                                 {this.state.fname !== "" ? this.state.fname : ""} {this.state.lname !== "" ? this.state.lname : ""}
//                             </div></center>
//                         </h1>
//                     </li>
//                     <li>
//                         <div className="nav-user-name-tag">
//                             {this.state.account_type_title !== "" ? this.state.account_type_title : ""} | {this.state.register_name !== "" ? this.state.register_name : ""}
//                             <AiFillCaretDown style={{float: "right", marginTop: '16px', cursor: 'pointer'}} />
//                         </div>
//                     </li>
//                     {Menus.map((item) => {
//                         if (item.user === this.props.auth.userCategory || item.user === "all") {
//                             return (
//                                 <li className=" animate__animated animate__fadeIn" key={item.key}><NavLink to={`${item.link}`}>{item.icon} {item.name}</NavLink></li>
//                             )
//                         } else { return "" }
//                     })}
//                 </ul>
//             </div>
//         )
//     }
// }

// Sidenav.propTypes = {
//     auth: PropTypes.object.isRequired,
// };
// const mapStateToProps = (state) => ({
//     auth: state.auth,
//     userCategory: state.userCategory,
// });
// export default connect(mapStateToProps, { LogoutTheUser })(
//     Sidenav
// );