import React, { Component } from 'react'
import axios from "axios";
import { AiOutlineLogin, AiOutlineUser, } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { API_URL, CONFIG } from "../../../utils/api";
import { TOKEN_NAME } from "../../../utils/api";
import { connect } from "react-redux";
import { addTestDetails, addTestQuestion, removeTestQuestion, addTestQuestionAnswer, removeTestQuestionAnswer } from "../../../actions/prepare-test";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdCheckCircle, MdRadioButtonUnchecked, MdDeleteForever } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

class TestQuestionsList extends Component {
  state = {
    loading: false,
  }
  render() {
    return (
      <div class="row" style={{paddingTop: '10px', margin: '0px'}}>
        <div className="col s12" style={{padding: '0px'}}>
          <div className="h3 font-bold">Questions list</div>
          {this.props.questions.length === 0 ? 
          <span>No questions added!</span> :
          this.props.questions.map((item, i) => (
            <div key={i + 1}className="question-item">
              <div className="row">
                <div className="col s11">
                  <div className="font-bold" dangerouslySetInnerHTML={{__html: item.title}}></div>
                  <div dangerouslySetInnerHTML={{__html: item.description}}></div>
                </div>
                <div className="col s1" style={{fontSize: '36px', color: '#a80000', cursor: 'pointer'}}>
                  <MdDeleteForever className="right" onClick={() => this.props.removeTestQuestion(item.question_id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  test: state.prepareTest.test,
  questions: state.prepareTest.questions,
});

export default connect(mapStateToProps, { addTestDetails, addTestQuestion, removeTestQuestion, addTestQuestionAnswer, removeTestQuestionAnswer })(TestQuestionsList);
