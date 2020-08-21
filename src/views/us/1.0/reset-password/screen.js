import React, { useState } from "react";
import { reduxForm, Field } from "redux-form";
import {
    useHistory
} from 'react-router-dom';
import validator from "./validator";
const queryString = require('query-string');
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { Form } = require(`../../../../components/atoms/form`);
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { Input } = require(`../../../../components/atoms/input`);
const { onSubmitFail } = require(`../../../../helpers`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`);
const {
    ROUTES
} = require(`../../../../shared/constants`);

const ResetScreen = ({ handleSubmit, resetPassword }) => {
    let history = useHistory();
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const parsed = queryString.parse(history.location.search)

    const [passwordIsSet, changePasswordIsSet] = useState(false)
    const onSubmit = (credentials) => {
        let data = {
            password: credentials.password,
            token: parsed.token
        }

        resetPassword(data, (response) => {
            // setSnackBarData({
            //     variant: response.status ? 'success' : 'error',
            //     message: response.msg
            // });
            // setOpenSnackbar(true)
            changePasswordIsSet(true)
        }, (response) => {

            // setSnackBarData({
            //     variant: response.status ? 'success' : 'error',
            //     message: response.msg
            // });
            // setOpenSnackbar(true)
        })
    }
    return (
        <div>
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
                        {!passwordIsSet ? <Form onSubmit={
                            handleSubmit(onSubmit)}>
                            <div className="text-center forgot_info">
                                <h4>Reset Password</h4>
                                <p>{STRINGS.PASSWORD_RESPONSE_MESSAGE}</p>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <Field
                                        name={STRINGS.PASSWORD_INPUT_NAME}
                                        component={Input}
                                        config={{
                                            type: "password",
                                            placeholder: STRINGS.PASSWORD_PLACEHOLDER
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="btn-full mt-4">
                                <InputSubmit buttonLabel={STRINGS.RESET_PASSWORD} />
                            </div>
                        </Form>

                            : <div className="form_title text-center">
                                <h4 className="d-block text-center pt-3" style={{ color: 'white' }}>Congratulations!</h4>
                                <p style={{ color: 'white' }}>{STRINGS.PASSWORD_SUCCESSFUL}</p>
                                <div className="d-block text-center pt-3" onClick={() => { history.push(ROUTES.LOGIN); }}>
                                    <a href="javascript:void(0);" className="forgot_pwd">Go to Login</a>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export const Screen = reduxForm({
    form: "Reset",
    fields: ['email', 'password'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(ResetScreen);
