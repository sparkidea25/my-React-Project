import React, { useEffect, useState } from 'react';
import { FieldArray, reduxForm, Field } from "redux-form";
import validator from './validator'
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { UploadForm } = require('./form')
const { onSubmitFail } = require(`../../../../helpers`);
const { Form } = require(`../../../../components/atoms/form`);

const UploadScreen = ({ allPlatforms, allLeagues, handleSubmit = () => { } }) => {

    const onsubmit = (val) => {

    }

    return (
        <>
            <Form onSubmit={handleSubmit(onsubmit)}>
                <FieldArray
                    name="WatchParty"
                    component={UploadForm}
                    allLeagues={allLeagues}
                    allPlatforms={allPlatforms}
                />
                <InputSubmit buttonLabel={'Upload'} />
            </Form>
        </>
    )
}

export const Screen = reduxForm({
    form: "uploadWatchParty",
    fields: ['name', 'surname', 'dob', 'city', 'country', 'email', 'password', 're-enterpassword'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(UploadScreen);

