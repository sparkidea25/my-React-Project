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
            <div className="top_rht_bg"></div>
            <div className="btm_rht_bg"></div>
            <div className={'container'}>
                <div className="header-main">
                    <span className="logo d-inline-block">
                        {/* <img src={require(`../../../../assets/logo.png`)} alt="SEF" className="img-fluid" width="200px" /> */}
                    </span>
                </div>
                <FormWrapper>
                    <div className="col-md-12 position-relative">
                        <div className="form_title text-center">
                            <SnackbarWrapper
                                visible={openSnackBar}
                                onClose={() => setOpenSnackbar(false)}
                                variant={snackbarData.variant}
                                message={snackbarData.message}
                            />
                            {/* <i><img src="/static/media/forgot_icon.3c8499a5.png" alt="" className="img-fluid" width="130px" />
                            </i> */}
                            <h3 className="mb-4">{LABELS.login}</h3>
                        </div>
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
                </FormWrapper>
            </div>
        </React.Fragment>
    );
}