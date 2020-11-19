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
export const GET_LIST_WATCH_PARTY = "GET_LIST_WATCH_PARTY"
export const ADD_WATCH_PARTY = "ADD_WATCH_PARTY"
export const UPLOAD_IMAGE = "UPLOAD_IMAGE"
export const GET_WATCH_PARTY_VIDEO = "GET_WATCH_PARTY_VIDEO"
export const SET_WATCH_PARTY_VIDEOS = "SET_WATCH_PARTY_VIDEOS"
export const GET_WATCH_PARTY_BY_ID = "GET_WATCH_PARTY_BY_ID"
export const GET_WATCH_PARTY_USERS = "GET_WATCH_PARTY_USERS"
export const GET_WATCH_PARTY_HOSTS = "GET_WATCH_PARTY_HOSTS";
export const ADD_REMOVE_HOSTS_REQUEST = "ADD_REMOVE_HOSTS_REQUEST";
export const SEARCH_WATCH_PARTY_HOST_USERS = "SEARCH_WATCH_PARTY_HOST_USERS"
export const SET_WATCH_PARTY_BY_ID = "SET_WATCH_PARTY_BY_ID";
export const CLONE_WATCH_PARTY = 'CLONE_WATCH_PARTY';

export const exportWatchParty = (data, success, failure) => {
    return {
        type: EXPORT_CSV,
        data,
        success,
        failure
    }
}
export const getWatchPartyUsers = (payload, success, failure) => {
    return {
        type: GET_WATCH_PARTY_USERS,
        payload,
        success,
        failure
    }
}

export const getWatchPartyHosts = (payload, success, failure) => {
    return {
        type: GET_WATCH_PARTY_HOSTS,
        payload,
        success,
        failure
    }
}

export const addRemoveHostsRequest = (payload, success, failure) => {
    return {
        type: ADD_REMOVE_HOSTS_REQUEST,
        payload,
        success,
        failure
    }
}

export const searchWatchPartyHostUsers = (payload, success, failure) => {
    return {
        type: SEARCH_WATCH_PARTY_HOST_USERS,
        payload,
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
export const listPastWatchParty = (data, success, failure) => {
    return {
        type: GET_LIST_WATCH_PARTY,
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
export const setWatchPartyVideoList = (data) => {
    return {
        type: SET_WATCH_PARTY_VIDEOS,
        data
    }
}
export const getPlatforms = (success, failure) => {
    return {
        type: GET_PLATFORMS,
        success,
        failure
    }
}

export const getWatchPartyInfo = (data, success, failure) => {
    return {
        type: GET_WATCH_PARTY_BY_ID,
        data,
        success,
        failure
    }
}
export const setWatchPartyInfoById = (data) => {
    return {
        type: SET_WATCH_PARTY_BY_ID,
        data
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
export const getWatchPartyVideos = (token, success, failure) => {
    return {
        type: GET_WATCH_PARTY_VIDEO,
        token,
        success,
        failure
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
        success,
        failure
    }
}
export const setSports = (success, failure) => {
    return {
        type: SET_SPORTS,
        success, failure
    }
}
export const addWatchParty = (data, success, failure) => {
    return {
        type: ADD_WATCH_PARTY,
        data,
        success, failure
    };
};

export const uploadImage = (data, success, failure) => {
    return {
        type: UPLOAD_IMAGE,
        data,
        success,
        failure
    };
};

export const cloneWatchParty = (data, success, failure) => {
    return {
        type: CLONE_WATCH_PARTY,
        data,
        success,
        failure
    };
};
