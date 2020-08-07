import { takeLatest, all, put } from "redux-saga/effects";
import {
    startLoader,
    stopLoader,
    setAuthorization,
    UPDATE_WATCH_PARTY,
    EXPORT_CSV,
    GET_WATCH_PARTY
} from '../actions';
const api = require(`../../shared/api`);
const { updateAuthToken, postRequestNoAuth, postRequest, getRequest } = require(`../../helpers`);
const { STATUS_CODE } = require(`../../shared/constants`);

const createFormData = (fileData) => {
    console.log(fileData)
    const data = new FormData();
    data.append("file", fileData.file);
    return data;
};

function* exportWatchparty({ data, success, failure }) {
    const formData = createFormData(data);
    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.EXPORT_CSV}`, DATA: formData });
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
                success(response.data)
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

function* listWatchparty({ success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.WATCH_PARTY_LISTING}` });
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
                success(response.data)
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

function* updateWatchparty({ data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.UPDATE_WATCH_PARTY}`, DATA: data });
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
                success(response.data)
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

function* ContentSaga() {
    yield all([
        takeLatest(EXPORT_CSV, exportWatchparty),
        takeLatest(GET_WATCH_PARTY, listWatchparty),
        takeLatest(UPDATE_WATCH_PARTY, updateWatchparty),
    ]);
}

export default ContentSaga;