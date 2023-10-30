// import { put, all, fork } from "redux-saga/effects";
// import { push } from "redux-first-history";
// import axios from "axios";
// import authSaga from "./authSaga";

// axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

// export default function* rootSaga() {
//   yield put(push(process.env.REACT_APP_BASIC_SERVER_URL));
//   yield all([fork(authSaga)]);
// }

import { all, fork } from "redux-saga/effects";
import axios from "axios";
import authSaga from "./authSaga";

// import dotenv from "dotenv";

// dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_BASIC_SERVER_URL;

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
