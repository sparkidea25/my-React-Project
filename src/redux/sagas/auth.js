import { takeLatest, all, put } from "redux-saga/effects";

import {
    SET_AUTHORIZATION,
    CHECK_LOGIN,
    SEND_FORGOT_EMAIL,
    setAuthorization,
    startLoader,
    stopLoader,
    setPlatformType,
    LOGOUT_USER,
    saveChampionship
} from '../actions';

const api = require(`../../shared/api`);
const { updateAuthToken, postRequestNoAuth, postRequest } = require(`../../helpers`);
const { STATUS_CODE } = require(`../../shared/constants`);

function* setUserToken({ userToken }) {
    try {
        yield updateAuthToken(userToken);
    }
    catch (error) {
        return;
    }
}

function* checkAdminLogin({ credentials, success, onError }) {
    try {
        yield put(startLoader())
        const response = yield postRequestNoAuth({ API: `${api.URL.LOGIN}`, DATA: credentials });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            onError(response.data);
            yield put(stopLoader());
        }
        else {
            yield put(setAuthorization(response.data.data.token));
            yield put(setPlatformType(response.data.data.role));
            success();
            yield put(stopLoader());
        }
    }
    catch (error) {
        return;
    }
}

function* sendRecoveryMail({ email, success, error }) {
    try {
        yield put(startLoader());
        const response = yield postRequestNoAuth({ API: `${api.URL.FORGOT_PASSWORD}`, DATA: email });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            error(response.data);
            yield put(stopLoader());
        }
        else {
            success(response.data);
            yield put(stopLoader());
        }
    }
    catch (error) {
        return;
    }
}

function* logoutUser({ token, success }) {

    try {
        const response = yield postRequest({ API: `${api.URL.LOGOUT}`, DATA: {} });
        if (response.status === STATUS_CODE.unAuthorized) {
            yield put(setAuthorization(null));
            return;
        }
        if (response.status !== STATUS_CODE.successful) {
            yield put(setAuthorization(null))
        }
        else {
            success();
        }
    }
    catch (error) {
        return;
    }
}

function* AuthSaga() {
    yield all([
        takeLatest(SET_AUTHORIZATION, setUserToken),
        takeLatest(CHECK_LOGIN, checkAdminLogin),
        takeLatest(SEND_FORGOT_EMAIL, sendRecoveryMail),
        takeLatest(LOGOUT_USER, logoutUser)
    ]);
}

export default AuthSaga;
