import { combineReducers } from "redux";
import auth from "./auth";
import prepareTest from './prepare-test';
import doTest from './do-test';

export default combineReducers({
  auth,
  prepareTest,
  doTest,
});