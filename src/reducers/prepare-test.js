import { ADD_TEST_DETAILS, ADD_TEST_QUESTION, ADD_TEST_QUESTION_ANSWER, REMOVE_TEST_QUESTION, CLEAR_TEST_TEMP, GET_TESTS, CHANGE_TEST_STATUS, LOGOUT } from "../actions/types";

const initialState = {
  test: {
    test_title: "",
    test_duration: 1,
    status: false,
  },
  questions: [],
  testsList: null,
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
    case GET_TESTS:
      return {
        ...state,
        testsList: payload
      };
    case CHANGE_TEST_STATUS:
      let newArr = [];
      if (state.testsList !== null) {
        for (let item of state.testsList) {
          if (item.test_id === payload.test_id) {
            newArr = [...newArr, {
              test_id: item.test_id,
              title: item.title,
              duration: item.duration,
              published: payload.status === true ? 1 : 0,
              status: item.status,
              questions:  item.questions,
            }]
          }
          else if ((item.published === 1 && payload.status === true)) {
            newArr = [...newArr, {
              test_id: item.test_id,
              title: item.title,
              duration: item.duration,
              published: 0,
              status: item.status,
              questions:  item.questions,
            }]
          } 
          else {
            newArr = [...newArr, {
              test_id: item.test_id,
              title: item.title,
              duration: item.duration,
              published: item.published,
              status: item.status,
              questions:  item.questions,
            }]
          }
        }
      }
      return {
        ...state,
        testsList: newArr
      };
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