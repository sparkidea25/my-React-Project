import React, { useState, useEffect } from "react";
import { LoginReduxForm } from './form';
import { Helmet } from "react-helmet";
import "./style.scss";
import {
    useHistory
} from 'react-router-dom';
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const {
    ROUTES,
    PAGE_TITLES
} = require(`../../../../shared/constants`);

export const Screen = ({
    checkLogin,

    stopLoader
}) => {
    let history = useHistory();
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    const [credentials, setCredentials] = useState({ email: '', password: '' });

    return (
        <React.Fragment>
            <Helmet>
                <title>{PAGE_TITLES.login}</title>
            </Helmet>
            <div className="front-form d-flex align-items-center ">
                <div className={'container'}>
                    <div className="login-form">
                        <div className="logo-header text-center mb-4">
                            <img src={require(`../../../../assets/img/logo.png`)} alt="SEF" width="325px" className="img-fluid" />
                        </div>
                        <SnackbarWrapper
                            visible={openSnackBar}
                            onClose={() => setOpenSnackbar(false)}
                            variant={snackbarData.variant}
                            message={snackbarData.message}
                        />

                        <LoginReduxForm onSubmit={(credentials) => {
                            checkLogin({
                                email: credentials.email,
                                password: credentials.password
                            }, () => {
                                stopLoader();

                                history.push(ROUTES.DASHBOARD);
                            },
                                (response) => {
                                    setSnackBarData({
                                        variant: response.status ? 'success' : 'error',
                                        message: response.msg
                                    });
                                    setOpenSnackbar(true)
                                });
                        }}
                            credentials={credentials}
                            onEmailChange={(value) => setCredentials({
                                ...credentials,
                                email: value
                            })}
                            onPasswordChange={(value) => setCredentials({
                                ...credentials,
                                password: value
                            })}
                        />
                        <div className="d-block text-center pt-3" onClick={() => { history.push(ROUTES.FORGOT_PASSWORD); }}>
                            <a href="javascript:void(0);" className="forgot_pwd">Forgot Password</a>
                        </div>
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
}