import React, { useState } from "react";
import { ForgotReduxForm } from './form';
import { Helmet } from 'react-helmet';
import "./style.scss";
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
    history
}) => {
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
            <div className="top_rht_bg"></div>
            <div className="btm_rht_bg"></div>
            <div className={'container'}>
                <div className="header-main">
                    <span className="logo d-inline-block">
                        {/* <img src={require(`../../../../assets/logo.png`)} alt="SEF" className="img-fluid" width="200px" /> */}
                    </span>
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
                        {!emailSent && <ForgotReduxForm onSubmit={(credentials) => {
                            console.log(credentials, 'credentials')
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
                        }} />}
                        {emailSent &&
                            <form noValidate onSubmit={(value) => {
                                history.replace(ROUTES.LOGIN)
                            }}>
                                <InputSubmit
                                    buttonLabel={STRINGS.FORGOT_LOGIN}
                                    containerStyle={"text-center"} />
                            </form>
                        }
                    </div>
                </FormWrapper>
            </div>
        </React.Fragment>
    );
}