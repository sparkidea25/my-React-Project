import React, { useState } from 'react';
import { reduxForm, Field, FieldArray } from "redux-form";
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { Input } from '../input';

const { STRINGS } = require(`../../../../shared/sef/constants/us/strings`)

export const RenderMembers = ({ fields }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
        <React.Fragment>
            <div className={'d-flex justify-content-between add-button my-2 align-tems-center'}>
                <h6>{'Add Admin'}</h6>
                <Tooltip title="Add Admin" aria-label="add">
                    <button type={'button'}
                        className={'add-admin-button rounded-circle'}
                        onClick={() => fields.push({})}>{'+'}</button>
                </Tooltip>
            </div>
            {
                fields.map((member, index) => (
                    <React.Fragment key={index}>
                        {!!index && <div className={'remove-button-wrapper'}>
                            <Tooltip title="Remove Admin" aria-label="add">
                                <button type={'button'}
                                    className={'remove-admin-button rounded-circle'}
                                    onClick={() => fields.remove(index)}>{'-'}</button>
                            </Tooltip>
                        </div>}
                        <div className="row">
                            <Field
                                name={STRINGS.NAME_INPUT}
                                component={Input}
                                label={STRINGS.NAME_LABEL}
                                type={'text'}
                                value={name}
                                placeholder={STRINGS.NAME_PLACEHOLDER}
                            // config={{
                            //     type: "text",
                            //     value: name,
                            //     placeholder: ,
                            //     onChange: event => { setName(event.target.value) }
                            // }}
                            />
                        </div>
                        <div className="row">
                            <Field
                                name={STRINGS.EMAIL_INPUT_NAME}
                                component={Input}
                                value={email}
                                label={STRINGS.EMAIL_LABEL}
                                type={'text'}
                                placeholder={STRINGS.EMAIL_PLACEHOLDER}
                            // config={{
                            //     type: "email",
                            //     placeholder: STRINGS.EMAIL_PLACEHOLDER,
                            //     onChange: event => { setEmail(event.target.value) }
                            // }}
                            />
                        </div>
                    </React.Fragment>
                ))
            }
        </React.Fragment>
    );
    return null;
}