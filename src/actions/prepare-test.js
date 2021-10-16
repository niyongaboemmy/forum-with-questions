import { 
  ADD_TEST_DETAILS, 
  ADD_TEST_QUESTION, 
  ADD_TEST_QUESTION_ANSWER,
  REMOVE_TEST_QUESTION,
  REMOVE_TEST_QUESTION_ANSWER,
  CLEAR_TEST_TEMP,
} from "./types";

/**
 * Login the user
 * @param {*} data
 * @param {*} history
 */

export const addTestDetails = (data) => (dispatch) => {
  dispatch({
    type: ADD_TEST_DETAILS,
    payload: data,
  });
};

export const addTestQuestion = (data) => (dispatch) => {
  dispatch({
    type: ADD_TEST_QUESTION,
    payload: data,
  });
};

export const removeTestQuestion = (question_id) => (dispatch) => {
  dispatch({
    type: REMOVE_TEST_QUESTION,
    payload: question_id,
  });
};

export const addTestQuestionAnswer = (data) => (dispatch) => {
  dispatch({
    type: ADD_TEST_QUESTION_ANSWER,
    payload: data,
  });
};

export const removeTestQuestionAnswer = (answer_id) => (dispatch) => {
  dispatch({
    type: REMOVE_TEST_QUESTION_ANSWER,
    payload: answer_id,
  });
};

export const clearTestTemps = () => (dispatch) => {
  dispatch({
    type: CLEAR_TEST_TEMP,
  });
};