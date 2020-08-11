export const EXPORT_CSV = "EXPORT_CSV"
export const GET_WATCH_PARTY = "GET_WATCH_PARTY"
export const UPDATE_WATCH_PARTY = "UPDATE_WATCH_PARTY"
export const GET_LEAGUES = "GET_LEAGUES"
export const GET_PLATFORMS = "GET_PLATFORMS"
export const SET_PLATFORMS = "SET_PLATFORMS"
export const SET_LEAGUES = "SET_LEAGUES"
export const SET_SPORTS = "SET_SPORTS"
export const GET_SPORTS = "GET_SPORTS"
export const SET_WATCH_PARTY_LISTING = "SET_WATCH_PARTY_LISTING"

export const exportWatchParty = (data, success, failure) => {
    return {
        type: EXPORT_CSV,
        data,
        success,
        failure
    }
}

export const listWatchParty = (data, success, failure) => {
    return {
        type: GET_WATCH_PARTY,
        data,
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
export const getLeagues = (success, failure) => {
    return {
        type: GET_LEAGUES,

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
export const setWatchListParty = (data) => {
    return {
        type: SET_WATCH_PARTY_LISTING,
        data
    }
}
export const getSports = (success, failure) => {
    return {
        type: GET_SPORTS,
        success, failure
    }
}
export const setSports = (success, failure) => {
    return {
        type: SET_SPORTS,
        success, failure
    }
}
