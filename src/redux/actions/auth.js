export const SET_AUTHORIZATION = 'SET_AUTHORIZATION';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const SEND_FORGOT_EMAIL = 'SEND_FORGOT_EMAIL';
export const REMEMBER_ME = 'REMEMBER_ME';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_PLATFORM_TYPE = 'SET_PLATFORM_TYPE';
export const SAVE_CHAMPIONSHIP = 'SAVE_CHAMPIONSHIP';

export const setAuthorization = (userToken) => {
    return {
        type: SET_AUTHORIZATION,
        userToken
    };
};

export const setPlatformType = (role) => {
    return {
        type: SET_PLATFORM_TYPE,
        role
    }
};

export const saveChampionship = (data) => {
    return {
        type: SAVE_CHAMPIONSHIP,
        data
    }
}

export const checkLogin = (credentials, success, onError) => {
    return {
        type: CHECK_LOGIN,
        credentials,
        success,
        onError
    }
};

export const sendForgotEmail = (email, success, error) => {
    return {
        type: SEND_FORGOT_EMAIL,
        email,
        success,
        error
    }
};

export const rememberMe = credentials => {
    return {
        type: REMEMBER_ME,
        credentials
    }
};

export const logout = (token, success) => {
    return {
        type: LOGOUT_USER,
        token,
        success
    }
};