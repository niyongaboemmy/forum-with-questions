import React, { Component, Fragment } from 'react'
import AdminNav from '../../../components/AdminNav'
import AdminSideNav from '../../../components/AdminSideNav'
import axios from "axios";
import { AiOutlineLoading3Quarters, AiOutlineLogin, AiOutlineUser, } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { API_URL, CONFIG } from "../../../utils/api";
import { TOKEN_NAME } from "../../../utils/api";
import { connect } from "react-redux";
import { 
  addTestDetails, 
  addTestQuestion, 
  removeTestQuestion, 
  addTestQuestionAnswer, 
  removeTestQuestionAnswer, 
  clearTestTemps,
  getTests,
  setTestStatus,
 } from "../../../actions/prepare-test";
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../../shared/Loading/Loading';
import { MdDeleteForever } from 'react-icons/md';
import { CgMoreO } from 'react-icons/cg';

export class Tests extends Component {
  state = {
    modal: true,
    addQuestionTab: false,
    loading: false,
    smallLoading: false,
    selectedTest: "",
  }

  setLoading = (status) => {
    this.setState({ loading: status });
  }
  setSemiLoading = (status) => {
    this.setState({ smallLoading: status });
  }

  componentDidMount = () => {
    this.props.getTests(this.setLoading);
  }
  
  render() {
    return (
      <Fragment>
        <div className="admin-container">
          {/* Nav Bar here */}
          <AdminNav />
          <div className="row">
            <div className="col xl2 l2 m3 s12">
              {/* Side Nav here */}
              <AdminSideNav />
            </div>
            <div className="col xl10 l10 m10 s12">
              <div className="main admin-container-main animate__animated animate__zoomIn">
                <div className="container-fluid admin-bg">
                  <div className="row" style={{margin: '0px'}}>
                    <div className="col xl6 l6 m6 s12">
                      <div className="my-title" style={{fontSize: '23px'}}>List of tests</div>
                    </div>
                    <div className="col xl6 l6 m6 s12">
                      <Link to="/test" className="waves-effect waves-light right my-btn bg-color hoverable main-btn">Add test</Link>
                    </div>
                  </div>
                  {this.state.loading === true ? <center><Loading msg="Please wait" /></center> :
                  <div>
                    <div className="white">
                      <table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Test</th>
                            <th>Duration</th>
                            <th></th>
                            <th className="right">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.testsList !== null && this.props.testsList.map((item, i) => (
                            <tr key={i + 1} style={item.published === 1 ? {color: 'green', fontWeight: 'bold', backgroundColor: '#edffed'} : {}}>
                              <td>{i + 1}</td>
                              <td>{item.title}</td>
                              <td>{item.duration}</td>
                              <td>
                                <div className="right">
                                  <div className="switch">
                                    <label style={item.published === 1 ? {color: 'green'} : {}}>
                                      Off
                                      <input onChange={() => {this.state.smallLoading === false && this.props.setTestStatus(item.test_id, item.published === 1 ? false : true, this.setSemiLoading); this.state.smallLoading === false && this.setState({ selectedTest: item.test_id })}} type="checkbox" checked={item.published === 1 ? true : false} />
                                      <span className="lever"></span>
                                      On
                                    </label>
                                  </div>
                                  {/* <MdDeleteForever style={{fontSize: '36px', color: '#a80000', cursor: 'pointer'}} className="right" onClick={() => alert("Under construction")} /> */}
                                </div>
                              </td>
                              <td>
                                <span className="center" style={{color: this.state.smallLoading === true && this.state.selectedTest === item.test_id ? "orange" : "black", marginLeft: '5px', marginRight: '20px', fontWeight: 'bold'}}>{this.state.smallLoading === true && this.state.selectedTest === item.test_id ? "Saving..." : item.published === 1 ? "Published" : "Disabled"}</span>
                                <Link to={`/tests/${item.test_id}`}><CgMoreO className="my-icon-arrow right"/></Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  test: state.prepareTest.test,
  questions: state.prepareTest.questions,
  testsList: state.prepareTest.testsList,
});

export default connect(mapStateToProps, { addTestDetails, addTestQuestion, removeTestQuestion, addTestQuestionAnswer, removeTestQuestionAnswer, clearTestTemps, getTests, setTestStatus })(Tests);