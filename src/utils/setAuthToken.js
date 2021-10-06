import axios from "axios";
// import { TOKEN } from "./api";
import store from "../store";

const setAuthToken = () => {
  const TOKEN_STATE = store.getState().auth.token;
  if (TOKEN_STATE !== null) {
    axios.defaults.headers.common["x-auth-token"] = TOKEN_STATE;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;