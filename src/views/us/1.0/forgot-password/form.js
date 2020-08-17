import React from "react";
import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import "./style.scss";

import validator from "./validator";
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { Form } = require(`../../../../components/atoms/form`);
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { Input } = require(`../../../../components/atoms/input`);
const { onSubmitFail } = require(`../../../../helpers`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`)
const { ROUTES } = require(`../../../../shared/constants`);

const ForgotForm = ({
    handleSubmit,
    onSubmit = () => { }
}) => {
    return (
        <Form onSubmit={
            handleSubmit(onSubmit)}>
            <div className="text-center forgot_info">
                <h4>Forgot Password?</h4>
                <p>Enter your email address, We will send you a link to reset your password.</p>
            </div>
            <div className="row">
                <Field
                    name={STRINGS.EMAIL_INPUT_NAME}
                    component={Input}
                    //label={STRINGS.EMAIL_LABEL}

                    config={{
                        type: "email",
                        placeholder: STRINGS.EMAIL_PLACEHOLDER
                    }}
                />
            </div>
            <div className="btn-full mt-4">
                <InputSubmit buttonLabel={STRINGS.SEND_EMAIL} />
            </div>
        </Form>
    );
};

export const ForgotReduxForm = reduxForm({
    form: "forgot",
    validate: validator,
    onSubmitFail: onSubmitFail,
})(ForgotForm);