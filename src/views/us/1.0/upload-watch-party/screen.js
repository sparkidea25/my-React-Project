import React, { useEffect, useState } from 'react';
import { FieldArray, reduxForm, Field } from "redux-form";
import validator from './validator'
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { UploadForm } = require('./form')
const { onSubmitFail, convertToESTTimeZone } = require(`../../../../helpers`);
const { Form } = require(`../../../../components/atoms/form`);

const UploadScreen = ({ allPlatforms, exportWatchParty, allLeagues, handleSubmit = () => { } }) => {

    const onsubmit = (credentials) => {
        console.log(credentials)

        credentials.WatchParty.map(party => {
            if (party.startTime) {
                party.startTime = convertToESTTimeZone(party.startTime);
                party.endTime = convertToESTTimeZone(party.endTime);
            }
        })
        exportWatchParty(credentials.WatchParty, () => { }, () => { })
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
    fields: ['parties'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(UploadScreen);

