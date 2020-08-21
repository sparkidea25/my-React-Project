export const GET_ADMINS_LIST = "GET_ADMINS_LIST";
export const GET_USERS_LIST = "GET_USERS_LIST";
export const SET_ADMINS_LIST = "GET_ADMINS_LIST";
export const SET_USERS_LIST = "GET_USERS_LIST";
export const REMOVE_USER = "REMOVE_USER";

export const listAdmins = (payload, success, failure) => {
  return {
    type: GET_ADMINS_LIST,
    payload,
    success,
    failure,
  };
};

export const listUsers = (payload, success, failure) => {
  return {
    type: GET_USERS_LIST,
    payload,
    success,
    failure,
  };
};

export const removeUser = (payload, success, failure) => {
  return {
    type: REMOVE_USER,
    payload,
    success,
    failure,
  };
};
