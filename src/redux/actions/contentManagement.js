export const EXPORT_CSV = "EXPORT_CSV"
export const GET_WATCH_PARTY = "GET_WATCH_PARTY"
export const UPDATE_WATCH_PARTY = "UPDATE_WATCH_PARTY"
export const GET_LEAGUES = "GET_LEAGUES"
export const GET_PLATFORMS = "GET_PLATFORMS"
export const SET_PLATFORMS = "SET_PLATFORMS"
export const SET_LEAGUES = "SET_LEAGUES"

export const exportWatchParty = (data, success, failure) => {
    return {
        type: EXPORT_CSV,
        data,
        success,
        failure
    }
}

export const listWatchParty = (success, failure) => {
    return {
        type: GET_WATCH_PARTY,
        success,
        failure
    }
}
export const updateWatchParty = (data, success, failure) => {
    return {
        type: UPDATE_WATCH_PARTY,
        data,
        success,
        failure
    }
}
export const getLeagues = (data, success, failure) => {
    return {
        type: GET_LEAGUES,
        data,
        success,
        failure
    }
}
export const getPlatforms = (data, success, failure) => {
    return {
        type: GET_PLATFORMS,
        data,
        success,
        failure
    }
}
export const setPlatforms = (data) => {
    return {
        type: SET_PLATFORMS,
        data
    }
}
export const setLeagues = (data) => {
    return {
        type: SET_LEAGUES,
        data
    }
}