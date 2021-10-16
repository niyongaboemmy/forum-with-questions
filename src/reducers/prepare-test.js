import { ADD_TEST_DETAILS, ADD_TEST_QUESTION, ADD_TEST_QUESTION_ANSWER, REMOVE_TEST_QUESTION, CLEAR_TEST_TEMP } from "../actions/types";

const initialState = {
  test: {
    test_title: "",
    test_duration: 1,
    status: false,
  },
  questions: [],
};

// registration
export default function prepareTest (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TEST_DETAILS:
      return {
        ...state,
        test: payload,
      };
    case ADD_TEST_QUESTION:
      return {
        ...state,
        questions: [...state.questions, payload],
      };
    case ADD_TEST_QUESTION_ANSWER:
      return {
        ...state,
        question_answers: [...state.question_answers, payload],
      };
    case REMOVE_TEST_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(item => item.question_id !== payload),
      };
    case CLEAR_TEST_TEMP:
      return {
        ...state,
        test: {
          test_title: "",
          test_duration: 1,
          status: false,
        },
        questions: [],
      };
    default:
      return state;
  }
}