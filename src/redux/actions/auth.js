export const SET_AUTHORIZATION = 'SET_AUTHORIZATION';
export const CHECK_LOGIN = 'CHECK_LOGIN';
export const SEND_FORGOT_EMAIL = 'SEND_FORGOT_EMAIL';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_PLATFORM_TYPE = 'SET_PLATFORM_TYPE';
export const RESET_PASSWORD = "RESET_PASSWORD";

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

export const logout = (token, success, failure) => {
    return {
        type: LOGOUT_USER,
        token,
        success,
        failure
    }
};
export const resetPassword = (data, success, failure) => {
    return {
        type: RESET_PASSWORD,
        data,
        success,
        failure
    }
};