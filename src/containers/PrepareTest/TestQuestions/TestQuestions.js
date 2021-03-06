import React, { Component } from 'react'
import { connect } from "react-redux";
import { addTestDetails, addTestQuestion, removeTestQuestion, addTestQuestionAnswer, removeTestQuestionAnswer } from "../../../actions/prepare-test";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdCheckCircle, MdRadioButtonUnchecked, MdDeleteForever } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // ES6
// import EditorToolbar, { modules, formats } from "../../../components/EditorToolbar/EditorToolbar";
import EditorComponent from "../../../components/EditorComponent/EditorComponent";

class TestQuestions extends Component {
  state = {
    loading: false,
    question_title: "",
    question_description: "",
    question_answers: [],
    temp_question_answer: "",
    temp_question_answer_status: false,
  }
  clearQuestion = () => {
    this.setState({
      question_title: "",
      question_description: "",
      question_answers: [],
    })
  }
  clearQuestionAnswerTemp = () => {
    this.setState({
      temp_question_answer: "",
      temp_question_answer_status: false,
    })
  }
  addAnswer = () => {
    if (this.state.temp_question_answer === "") {
      return alert("Please fill answer!");
    } else {
      this.setState({
        question_answers: [...this.state.question_answers, {
          value: this.state.temp_question_answer,
          status: this.state.temp_question_answer_status
        }]
      });
      this.clearQuestionAnswerTemp();
    }
  }
  removeAnswer = (answer) => {
    this.setState({
      question_answers: this.state.question_answers.filter(itm => itm.value !== answer)
    })
  }
  clearQuestionDetails = () => {
    this.setState({
      question_title: "",
      question_description: "",
      question_answers: [],
      temp_question_answer: "",
      temp_question_answer_status: false,
    });
  }
  saveQuestion = () => {
    if (this.state.question_title === "") {
      return alert("Please fill question title");
    } else if (this.state.question_description === "") {
      return alert("Please fill question description");
    } else if (this.state.question_answers.length === 0) {
      return alert("Please add question answers");
    } else {
      let obj = {
        question_id: uuidv4(),
        title: this.state.question_title,
        description: this.state.question_description,
        answers: this.state.question_answers
      }
      this.props.addTestQuestion(obj);
      this.clearQuestionDetails();
    }
  }

  handleQuestion_description = (value) => {
    this.setState({ question_description: value});
  }
  handleTemp_question_answer = (value) => {
    this.setState({ temp_question_answer: value});
  }
  render() {
    return (
      <div class="row" style={{paddingTop: '10px', margin: '0px'}}>
        <div className="col s12" style={{padding: '0px'}}>
          <div className="h3 font-bold">Question description</div>
          <div className="question-item">
            <div className="row">
              <div className="col s12">
                <span className="font-bold">Question title</span>
                <input 
                onChange={(e) => {
                  this.setState({ question_title: e.target.value});
                }}
                type="text" value={this.state.question_title} className="validate browser-default my-input" />
              </div>
              <div className="col s12" style={{marginTop: '10px'}}>
                <span className="font-bold">Question description</span>
                <EditorComponent
                  id="question_description"
                  item={this.state.question_description}
                  handleItem={this.handleQuestion_description} />
              </div>
            </div>
          </div>
          <div className="question-item">
            <div className="row">
              <div className="col s12">
                <div className="h3 font-bold">Question answers</div>
                <div className="row">
                  <div className="col s10 m10 l10 xl10">
                    <span>Answer</span>
                    <EditorComponent
                      id="temp_question_answer"
                      item={this.state.temp_question_answer}
                      handleItem={this.handleTemp_question_answer} />
                  </div>
                  <div className="col s2 m2 l2 xl2">
                    <div className="check-boxes" onClick={() => this.setState({ temp_question_answer_status: !this.state.temp_question_answer_status })}>
                      {this.state.temp_question_answer_status === false ?
                      <MdCheckBoxOutlineBlank /> :
                      <MdCheckBox />
                      }
                    </div>
                    <button onClick={() => this.addAnswer()} className="waves-effect waves-light my-btn bg-color hoverable main-btn">Save</button>
                  </div>
                </div>
                {this.state.question_answers.length > 0 &&
                <div className="question-answers-container" style={{marginTop: '20px'}}>
                  <span className="font-bold">List of answers</span>
                  {this.state.question_answers.map((item, i) => (
                    <div key={i + 1} className="question-answer-item">
                      <div className="row">
                        {item.status === true ?
                        <div className="col s1 m1 l1 xl1" style={{fontSize: '36px', color: '#0057bb'}}>
                          <MdCheckCircle />
                        </div> :
                        <div className="col s1 m1 l1 xl1" style={{fontSize: '36px', color: '#cecece'}}>
                          <MdRadioButtonUnchecked />
                        </div>}
                        <div className="col s10 m10 l10 xl10">
                          <div className="font-bold" style={{margin: '5px'}} dangerouslySetInnerHTML={{__html: item.value}}></div>
                          <div style={{marginLeft: '5px'}}>Status: {item.status === true ? "Correct" : "Incorrect"}</div>
                        </div>
                        <div className="col s1 m1 l1 xl1" style={{fontSize: '36px', color: '#a80000', cursor: 'pointer'}}>
                          <MdDeleteForever className="right" onClick={() => this.removeAnswer(item.value)} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>}
              </div>
            </div>
            <div className="row" style={{marginBottom: '200px'}}>
              <div className="col s12">
                <button onClick={() => this.saveQuestion()} className="waves-effect waves-light my-btn bg-color hoverable main-btn right" style={{marginTop: '20px', marginBottom: '20px'}}>Save whole question</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  test: state.prepareTest.test,
});

export default connect(mapStateToProps, { addTestDetails, addTestQuestion, removeTestQuestion, addTestQuestionAnswer, removeTestQuestionAnswer })(TestQuestions);
