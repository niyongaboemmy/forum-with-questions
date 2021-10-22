import axios from "axios";
import { API_URL, CONFIG } from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
import { 
  ADD_TEST_DETAILS, 
  ADD_TEST_QUESTION, 
  ADD_TEST_QUESTION_ANSWER,
  REMOVE_TEST_QUESTION,
  REMOVE_TEST_QUESTION_ANSWER,
  CLEAR_TEST_TEMP,
  LOGOUT,
  GET_TESTS,
  CHANGE_TEST_STATUS,
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

export const getTests = (callback) => async (dispatch) => {
  try {
    callback(true);
    setAuthToken();
    const res = await axios.get(`${API_URL}/test`, CONFIG);
    console.log("Res: ", res);
    let temp = [];
    for (let t = res.data.length-1; t >= 0; t--) {
      temp = [...temp, res.data[t]];
    }
    dispatch({
      type: GET_TESTS,
      payload: temp,
    });
    callback(false);
  } catch (error) {
    callback(false);
    dispatch({
      type: LOGOUT,
    });
  }
};

export const setTestStatus = (test_id, status, callback) => async (dispatch) => {
  try {
    callback(true);
    setAuthToken();
    const res = await axios.patch(`${API_URL}/test/publish/${test_id}`, {
      value: status
    }, CONFIG);
    console.log("Publish: ", res);
    dispatch({
      type: CHANGE_TEST_STATUS,
      payload: {
        test_id: test_id,
        status: status
      },
    });
    callback(false);
  } catch (error) {
    console.log("er: ", {...error})
    callback(false);
  }
}