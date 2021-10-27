import React, { Component, Fragment } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/api";
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
 } from "../../actions/prepare-test";
import Loading from '../../shared/Loading/Loading';
import setAuthToken from '../../utils/setAuthToken';

export class TestResults extends Component {
  state = {
    modal: true,
    addQuestionTab: false,
    loading: false,
    smallLoading: false,
    selectedTest: "",
    testMarks: null,
  }

  setLoading = (status) => {
    this.setState({ loading: status });
  }
  setSemiLoading = (status) => {
    this.setState({ smallLoading: status });
  }

  getTestResults = async (test_id) => {
    this.setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/usertestmarks/test/${test_id}`);
      if (res.status === 200) {
        console.log("res marks: ", res.data)
        this.setState({ testMarks: res.data })
      }
    } catch (error) {
      console.log("Err: ", {...error});
    }
    this.setLoading(false);
  }

  componentDidMount = () => {
    if (this.props.match.params.test_id) {
      this.getTestResults(this.props.match.params.test_id);
    }
  }

  findMarksTotal = (questions) => {
    let sum = 0;
    for (let question of questions) {
      sum += question.marks
    }
    return sum/questions.length;
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
                      <div className="my-title" style={{fontSize: '23px'}}>Test results for users</div>
                    </div>
                    <div className="col xl6 l6 m6 s12">
                      <Link to="/tests" className="waves-effect waves-light right my-btn bg-color hoverable main-btn">Back to list</Link>
                    </div>
                  </div>
                  {this.state.loading === true || this.state.testMarks === null ? <center><Loading msg="Please wait" /></center> :
                  <div>
                    <div className="white">
                      <table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Username</th>
                            <th className="right">Marks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.testMarks !== null && this.state.testMarks.map((item, i) => (
                            <tr key={i + 1} style={this.findMarksTotal(item.questionMarks) < 50 ? {color: '#8f5c00', backgroundColor: 'rgb(255 249 239)'} : {}}>
                              <td>{i + 1}</td>
                              <td>{item.user.fname}</td>
                              <td>{item.user.lname}</td>
                              <td>{item.user.username}</td>
                              <td className="right">{this.findMarksTotal(item.questionMarks).toFixed(2)}%</td>
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

export default connect(mapStateToProps, { addTestDetails, addTestQuestion, removeTestQuestion, addTestQuestionAnswer, removeTestQuestionAnswer, clearTestTemps, getTests, setTestStatus })(TestResults);