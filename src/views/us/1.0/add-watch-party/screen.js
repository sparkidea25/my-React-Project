import React, { useState } from "react";

import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SimpleCrypto from "simple-crypto-js";
import { connect } from 'react-redux';
import "./style.scss";

import validator from "./validator";
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { Form } = require(`../../../../components/atoms/form`);
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { Input } = require(`../../../../components/atoms/input`);
const { Select } = require(`../../../../components/atoms/select`)
const { DatePickerInput } = require(`../../../../components/atoms/date-picker`)
const { TimePickerInputField } = require(`../../../../components/atoms/field-time-picker`)
const { onSubmitFail } = require(`../../../../helpers`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`)
const { ROUTES } = require(`../../../../shared/constants`);

const WatchPartyForm = ({
    handleSubmit = () => { },
    initialize,

    onSubmit = () => { }
}) => {
    const [fields, setFields] = useState({
        "contentName": "",
        "host": "",
        "startTime": "",
        "sports": "",
        "league": "",
        "platform": "",
        "contentLength": 0,
        "endTime": "",
        show: ""
    })
    const onChangeField = (type, value) => {
        setFields({ ...fields, [type]: value })
    }
    return (
        <Form onSubmit={
            handleSubmit(onSubmit)}>
            <div className="row">
                <Field
                    name={STRINGS.SHOW_NAME}
                    component={Input}
                    placeholder={STRINGS.SHOW_NAME}
                    type={'text'}
                    config={{
                        onChange: event => onChangeField('show', event.target.value)
                    }}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.HOST_NAME}
                    component={Input}
                    placeholder={STRINGS.HOST_NAME}
                    config={{
                        type: "text",
                        onChange: event => onChangeField('host', event.target.value),
                    }}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.SPORTS_NAME}
                    component={Select}
                    placeholder={STRINGS.SPORTS_NAME}
                    config={{
                        // onChange: event => onChangeField(event.target.value),
                    }}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.LEAGUE_NAME}
                    component={Select}
                    placeholder={STRINGS.LEAGUE_NAME}
                    config={{
                        // onChange: event => onPasswordChange(event.target.value),
                    }}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.PLATFORM_NAME}
                    component={Select}
                    placeholder={STRINGS.PLATFORM_NAME}
                    config={{
                        // onChange: event => onPasswordChange(event.target.value),
                    }}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.PICK_DATE}
                    component={DatePickerInput}
                    placeholder={STRINGS.PICK_DATE}
                    config={{
                        // onChange: event => onPasswordChange(event.target.value),
                    }}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.START_TIME}
                    component={TimePickerInputField}
                    placeholder={STRINGS.START_TIME}
                    config={{
                        // onChange: event => onPasswordChange(event.target.value),
                    }}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.END_TIME}
                    component={TimePickerInputField}
                    placeholder={STRINGS.END_TIME}
                    config={{
                        // onChange: event => onPasswordChange(event.target.value),
                    }}
                />
            </div>
            <div className="row">
                <Field
                    name={STRINGS.CONTENT_LENGTH}
                    component={Input}
                    placeholder={STRINGS.CONTENT_LENGTH}
                    config={{
                        // onChange: event => onPasswordChange(event.target.value),
                    }}
                />
            </div>
            <InputSubmit buttonLabel={STRINGS.BUTTON_LABEL_LOGIN} buttonStyle={"float-sm-right mt-3"} />
        </Form>
    );
};

const mapStateToProps = (state, props) => {
    var _secretKey = "some-unique-key";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    return {

    };
}

const reduxFormFunction = reduxForm({
    form: "login",
    fields: ['email', 'password'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(WatchPartyForm);

export const Screen = connect(mapStateToProps, null)(reduxFormFunction);