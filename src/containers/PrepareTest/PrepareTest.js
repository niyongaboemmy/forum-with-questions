import React, { Component, Fragment } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import axios from "axios";
import { AiOutlineLogin, AiOutlineUser, } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { API_URL, CONFIG } from "../../utils/api";
import { TOKEN_NAME } from "../../utils/api";
import { connect } from "react-redux";
import { addTestDetails, addTestQuestion, removeTestQuestion, addTestQuestionAnswer, removeTestQuestionAnswer, clearTestTemps } from "../../actions/prepare-test";
import TestQuestions from './TestQuestions/TestQuestions';
import TestQuestionsList from './TestQuestionsList/TestQuestionsList';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../shared/Loading/Loading';
import Modal from '../../shared/Modal/Modal'
import { MdAdd } from 'react-icons/md';

export class PrepareTest extends Component {
  state = {
    modal: false,
    addQuestionTab: false,
    loading: false,
  }
  submitExam = async () => {
    if (this.props.test.test_title === "") {
      return alert("Please fill test title");
    }
    if (this.props.test.test_duration === "") {
      return alert("Please fill test test duration");
    }
    if (this.props.questions.length === 0) {
      this.setState({ addQuestionTab: true });
      return alert("Please add questions");
    }
    const body = {
      test_id: uuidv4(),
      title: this.props.test.test_title,
      duration: this.props.test.test_duration,
      questions: this.props.questions
    }
    this.setState({ loading: true});
    try {
      const res = await axios.post(`${API_URL}/test`, body);
      this.props.clearTestTemps();
      this.setState({ loading: false});
      console.log("Submitted!", res);
      alert(res.data.msg);
    } catch (error) {
      this.setState({ loading: false});
      console.log("Submit err: ", {...error})
    }
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
                      <div className="my-title" style={{fontSize: '23px'}}>Prepare test</div>
                    </div>
                    <div className="col xl6 l6 m6 s12">
                      <Link to="/tests" className="waves-effect waves-light right my-btn bg-color hoverable main-btn">View list</Link>
                    </div>
                  </div>
                  {this.state.loading === true ? <center><Loading msg="Please wait" /></center> :
                  this.props.test.status === false ?
                  <div className="row" style={{backgroundColor: '#fff', paddingTop: '10px', paddingBottom: '10px', borderRadius: '4px', margin: '0px'}}>
                    <div className="col s12 m5 l5 xl5">
                      <span>Test title</span>
                      <input 
                      onChange={(e) => {
                        this.props.addTestDetails({
                          test_title: e.target.value,
                          test_duration: this.props.test.test_duration,
                          status: this.props.test.status,
                        });
                      }}
                      type="text" 
                      value={this.props.test.test_title} className="validate browser-default my-input" />
                    </div>
                    <div className="col s12 m5 l5 xl5">
                      <span>Test duration in minutes</span>
                      <input 
                      onChange={(e) => {
                        this.props.addTestDetails({
                          test_title: this.props.test.test_title,
                          test_duration: e.target.value,
                          status: this.props.test.status,
                        });
                      }}
                      type="number" 
                      value={this.props.test.test_duration} className="validate browser-default my-input" />
                    </div>
                    <div className="col s12 m2 l2 xl2" style={{paddingTop: '25px'}}>
                      <button 
                      onClick={() => this.props.addTestDetails({
                        test_title: this.props.test.test_title,
                        test_duration: this.props.test.test_duration,
                        status: true,
                      })} 
                      className="waves-effect waves-light right my-btn bg-color hoverable main-btn">Save changes</button>
                    </div>
                  </div> :
                  <div className="row" style={{backgroundColor: '#fff', paddingTop: '10px', paddingBottom: '10px', borderRadius: '4px', margin: '0px'}}>
                    <div className="col s12 m5 l5 xl5">
                      <span>Test title</span>
                      <div style={{fontWeight: 'bolder'}}>{this.props.test.test_title}</div>
                    </div>
                    <div className="col s12 m5 l5 xl5">
                      <span>Test duration in minutes</span>
                      <div style={{fontWeight: 'bolder'}}>{this.props.test.test_duration}</div>
                    </div>
                    <div className="col s12 m2 l2 xl2">
                      <button 
                      onClick={() => this.props.addTestDetails({
                        test_title: this.props.test.test_title,
                        test_duration: this.props.test.test_duration,
                        status: false,
                      })} 
                      className="waves-effect waves-light right my-btn bg-color hoverable main-btn">Edit</button>
                    </div>
                  </div>}
                  {this.state.loading === false &&
                  <div className="my-tab">
                    <div className="row">
                      <div className="col s3 m3 l3 xl3">
                        <div onClick={() => {this.setState({ modal: true })}} className={`${this.state.addQuestionTab === true ? "active-tab" : "inactive-tab"} add-btn`}><MdAdd className="my-add-icon" /> Add question</div>
                      </div>
                      <div className="col s3 m3 l3 xl3">
                        <div onClick={() => this.setState({ addQuestionTab: false })} className={`${this.state.addQuestionTab === true ? "inactive-tab" : "active-tab"}`}>List of Questions ({this.props.questions.length})</div>
                      </div>
                    </div>
                  </div>}
                  {this.state.loading === false &&
                  <>
                    {this.state.addQuestionTab === true ?
                    <TestQuestions /> : <TestQuestionsList />}
                    {this.state.addQuestionTab === false &&
                    <div className="row">
                      <div className="col s12">
                        <button onClick={() => this.submitExam()} className="waves-effect waves-light my-btn bg-color hoverable main-btn right" style={{marginTop: '20px', marginBottom: '20px'}}>Submit test preparation</button>
                      </div>
                    </div>}
                  </>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.modal === true &&
        <Modal
        close={() => this.setState({ modal: false })}
        backDrop={true}
        closeBackdrop={false}
        theme="blue"
        title="Create new question"
        className="open max-width animate-in animate__animated animate__bounceIn"
        >
          <TestQuestions />
        </Modal>}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  test: state.prepareTest.test,
  questions: state.prepareTest.questions,
});

export default connect(mapStateToProps, { addTestDetails, addTestQuestion, removeTestQuestion, addTestQuestionAnswer, removeTestQuestionAnswer, clearTestTemps })(PrepareTest);