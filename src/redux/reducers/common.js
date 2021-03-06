import { REHYDRATE } from "redux-persist";
import {
    SET_AUTHORIZATION,
    CHECK_LOGIN,
    SET_PLATFORM_TYPE,
    STOP_LOADER,
    START_LOADER,
    SET_TIMEZONES
} from '../actions';

const { updateAuthToken } = require(`../../helpers/axios`);

const initialCommonState = {
    userToken: '',
    platformType: null,
    loader: false,
    TimeZones: []
};

const CommonReducer = (state = { ...initialCommonState }, action) => {

    switch (action.type) {
        case SET_AUTHORIZATION:
            return {
                ...state,
                userToken: action.userToken
            };
        case START_LOADER:
            return {
                ...state,
                loader: true
            }
        case STOP_LOADER:
            return {
                ...state,
                loader: false
            }
        case SET_PLATFORM_TYPE:
            return {
                ...state,
                platformType: action.role
            }
        case CHECK_LOGIN:
            return {
                ...state,
            }
        case SET_TIMEZONES:
            return {
                ...state,
                TimeZones: action.data.data
            }
        case REHYDRATE:
            let common = ((action || {}).payload || {}).CommonReducer || initialCommonState
            updateAuthToken(common.userToken || '');
            return {
                ...state,
                userToken: common.userToken,
                platformType: common.platformType,
                TimeZones: common.TimeZones,
                ...(action.payload || {}).common
            };
        default:
            return state;
    }
};

export default CommonReducer;