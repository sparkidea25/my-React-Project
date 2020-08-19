import React, { useState } from "react";
import { ForgotReduxForm } from './form';
import { Helmet } from 'react-helmet';
import "./style.scss";
import {
    useHistory
} from 'react-router-dom';
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { FormWrapper } = require(`../../../../components/hoc/form-wrapper`);
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`);
const {
    LABELS,
    ROUTES,
    PAGE_TITLES
} = require(`../../../../shared/constants`);


export const Screen = ({
    sendForgotEmail,

}) => {
    let history = useHistory();
    const [emailSent, setEmailSent] = useState(false);
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    })
    return (
        <React.Fragment>
            <Helmet>
                <title>{PAGE_TITLES.forgot}</title>
            </Helmet>
            <div className="front-form d-flex align-items-center ">
                <div className={'container'}>
                    <div className="login-form">
                        <div className="logo-header text-center mb-4">
                            <img src={require(`../../../../assets/img/logo.png`)} alt="SEF" width="325px" className="img-fluid" />
                        </div>
                        <FormWrapper>
                            <div className="col-md-12">
                                <div className="form_title text-center">
                                    <SnackbarWrapper
                                        visible={openSnackBar}
                                        onClose={() => setOpenSnackbar(false)}
                                        variant={snackbarData.variant}
                                        message={snackbarData.message}
                                    />
                                    <i>
                                        {/* <img src={emailSent ? 
                                    require(`../../../../assets/email-sent.png`) : require(`../../../../assets/forgot.png`)} alt="" className="img-fluid" width="130px" /> */}
                                    </i>
                                    <h3>{emailSent ? LABELS.checkYourMail : LABELS.forgotPassword}</h3>
                                    {emailSent ? <p>{STRINGS.EMAIL_RESPONSE_MESSAGE}</p> : <p>{STRINGS.SHARE_EMAIL_MESSAGE}</p>}
                                </div>
                                {!emailSent && <><ForgotReduxForm onSubmit={(credentials) => {

                                    sendForgotEmail({
                                        email: credentials.email,
                                    }, (response) => {
                                        setEmailSent(true);

                                    }, (response) => {
                                        setSnackBarData({
                                            variant: response.status ? 'success' : 'error',
                                            message: response.msg
                                        });
                                        setOpenSnackbar(true)
                                    })
                                }} />
                                    <div className="d-block text-center pt-3" onClick={() => { history.push(ROUTES.LOGIN); }}>
                                        <a href="javascript:void(0);" className="forgot_pwd">Log In?</a>
                                    </div></>
                                }
                                {emailSent &&
                                    <>
                                        <h3 className="d-block text-center pt-3" style={{ color: 'white' }}>Check your mail!</h3>
                                        <p style={{ color: 'white' }}>{STRINGS.EMAIL_RESPONSE_MESSAGE}</p>
                                        <div className="d-block text-center pt-3" onClick={() => { history.push(ROUTES.LOGIN); }}>
                                            <a href="javascript:void(0);" className="forgot_pwd">Back to Login</a>
                                        </div></>
                                }
                            </div>

                        </FormWrapper>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}