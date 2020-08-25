import { takeLatest, all, put } from "redux-saga/effects";

import {
  startLoader,
  stopLoader,
  setAuthorization,
  GET_ADMINS_LIST,
  GET_USERS_LIST,
  REMOVE_USER,
  UPDATE_USER
} from "../actions";
<<<<<<< HEAD
import { getRequest, putRequest } from "../../helpers";
=======
import { getRequest, deleteRequest } from "../../helpers";
>>>>>>> ce3c9bf8f307419326c9e1b705710122a30322b1
const api = require(`../../shared/api`);
const { STATUS_CODE } = require(`../../shared/constants`);

function* getAdminList({ payload, success, failure }) {
  try {
    yield put(startLoader());
    const response = yield getRequest({
      API: `${api.URL.GET_ADMIN_LIST}?skip=${payload.skip}&limit=${payload.limit}`,
    });
    yield responseChecker(response, success, failure);
  } catch (err) {
    yield put(stopLoader());
    failure({
      msg: "Sorry, something went wrong.",
    });
  }
}

function* listUsers({ payload, success, failure }) {
  try {
    yield put(startLoader());
    const response = yield getRequest({
      API: `${api.URL.GET_USERS_LIST}?${payload}`,
    });
    yield responseChecker(response, success, failure);
  } catch (err) {
    yield put(stopLoader());
    failure({
      msg: "Sorry, something went wrong.",
    });
  }
}

<<<<<<< HEAD
function* updateUser({ data, success, failure }) {
  try {
    yield put(startLoader());
    const response = yield putRequest({ API: `${api.URL.UPDATE_USER}`, DATA: data });
=======
function* removeUser({ payload, success, failure }) {
  try {
    //for dummy data
    yield put(startLoader());
    const response = yield deleteRequest({
      API: `${api.URL.DELETE_USER}/${payload}`,
    });
>>>>>>> ce3c9bf8f307419326c9e1b705710122a30322b1
    yield responseChecker(response, success, failure);
  } catch (err) {
    yield put(stopLoader());
    failure({
      msg: "Sorry, something went wrong.",
    });
  }
}
<<<<<<< HEAD

// function* removeUser({ payload, success, failure }) {
//   try {
//     //for dummy data
//     yield put(startLoader());
//     success({ status: " ", msg: `${payload} successfully removed` });
//     // failure({status: " ", msg: `error removing ${payload}`});
//     USERS = USERS.filter((user) => user.username !== payload);
//     yield put(stopLoader());
//   } catch (err) {
//     failure({
//       msg: "Sorry, something went wrong.",
//     });
//   }
// }

=======
>>>>>>> ce3c9bf8f307419326c9e1b705710122a30322b1

function* userManagementSaga() {
  yield all([
    takeLatest(GET_ADMINS_LIST, getAdminList),
    takeLatest(GET_USERS_LIST, listUsers),
<<<<<<< HEAD
    takeLatest(UPDATE_USER, updateUser),
    // takeLatest(REMOVE_USER, removeUser),
=======
    takeLatest(REMOVE_USER, removeUser),
>>>>>>> ce3c9bf8f307419326c9e1b705710122a30322b1
  ]);
}

export default userManagementSaga;

function* responseChecker(response, success, failure) {
  if (window.navigator.onLine === false) {
    yield put(stopLoader());
    failure({
      msg: "You appear to be offline. Please check your connection.",
    });
  } else {
    if (response.status === STATUS_CODE.unAuthorized) {
      yield put(setAuthorization(null));
      yield put(stopLoader());
      failure(response.data);
    }
    if (response.status !== STATUS_CODE.successful) {
      yield put(setAuthorization(null));
      yield put(stopLoader());
      failure(response.data);
    } else {
      success(response.data);
      yield put(stopLoader());
    }
  }
}
