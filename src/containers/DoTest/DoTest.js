import React, { Component, Fragment } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import axios from "axios";
import { AiOutlineLoading3Quarters, AiOutlineLogin, AiOutlineUser, } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { API_URL, CONFIG } from "../../utils/api";
import { TOKEN_NAME } from "../../utils/api";
import { connect } from "react-redux";
import { ImCheckboxChecked, ImCheckboxUnchecked, ImRadioChecked2, ImRadioUnchecked } from 'react-icons/im'
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
import {
  loadUserTestDetails,
  addUserQuestionAnswer,
  submitUserTest,
  loadUserTestResults,
} from "../../actions/do-test";
import Loading from '../../shared/Loading/Loading';
import Navbar from '../../components/Navbar';
import { MdInfo } from 'react-icons/md';

export class DoTest extends Component {
  state = {
    modal: true,
    addQuestionTab: false,
    loading: false,
    smallLoading: false,
    selectedTest: "",
    submitAnswer: false,
  }

  setLoading = (status) => {
    this.setState({ loading: status });
  }
  setSemiLoading = (status) => {
    this.setState({ smallLoading: status });
  }

  setSubmitAnswer = (status) => {
    if (status === "loading") {
      this.setState({ submitAnswer: true });
    } else {
      this.setState({ submitAnswer: false });
    }
  }

  checkAnswer = (question_id, answer_id) => {
    let question = this.props.questionsAnswers.find(ans => ans.question_id === question_id);
    if (question !== null && question !== undefined) {
      let answer = question.answers.find(itm => itm === answer_id);
      if (answer !== null && answer !== undefined) {
        return true;
      }
    }
    return false;
  }

  componentDidMount = () => {
    if (this.props.auth.user_id) {
      this.props.loadUserTestDetails(this.props.auth.user_id, this.props.loadUserTestResults, this.setLoading);
    }
  }

  validateAnswers = () => {
    for (let check of this.props.questionsAnswers) {
      console.log("curr: ", check)
      if (check.answers.length === 0) {
        return false;
      }
    }
    return true;
  }

  submitTest = () => {
    console.log("user submitted: ", this.props.auth.user_id);
    if (this.props.examDetails === null) {
      return alert("No Test loaded!");
    }
    if (this.validateAnswers() === false) {
      return alert("Please answer all questions!");
    }
    if (this.props.auth.user_id) {
      let myTest = {
        user_id: this.props.auth.user_id,
        test_id: this.props.examDetails.test_id,
        doexam: this.props.questionsAnswers
      }
      this.props.submitUserTest(myTest, this.setSubmitAnswer);
      this.props.loadUserTestDetails(this.props.auth.user_id, this.props.loadUserTestResults, this.setLoading);
    } else {
      alert("Invalid user!");
    }
  }

  findMarks = (questionAnswers, userAnswers) => {
    let userCorrectAnswers = userAnswers.filter(itm => itm.status === 1);
    let userInCorrectAnswers = userAnswers.filter(itm => itm.status === 0);
    let questionCorrectAnswers = questionAnswers.filter(itm => itm.status === 1);
    return (userCorrectAnswers.length - userInCorrectAnswers.length) < 0 ? 0 : (userCorrectAnswers.length - userInCorrectAnswers.length) * 100 / questionCorrectAnswers.length;
  }

  findTotalMarks = (questions) => {
    let total = 0;
    for (let question of questions) {
      total += this.findMarks(question.question.allQuestionAnswers, question.userAnswers)
    }
    return total/questions.length;
  }
  
