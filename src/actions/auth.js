import { STORE_AUTH, LOGOUT, USER_LOADED, TOOGLE_NAV, ACCOUNT_CATEGORY, USER_ID } from "./types";
import axios from "axios";
// import { API_URL, CONFIG } from "../utils/api";
// import { setAlert } from "./alert";
import { API_URL, CONFIG } from "../utils/api";

import setAuthToken from "../utils/setAuthToken";
import { TOKEN_NAME } from "../utils/api";

/**
 * LogoutTheUser()
 * log out the user
 */
export const LogoutTheUser = (history) => (dispatch) => {
  localStorage.removeItem(TOKEN_NAME);
  localStorage.removeItem(ACCOUNT_CATEGORY);
  dispatch({
    type: LOGOUT,
  });
};

/**
 * LogoutTheUser()
 * log out the user
 */
export const toogleNav = () => (dispatch) => {
  dispatch({
    type: TOOGLE_NAV,
  });
};

/**
 * LogoutTheUser()
 * log out the user
 */
export const LoadUserDetails = (callback) => async (dispatch) => {
  let route = localStorage.getItem(ACCOUNT_CATEGORY) === "admin" || localStorage.getItem(ACCOUNT_CATEGORY) === undefined ? "/admin/current/logedin/" : "/user/logedin/" + localStorage.getItem(USER_ID);
  console.log("User category: ", localStorage.getItem(ACCOUNT_CATEGORY))
  try {
    callback(true);
    setAuthToken();
    const res = await axios.get(`${API_URL}${route}`, CONFIG);
    console.log("Res admin: ", res);

    dispatch({
      type: USER_LOADED,
      payload: localStorage.getItem(ACCOUNT_CATEGORY) === "admin" || localStorage.getItem(ACCOUNT_CATEGORY) === undefined ? res.data.data : res.data,
    });

    callback(false);
  } catch (error) {
    callback(false);
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(ACCOUNT_CATEGORY);
    dispatch({
      type: LOGOUT,
    });
  }
};

/**
 * Login the user
 * @param {*} data
 * @param {*} history
 */
export const LoginSuccess = (data, history) => (dispatch) => {
  dispatch({
    type: STORE_AUTH,
    payload: data,
  });

  // Redirect user
  LoadUserDetails(() => history.push("./topics"));
  // ;
};
export const storeAccountCategory = (data) => (dispatch) => {
  dispatch({
    type: ACCOUNT_CATEGORY,
    payload: data,
  });
};

export const storeUserId = (data) => (dispatch) => {
  dispatch({
    type: USER_ID,
    payload: data,
  });
};