import { REHYDRATE } from "redux-persist";
import {
    SET_LEAGUES,
    SET_PLATFORMS,
    SET_WATCH_PARTY_LISTING,
    SET_SPORTS,
    SET_WATCH_PARTY_VIDEOS
} from '../actions';

const { updateAuthToken } = require(`../../helpers/axios`);

const initialCommonState = {
    plaformList: [],
    leagueList: [],
    sportList: [],
    watchPartyList: {},
    watchPartyVideosList: []
};

const ContentReducer = (state = { ...initialCommonState }, action) => {
    switch (action.type) {
        case SET_PLATFORMS:
            return {
                ...state,
                plaformList: action.data
            };
        case SET_LEAGUES:
            console.log(action)
            return {
                ...state,
                leagueList: action.data
            };
        case SET_SPORTS:
            return {
                ...state,
                sportList: action.data
            };
        case SET_WATCH_PARTY_LISTING:
            return {
                ...state,
                watchPartyList: action.data
            };
        case SET_WATCH_PARTY_VIDEOS:
            return {
                ...state,
                watchPartyVideosList: action.data
            }
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