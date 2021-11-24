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
import { MdArrowBack } from 'react-icons/md'
export class TestResults extends Component {
  state = {
    modal: true,
    addQuestionTab: false,
    loading: false,
    smallLoading: false,
    selectedTest: "",
    testMarks: null,
    testDetails: null,
  }

  setLoading = (status) => {
    this.setState({ loading: status });
  }
  setSemiLoading = (status) => {
    this.setState({ smallLoading: status });
  }

  getTestDetails = async (test_id) => {
    this.setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/test/${test_id}`);
      if (res.status === 200) {
        console.log("Test details: ", res.data)
        this.setState({ testDetails: res.data })
      }
    } catch (error) {
      console.log("Err: ", {...error});
    }
    this.setLoading(false);
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

  showAnswersDetailsStatus = async (test_id, status) => {
    this.setLoading(true);
    try {
      const res = await axios.patch(`${API_URL}/test/showcorrectanswer/${test_id}`, {
        value: status
      });
      if (res.status === 200) {
        this.getTestDetails(test_id);
      }
    } catch (error) {
      this.setLoading(false);
      console.log("Err: ", {...error});
    }
  }

  componentDidMount = () => {
    if (this.props.match.params.test_id) {
      this.getTestDetails(this.props.match.params.test_id);
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
                      <div className="row">
                        <div className="col" style={{paddingRight: '0px', paddingLeft: '10px'}}>
                          <Link to="/tests">
                            <MdArrowBack className="my-icon-arrow" />
                          </Link>
                        </div>
                        <div className="col">
                          <div className="my-title" style={{fontSize: '23px', marginBottom: '0px'}}>{this.state.testDetails !== null && this.state.testDetails.title}</div>
                          <div style={{marginBottom: '20px', color: this.state.testDetails === null ? "grey" : this.state.testDetails.show_correct_answer === 1 ? "black" : "gray"}}>{this.state.testDetails === null ? "" : this.state.testDetails.show_correct_answer === 1 ? "Users can view test marks and question details" : "Users can view only total marks"}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col xl6 l6 m6 s12" style={{paddingTop: '20px'}}>
                      {this.state.testDetails !== null && this.state.testDetails.show_correct_answer === 1 ?
                      <button onClick={() => this.state.testDetails !== null && this.showAnswersDetailsStatus(this.state.testDetails.test_id, this.state.testDetails.show_correct_answer === 1 ? false : true)} className="waves-effect waves-light right my-btn bg-color hoverable main-btn">Hide marks details</button> :
                      this.state.testDetails !== null && this.state.testDetails.show_correct_answer === 0 ?
                      <button onClick={() => this.state.testDetails !== null && this.showAnswersDetailsStatus(this.state.testDetails.test_id, this.state.testDetails.show_correct_answer === 1 ? false : true)} className="waves-effect waves-light right my-btn bg-color hoverable main-btn" style={{backgroundColor: '#00a96a', border: 'none'}}>Show marks details</button> :
                      <div className="right" style={{backgroundColor: 'lightgrey', padding: '5px', paddingLeft: '15px', paddingRight: '15px', paddingTop: '8px'}}>Please wait...</div>}
                    </div>
                  </div>
                  {this.state.loading === true || this.state.testMarks === null || this.state.testDetails === null ? <center><Loading msg="Please wait" /></center> :
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