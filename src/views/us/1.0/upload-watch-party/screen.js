import React, { useEffect, useState } from 'react';
import { FieldArray, reduxForm } from "redux-form";
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { UploadForm } = require('./form')
const { validator } = require('./validator')
const { Form } = require(`../../../../components/atoms/form`);
export const UploadScreen = ({ allPlatforms, allLeagues, handleSubmit = () => { } }) => {

    const [formId, setFormId] = useState([])

    const addRow = () => {
        formId.push({ parties: formId.length + 1 })
        setFormId([...formId])
    }
    const onsubmit = (val) => {
        console.log(val, 'val')
    }
    return (
        <>
            <button onClick={() => addRow()}>Add New</button>
            <Form onSubmit={handleSubmit(onsubmit)}>
                <FieldArray
                    name="WatchParty"
                    component={UploadForm}
                    onAdd={addRow}
                    fields={formId}
                    allLeagues={allLeagues}
                    allPlatforms={allPlatforms}
                />
                <InputSubmit buttonLabel={'Upload'} />
            </Form>
        </>
    )
}

const reduxFormFunction = reduxForm({
    form: "uploadWatchParty",
    fields: ['name', 'surname', 'dob', 'city', 'country', 'email', 'password', 're-enterpassword'],
    // onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(UploadScreen);

export const Screen = reduxFormFunction