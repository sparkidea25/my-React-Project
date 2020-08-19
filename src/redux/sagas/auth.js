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
    RESET_PASSWORD
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
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            onError({
                msg: 'You appear to be offline. Please check your connection.'
            })
        } else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                return;
            }
            if (response.status !== STATUS_CODE.successful) {
                onError(response.data);
                yield put(stopLoader());
            }
            else {
                yield put(setAuthorization(response.data.token));
                yield put(setPlatformType(response.data.data.role));
                success();
                yield put(stopLoader());
            }
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
function* logoutUser({ token, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.LOGOUT}`, DATA: { authorization: token } });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
        } else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(stopLoader());
                failure(response.data)
            }
            if (response.status !== STATUS_CODE.successful) {
                yield put(setAuthorization(null))
                yield put(stopLoader());
                failure(response.data)
            }
            else {
                success()
                yield put(setAuthorization(null))
                yield put(stopLoader());
            }
        }
    }
    catch (error) {
        yield put(stopLoader());
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* resetPassword({ data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.RESET_PASSWORD}`, DATA: data });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            failure({
                msg: 'You appear to be offline. Please check your connection.'
            })
        } else {
            if (response.status === STATUS_CODE.unAuthorized) {
                yield put(setAuthorization(null));
                yield put(stopLoader());
                failure(response.data)
            }
            if (response.status !== STATUS_CODE.successful) {
                yield put(setAuthorization(null))
                yield put(stopLoader());
                failure(response.data)
            }
            else {
                success()
                yield put(setAuthorization(null))
                yield put(stopLoader());
            }
        }
    }
    catch (error) {
        yield put(stopLoader());
        failure({
            msg: 'Sorry, something went wrong.'
        })
    }
}

function* AuthSaga() {
    yield all([
        takeLatest(SET_AUTHORIZATION, setUserToken),
        takeLatest(CHECK_LOGIN, checkAdminLogin),
        takeLatest(SEND_FORGOT_EMAIL, sendRecoveryMail),
        takeLatest(LOGOUT_USER, logoutUser),
        takeLatest(RESET_PASSWORD, resetPassword)
    ]);
}

export default AuthSaga;
