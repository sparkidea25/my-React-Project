import { takeLatest, all, put } from "redux-saga/effects";
import {
    startLoader,
    stopLoader,
    setAuthorization,
    UPDATE_WATCH_PARTY,
    EXPORT_CSV,
    GET_WATCH_PARTY,
    GET_LEAGUES,
    GET_WATCH_PARTY_BY_ID,
    setWatchPartyInfoById,
    GET_PLATFORMS, setLeagues, setPlatforms, setWatchListParty, GET_WATCH_PARTY_VIDEO, setWatchPartyVideoList,
    setSports, GET_SPORTS, CLONE_WATCH_PARTY, GET_LIST_WATCH_PARTY, ADD_WATCH_PARTY, UPLOAD_IMAGE, GET_WATCH_PARTY_USERS, GET_WATCH_PARTY_HOSTS, SEARCH_WATCH_PARTY_HOST_USERS, ADD_REMOVE_HOSTS_REQUEST
} from '../actions';
import qs from 'query-string'
const api = require(`../../shared/api`);
const { updateAuthToken, postRequestNoAuth, postRequest, getRequest, putRequest } = require(`../../helpers`);
const { STATUS_CODE } = require(`../../shared/constants`);
const createFormData = (fileData) => {

    const data = new FormData();
    data.append("file", fileData);
    return data;
};

function* uploadFile({ data, success, failure }) {
    console.log('data upload fil;eee', data)
    const formData = createFormData(data);
    console.log('formdsata', formData)
    for (const entry of formData.entries()) {
        console.log(entry, 'entrey')
    }
    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.UPLOAD_IMAGE}`, DATA: formData, HEADER: { "Content-Type": "multipart/form-data" } });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            // failure({
            //     msg: 'You appear to be offline. Please check your connection.'
            // })
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
                success(response.data.fileUrl)
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

function* exportWatchparty({ data, success, failure }) {
    // const formData = createFormData(data);
    // formData.append("file", formData);
    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.EXPORT_CSV}`, DATA: { data: data } });
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

function* listWatchparty({ data, success, failure }) {
    try {

        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.WATCH_PARTY_LISTING}?${qs.stringify(data)}` });

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
                success(response.data.data)
                // yield put(setWatchListParty(response.data.data))
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

function* addRemoveHostsSaga({ payload, success, failure }) {
    try {

        yield put(startLoader());
        console.log(payload);
        const response = yield postRequest({
            API: api.URL.ADD_REMOVE_HOSTS,
            DATA: payload
        });
        console.log(response.data);
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
                success(response.data.data)
                // yield put(setWatchListParty(response.data.data))
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

function* getWatchPartyUsersSaga({ payload, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.GET_WATCH_PARTY_USERS}?${qs.stringify(payload)}` });

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
                success(response.data.data)
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

function* getWatchPartyHostsSaga({ payload, success, failure }) {
    try {
        yield put(startLoader());
        console.log(`${api.URL.GET_WATCH_PARTY_HOSTS}?${qs.stringify(payload)}`);
        const response = yield getRequest({ API: `${api.URL.GET_WATCH_PARTY_HOSTS}?${qs.stringify(payload)}` });

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
                success(response.data.data)
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

function* searchWatchPartyHostUsersSaga({ payload, success, failure }) {
    try {
        yield payload.loading && put(startLoader());
        console.log(`${api.URL.GET_WATCH_PARTY_HOSTS}?${qs.stringify(payload)}`);
        const response = yield getRequest({ API: `${api.URL.GET_WATCH_PARTY_HOSTS}?${qs.stringify(payload)}` });

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
                success(response.data.data)
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
        const response = yield putRequest({ API: `${api.URL.UPDATE_WATCH_PARTY}`, DATA: data });
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

function* getWatchpartyInfoById({ data, success, failure }) {
    console.log('daattaaa', data)
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.GET_WATCH_PARTY_INFO}?watchPartyId=${data}` });
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
                success(response.data.data)
                //yield put(setWatchPartyInfoById(response.data.data))
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

function* getLeagues({ success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.GET_LEAGUES}` });
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
                yield put(setLeagues(response.data.data))
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

function* getWatchPartyVideos({ token, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.GET_WATCH_PARTY_VIDEOS}`, DATA: { authorization: token } });
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
                yield put(setWatchPartyVideoList(response.data.data))
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

function* getSports({ success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.GET_SPORTS}` });
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
                yield put(setSports(response.data.data))
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

function* getPlatforms({ success, failure }) {
    try {
        yield put(startLoader());
        const response = yield getRequest({ API: `${api.URL.GET_PLATFORMS}?skip=0` });
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
                yield put(setPlatforms(response.data.data))
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

function* addWatchParty({ data, success, failure }) {
    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.ADD_WATCH_PARTY}`, DATA: data });
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

function* cloneWatchParty({ data, success, failure }) {
    console.log('data upload fil;eee', data)
    const formData = createFormData(data);
    console.log('formdsata', formData)
    for (const entry of formData.entries()) {
        console.log(entry, 'entrey')
    }
    try {
        yield put(startLoader());
        const response = yield postRequest({ API: `${api.URL.CLONE_WATCHPARTY}`, DATA: data });
        if (window.navigator.onLine === false) {
            yield put(stopLoader())
            // failure({
            //     msg: 'You appear to be offline. Please check your connection.'
            // })
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
        takeLatest(GET_LEAGUES, getLeagues),
        takeLatest(GET_PLATFORMS, getPlatforms),
        takeLatest(GET_SPORTS, getSports),
        takeLatest(GET_WATCH_PARTY_USERS, getWatchPartyUsersSaga),
        takeLatest(GET_WATCH_PARTY_HOSTS, getWatchPartyHostsSaga),
        takeLatest(SEARCH_WATCH_PARTY_HOST_USERS, searchWatchPartyHostUsersSaga),
        takeLatest(GET_LIST_WATCH_PARTY, listWatchparty),
        takeLatest(ADD_REMOVE_HOSTS_REQUEST, addRemoveHostsSaga),
        takeLatest(ADD_WATCH_PARTY, addWatchParty),
        takeLatest(UPLOAD_IMAGE, uploadFile),
        takeLatest(GET_WATCH_PARTY_VIDEO, getWatchPartyVideos),
        takeLatest(GET_WATCH_PARTY_BY_ID, getWatchpartyInfoById),
        takeLatest(CLONE_WATCH_PARTY, cloneWatchParty)
    ]);
}

export default ContentSaga;