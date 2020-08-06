export const EXPORT_CSV = "EXPORT_CSV"
export const GET_WATCH_PARTY = "GET_WATCH_PARTY"
export const UPDATE_WATCH_PARTY = "UPDATE_WATCH_PARTY"
export const exportWatchParty = (data) => {
    return {
        type: EXPORT_CSV,
        data
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