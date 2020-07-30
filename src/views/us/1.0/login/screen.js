import React, { useState } from "react";
import { LoginReduxForm } from './form';
import { Helmet } from "react-helmet";
import SimpleCrypto from "simple-crypto-js";
import "./style.scss";

const { FormWrapper } = require(`../../../../components/hoc/form-wrapper`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const {
    LABELS,
    ROUTES,
    PAGE_TITLES
} = require(`../../../../shared/constants`);

export const Screen = ({
    checkLogin,
    history,
    stopLoader
}) => {
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
                    </div>

                </div>
            </div>
        </React.Fragment>
    );
}