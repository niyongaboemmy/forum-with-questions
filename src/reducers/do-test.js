import { 
  LOAD_USER_TEST_DETAILS,
  SUBMIT_USER_TEST,
  ADD_USER_QUESTION_ANSWER,
  LOAD_USER_TEST_RESULTS,
  LOGOUT,
 } from "../actions/types";

const initialState = {
  user_test_details: null,
  test_user_answers: [],
  user_test_results: null,
};

// registration
export default function doTest (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case LOAD_USER_TEST_DETAILS:
    let q_answers = [];
    if (payload !== null && payload !== undefined) {
      for (let ans of payload.questions) {
        q_answers = [...q_answers, {
          question_id: ans.question_id,
          answers: []
        }]
      }
    }
    return {
      ...state,
      user_test_details: payload,
      test_user_answers: q_answers
    }
  case ADD_USER_QUESTION_ANSWER:
    let newAnswers = [];
    if (state.test_user_answers.length > 0) {
      let selected_question = state.user_test_details.questions.find(que => que.question_id === payload.question_id);
      let temp = [];
      if (selected_question !== null && selected_question !== undefined && selected_question.answers.filter(it => it.status === 1).length > 1) {
        temp = state.test_user_answers;
      } else {
        for (let t of state.test_user_answers) {
          temp = t.question_id === payload.question_id ? [...temp, {
            question_id: t.question_id,
            answers: []
          }] : [...temp, t]
        }
      }
      for (let item of temp) {
        let test = item.answers.filter(itm => itm === payload.answer_id);
        if (item.question_id === payload.question_id) {
          newAnswers = [...newAnswers, {
            question_id: item.question_id,
            answers: selected_question !== null && selected_question !== undefined && selected_question.answers.filter(it => it.status === 1).length > 1 && test.length !== 0 ? item.answers.filter(itm => itm !== payload.answer_id) : [...item.answers.filter(itm => itm !== payload.answer_id), payload.answer_id]
          }]
        } else {
          newAnswers = [...newAnswers, item]
        }
      }
    }
    return {
      ...state,
      test_user_answers: newAnswers
    }
    case SUBMIT_USER_TEST:
      return {
        ...state,
        user_test_details: null,
        test_user_answers: [],
      }
    case LOAD_USER_TEST_RESULTS:
      return {
        ...state,
        user_test_results: payload,
      }
    case LOGOUT:
      return {
        ...initialState,
        loading: false,
        token: null,
      };
    default:
      return state;
  }
}