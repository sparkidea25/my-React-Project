import { takeLatest, all, put } from "redux-saga/effects";
import {
  startLoader,
  stopLoader,
  GET_ADMINS_LIST,
  GET_USERS_LIST,
  REMOVE_USER,
} from "../actions";

import { getRequest } from "../../helpers";

function* listUsers({ payload, success, failure }) {
  try {
    //for dummy data
    yield put(startLoader());
    // const response = yield getRequest({ API: `` });
    if (payload.filter === 2) {
      ADMIN
        ? success({
            adminListing: ADMIN.slice(payload.skip, payload.limit),
            totalCount: ADMIN.length,
          })
        : failure({ msg: "No data found" });
    } else {
      USERS
        ? success({
            userListing: USERS.slice(payload.skip, payload.limit),
            totalCount: USERS.length,
          })
        : failure({ msg: "No data found" });
    }
    yield put(stopLoader());
  } catch (err) {
    yield put(stopLoader());
    failure({
      msg: "Sorry, something went wrong.",
    });
  }
}

function* removeUser({ payload, success, failure }) {
  try {
    //for dummy data
    yield put(startLoader());
    success({ status: " ", msg: `${payload} successfully removed` });
    // failure({status: " ", msg: `error removing ${payload}`});
    USERS = USERS.filter((user) => user.username !== payload);
    yield put(stopLoader());
  } catch (err) {
    failure({
      msg: "Sorry, something went wrong.",
    });
  }
}

function* userManagementSaga() {
  yield all([
    takeLatest(GET_ADMINS_LIST, listUsers),
    takeLatest(GET_USERS_LIST, listUsers),
    takeLatest(REMOVE_USER, removeUser),
  ]);
}

export default userManagementSaga;

function* responseChecker(response, success, failure) {
  //   if (window.navigator.onLine === false) {
  //     yield put(stopLoader());
  //     failure({
  //       msg: "You appear to be offline. Please check your connection.",
  //     });
  //   } else {
  //     if (response.status === STATUS_CODE.unAuthorized) {
  //       yield put(setAuthorization(null));
  //       yield put(stopLoader());
  //       failure(response.data);
  //     }
  //     if (response.status !== STATUS_CODE.successful) {
  //       yield put(setAuthorization(null));
  //       yield put(stopLoader());
  //       failure(response.data);
  //     } else {
  //       success(response.data);
  //       yield put(setLeagues(response.data.data));
  //       yield put(stopLoader());
  //     }
  //   }
  console.log(response);
}

const ADMIN = [
  {
    first_name: "Gold",
    last_name: "Roger",
    username: "pirateKing",
    email: "roger@yahoo.com",
    phone: "+91-9876543210",
    home_town: "grand line",
    time_zone: "EST",
    age: 33,
    date_added: "8-20-2020",
    last_active: "1 hour ago",
  },
  {
    first_name: "Edward",
    last_name: "Newgate",
    username: "whiteBeard",
    email: "newgate@yahoo.com",
    phone: "+44-8463-6547",
    home_town: "London",
    time_zone: "GMT +1",
    age: 30,
    date_added: "8-02-2020",
    last_active: "5 hour ago",
  },
];

let USERS = [
  {
    first_name: "Ragnar",
    last_name: "Lodbrok",
    username: "viking",
    email: "ragnar@yahoo.com",
    phone: "+45-9876-4321",
    home_town: "ragnar",
    time_zone: "GMT +2",
    age: 33,
    date_added: "8-20-2020",
    last_active: "online",
  },
    {
      first_name: "Alice",
      last_name: "Wordsworth",
      username: "wordsworth",
      email: "wordsworth@yahoo.com",
      phone: "+44-8463-6547",
      home_town: "London",
      time_zone: "GMT +1",
      age: 27,
      date_added: "8-02-2020",
      last_active: "5 mins ago",
    },
    {
      first_name: "Ragnar",
      last_name: "Lodbrok",
      username: "viking001",
      email: "ragnar@yahoo.com",
      phone: "+45-9876-4321",
      home_town: "ragnar",
      time_zone: "GMT +2",
      age: 33,
      date_added: "8-20-2020",
      last_active: "online",
    },
    {
      first_name: "Alice",
      last_name: "Wordsworth",
      username: "wordsworth106",
      email: "wordsworth@yahoo.com",
      phone: "+44-8463-6547",
      home_town: "London",
      time_zone: "GMT +1",
      age: 27,
      date_added: "8-02-2020",
      last_active: "5 mins ago",
    },
    {
      first_name: "Ragnar",
      last_name: "Lodbrok",
      username: "viking101",
      email: "ragnar@yahoo.com",
      phone: "+45-9876-4321",
      home_town: "ragnar",
      time_zone: "GMT +2",
      age: 33,
      date_added: "8-20-2020",
      last_active: "online",
    },
    {
      first_name: "Alice",
      last_name: "Wordsworth",
      username: "wordsworth101",
      email: "wordsworth@yahoo.com",
      phone: "+44-8463-6547",
      home_town: "London",
      time_zone: "GMT +1",
      age: 27,
      date_added: "8-02-2020",
      last_active: "5 mins ago",
    },
];
