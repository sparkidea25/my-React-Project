export const EXPORT_CSV = "EXPORT_CSV"
export const CREATE_WATCH_PARTY = "CREATE_WATCH_PARTY"

export const exportWatchParty = (data) => {
    return {
        type: EXPORT_CSV,
        data
    }
}

export const createWatchParty = (data) => {
    return {
        type: CREATE_WATCH_PARTY,
        data
    }
}