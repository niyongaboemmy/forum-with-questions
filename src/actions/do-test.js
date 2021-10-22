import axios from "axios";
import { API_URL, CONFIG } from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
import { 
  LOAD_USER_TEST_DETAILS,
  SUBMIT_USER_TEST,
  ADD_USER_QUESTION_ANSWER,
  LOGOUT,
  LOAD_USER_TEST_RESULTS,
} from "./types";

/**
 * Do test
 * @param {*} data
 * @param {*} history
 */

export const loadUserTestDetails = (user_id, loadUserTestResults, callback) => async (dispatch) => {
  try {
    callback(true);
    setAuthToken();
    const res = await axios.get(`${API_URL}/test`, CONFIG);
    let test = res.data.find(itm => itm.published === 1);
    if (test !== null && test !== undefined) {
      loadUserTestResults(user_id, test.test_id, callback);
    }
    console.log("Res: ", res);
    dispatch({
      type: LOAD_USER_TEST_DETAILS,
      payload: res.data.find(itm => itm.published === 1),
    });
    callback(false);
  } catch (error) {
    callback(false);
    dispatch({
      type: LOGOUT,
    });
  }
};

export const addUserQuestionAnswer = (question_id, answer_id) => (dispatch) => {
  dispatch({
    type: ADD_USER_QUESTION_ANSWER,
    payload: {
      question_id: question_id,
      answer_id: answer_id
    },
  });
};

export const submitUserTest = (test, callback) => async (dispatch) => {
  try {
    callback("loading");
    setAuthToken();
    const res = await axios.post(`${API_URL}/dotest`, test, CONFIG);
    console.log("SUBMIT TEST: ", res);
    dispatch({
      type: SUBMIT_USER_TEST,
      payload: test,
    });
    callback("1");
  } catch (error) {
    console.log("er SUBMIT TEST: ", {...error})
    callback("0");
  }
}

export const loadUserTestResults = (user_id, test_id, callback) => async (dispatch) => {
  try {
    callback(true);
    setAuthToken();
    const res = await axios.get(`${API_URL}/dotest/user/${user_id}/${test_id}`, CONFIG);
    console.log("Marks: ", res);
    dispatch({
      type: LOAD_USER_TEST_RESULTS,
      payload: res.data
    });
    callback(false);
  } catch (error) {
    console.log("cc err: ", {...error})
    callback(false);
    dispatch({
      type: LOGOUT,
    });
  }
};
