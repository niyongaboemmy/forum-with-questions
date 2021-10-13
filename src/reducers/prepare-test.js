import { ADD_TEST_DETAILS, ADD_TEST_QUESTION, ADD_TEST_QUESTION_ANSWER } from "../actions/types";

const initialState = {
  test: null,
  questions: [],
  question_answers: [],
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
    default:
      return state;
  }
}