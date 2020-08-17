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
            <div className="row">
                <Field
                    name={STRINGS.EMAIL_INPUT_NAME}
                    component={Input}
                    label={STRINGS.EMAIL_LABEL}

                    config={{
                        type: "email",
                        placeholder: STRINGS.EMAIL_PLACEHOLDER
                    }}
                />
            </div>
            <InputSubmit buttonLabel={STRINGS.SEND_EMAIL} containerStyle={"text-center"} />

        </Form>
    );
};

export const ForgotReduxForm = reduxForm({
    form: "forgot",
    validate: validator,
    onSubmitFail: onSubmitFail,
})(ForgotForm);