  render() {
    let preparedTest = this.props.examDetails;
    return (
      <Fragment>
        <div className="admin-containe">
          {/* Nav Bar here */}
          <Navbar />
          <div className="row">
            {(this.state.submitAnswer === true || this.state.loading === true || this.props.testResults === null) && this.props.questionsAnswers !== "none" ?
            <div className="col xl12 l12 m12 s12 white" style={{paddingTop: '100px', paddingBottom: '100px'}}>
              <center><Loading msg="Please wait" /></center>
            </div> :
            this.props.questionsAnswers === "none" ?
            <div className="col xl12 l12 m12 s12 white" style={{paddingTop: '100px', paddingBottom: '100px'}}>
              <center>
                <div>
                  <MdInfo style={{fontSize: '70px'}} />
                </div>
                <div style={{fontSize: '24px',}}>No test published!</div>
                <div>
                  <button onClick={() => window.location.reload()}>Reflesh page</button>
                </div>
              </center>
            </div>
            :
            <div className="col xl12 l12 m12 s12">
              <div className="container animate__animated animate__zoomIn">
                <div className="container-fluid admin-b">
                  <div className="row test-header" style={{margin: '0px'}}>
                    <div className="col xl6 l6 m6 s12" style={{height: '0px'}}>
                      {preparedTest !== null && preparedTest !== undefined && this.props.testResults !== null && this.props.testResults.length === 0 ?
                      <div className="my-title" style={{fontSize: '23px'}}>Do test</div> :
                      <div className="my-title" style={{fontSize: '23px'}}>Test results</div>}
                    </div>
                    {preparedTest !== null && preparedTest !== undefined && this.props.testResults !== null && this.props.testResults.length === 0 ? 
                    <div className="col xl6 l6 m6 s12">
                      <button onClick={() => this.submitTest()} className="waves-effect waves-light right my-btn bg-color hoverable main-btn">Submit test</button>
                    </div> :
                    <div></div>}
                  </div>
                  {this.state.loading === true ? <center><Loading msg="Please wait" /></center> :
                  preparedTest !== null && preparedTest !== undefined && this.props.testResults !== null && this.props.testResults.length === 0 ?
                  <div>
                    <div className="" style={{padding: '10px', borderRadius: '5px'}}>
                      <div>
                        <div>Test title</div><br/>
                        <span className="font-bold">{preparedTest.title}</span>
                      </div>
                      {preparedTest.questions.length > 0 && preparedTest.questions.map((item, i) => (
                        <div key={i + 1}className="question">
                          <div style={{marginLeft: '10px', marginTop: '10px'}}>Question {i + 1}:</div>
                          <div style={{marginLeft: '10px', marginTop: '10px'}} className="font-bold">
                            {item.description}
                          </div>
                          <div className="question-answers">
                            {item.answers.map((itm, j) => (
                              <div 
                              key={j + 1} 
                              onClick={() => {
                                this.props.addUserQuestionAnswer(itm.question_id, itm.answer_id)
                              }}
                              className={`question-answers-item ${this.checkAnswer(itm.question_id, itm.answer_id) === true ? "active-answer" : ""}`}>
                                <div className="row" style={{marginBottom: '0px'}}>
                                  {this.checkAnswer(itm.question_id, itm.answer_id) === true ? 
                                  <div className="col">
                                    {item.answers.filter(x => x.status === 1).length > 1 ?
                                    <ImCheckboxChecked className="left-icon" />:
                                    <ImRadioChecked2 className="left-icon" />}
                                  </div> :
                                  <div className="col">
                                    {item.answers.filter(x => x.status === 1).length > 1 ?
                                    <ImCheckboxUnchecked className="left-icon" />:
                                    <ImRadioUnchecked className="left-icon" />}
                                  </div>}
                                  <div className="col">
                                    {itm.value}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="row test-footer" style={{margin: '0px'}}>
                      <div className="col xl6 l6 m6 s12">
                        <Link to="/topics" className="waves-effect waves-light my-btn bg-color hoverable main-btn" style={{backgroundColor: '#fff', color: 'gray'}}>Back to list</Link>
                      </div>
                      <div className="col xl6 l6 m6 s12">
                        <button onClick={() => this.submitTest()} className="waves-effect waves-light right my-btn bg-color hoverable main-btn">Submit test</button>
                      </div>
                    </div>
                  </div> : 
                  this.props.testResults !== null &&  this.props.testResults.length > 0 &&
                  <div>
                    <div className="" style={{padding: '10px', borderRadius: '5px'}}>
                      <div>
                        <br/>
                        <div></div>
                        <span className="font-bold">{preparedTest !== null && preparedTest !== undefined && preparedTest.title}</span>
                        {this.props.testResults.length > 0 &&
                        <div className="font-bold" style={{padding: '5px', paddingTop: '8px', backgroundColor: 'white', color: 'blue', width: 'max-content', float: 'right', textDecoration: 'underline'}}>Total marks: {this.findTotalMarks(this.props.testResults).toFixed(2)}%</div>}
                      </div>
                      {preparedTest === null || preparedTest === undefined ? <Loading /> : preparedTest.show_correct_answer === 0 ? 
                      <div>
                        <center>
                          
                        </center>
                      </div> 
                      : this.props.testResults.length > 0 && this.props.testResults.map((item, i) => (
                        <div key={i + 1}className="question">
                          <div className="row" style={{margin: '0px'}}>
                            <div className="col s10 m10 l10 xl10">
                              <div style={{marginLeft: '10px', marginTop: '10px'}}>Question {i + 1}:</div>
                              <div style={{marginLeft: '10px', marginTop: '10px'}} className="font-bold">
                                {item.question.description}
                              </div>
                            </div>
                            <div className="col s2 m2 l2 xl2 right">
                              <div style={{marginLeft: '10px', marginTop: '10px', float: 'right'}}>Question marks</div>
                              <div style={{marginLeft: '10px', marginTop: '10px', float: 'right', color:this.findMarks(item.question.allQuestionAnswers, item.userAnswers) >= 50 ? "green" : "red"}} className="font-bold">
                                {this.findMarks(item.question.allQuestionAnswers, item.userAnswers).toFixed(1)}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="question-answers">
                            {item.question.allQuestionAnswers.map((itm, j) => (
                              <div 
                              key={j + 1}
                              className={`question-answers-item ${item.userAnswers.find(response => response.answer_id === itm.answer_id) ? "active-answer" : ""}`}>
                                <div className="row" style={{marginBottom: '0px'}}>
                                  {item.userAnswers.find(response => response.answer_id === itm.answer_id) ? 
                                  <div className="col">
                                    {item.question.allQuestionAnswers.filter(x => x.status === 1).length > 1 ?
                                    <ImCheckboxChecked className="left-icon" />:
                                    <ImRadioChecked2 className="left-icon" />}
                                  </div> :
                                  <div className="col">
                                    {item.question.allQuestionAnswers.filter(x => x.status === 1).length > 1 ?
                                    <ImCheckboxUnchecked className="left-icon" />:
                                    <ImRadioUnchecked className="left-icon" />}
                                  </div>}
                                  <div style={{color: itm.status === 1 ? item.userAnswers.find(response => response.answer_id === itm.answer_id) ? '' : '#00438f' : ''}} className={`col ${itm.status === 1 ? "font-bold" : ""}`}>
                                    {itm.value}{itm.status === 1 && <span style={{color: itm.status === 1 ? 'green' : 'orange', marginLeft: '10px', fontSize: '15px'}}>(Correct)</span>}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>}
                </div>
              </div>
            </div>}
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
  test: state.prepareTest.test,
  questions: state.prepareTest.questions,
  testsList: state.prepareTest.testsList,
  examDetails: state.doTest.user_test_details,
  questionsAnswers: state.doTest.test_user_answers,
  testResults: state.doTest.user_test_results,
});

export default connect(mapStateToProps, { 
  addTestDetails, 
  addTestQuestion, 
  removeTestQuestion, 
  addTestQuestionAnswer, 
  removeTestQuestionAnswer, 
  clearTestTemps, 
  getTests, 
  setTestStatus, 
  loadUserTestDetails,
  addUserQuestionAnswer,
  loadUserTestResults,
  submitUserTest, })(DoTest);