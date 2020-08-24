export const START_LOADER = 'START_LOADER';
export const STOP_LOADER = 'STOP_LOADER';
export const GET_TIMEZONES = 'GET_TIMEZONES';
export const SET_TIMEZONES = 'SET_TIMEZONES'
export const startLoader = () => {
    return {
        type: START_LOADER,
    };
}

export const stopLoader = () => {
    return {
        type: STOP_LOADER,
    };
}

export const getAllTimeZones = (data, success, failure) => {
    return {
        type: GET_TIMEZONES,
        data, success,
        failure
    };
}

export const setAllTimeZones = (data) => {
    return {
        type: SET_TIMEZONES,
        data
    };
}