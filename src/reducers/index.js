import { combineReducers } from "redux";
import auth from "./auth";
import prepareTest from './prepare-test';

export default combineReducers({
  auth,
  prepareTest,
});