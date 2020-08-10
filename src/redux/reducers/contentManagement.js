import { REHYDRATE } from "redux-persist";
import {
    SET_LEAGUES,
    SET_PLATFORMS
} from '../actions';

const { updateAuthToken } = require(`../../helpers/axios`);

const initialCommonState = {
    plaformList: [],
    leagueList: []
};

const ContentReducer = (state = { ...initialCommonState }, action) => {

    switch (action.type) {
        case SET_PLATFORMS:
            return {
                ...state,
                plaformList: action.data
            };
        case SET_LEAGUES:
            return {
                ...state,
                leagueList: action.data
            };
        case REHYDRATE:
            let common = ((action || {}).payload || {}).CommonReducer || initialCommonState
            updateAuthToken(common.userToken || '');
            return {
                ...state,
                plaformList: common.plaformList,
                leagueList: common.leagueList,
                ...(action.payload || {}).common
            };
        default:
            return state;
    }
};

export default ContentReducer;