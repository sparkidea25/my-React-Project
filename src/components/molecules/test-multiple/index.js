import React from 'react';
import { reduxForm, Field, reset, FieldArray, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import './styles.scss';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../config/default`);
const { STRINGS } = require(`../../../../shared/sef/constants/us/strings`);
const { Input } = require(`../../atoms/input`);
// const { } = require(`../../atoms`)
const { Checkbox } = require(`../../atoms/checkbox`);

export const AnswerList = (props) => {

    return (
        <FieldArray name="members" component={renderForm} {...props} />
    )
}

const renderForm = (props) => {
    let { fields, onChoseAnswer, rightOptionList = [] } = props;
    if (fields.length === 0) {
        fields.push({})
        fields.push({})
        fields.push({})
        fields.push({})
    }
    else if (fields.length === 2) {
        fields.push({});
        fields.push({});
    }
    return (
        <div className="question_sec">
            <div className='row justify-content-center align-items-center title_qus'>
                <label className="col-lg-11 col-sm-10 col-9">Answer Options</label>
                <label className='col-lg-1 col-sm-2 col-3 text-center px-0'>Right<br />Answer</label>
            </div>
            <div className="question_group">
                {
                    fields.map((members, index) => {
                        return (
                            <div className="row" key={index + ''}>
                                <Field
                                    name={`${members}.${STRINGS.ANSWER_OPTION_LIST}`}
                                    component={Input}
                                    widthStyle={"col-lg-11 col-sm-10 col-9"}
                                    type={'text'}
                                />
                                <Field
                                    multiple={true}
                                    index={index}
                                    lastFieldIndex={fields.length - 1}
                                    name={`${STRINGS.RIGHT_OPTION_LIST}`}
                                    component={Checkbox}
                                    widthStyle={"col-lg-1 col-sm-2 col-3 text-center checkbox-style"}
                                    useDefaultProps={false}
                                    config={{
                                        onChange: event => onChoseAnswer(event.target.checked, index),
                                        checked: rightOptionList.includes(index)
                                    }}
                                />
                                {index > 3 && <div className={'remove-button-wrapper'}>
                                    <Tooltip title={'Remove Option'} aria-label="add">
                                        <button type={'button'}
                                            className={'remove-admin-button rounded-circle'}
                                            onClick={() => fields.remove(index)}>{STRINGS.MINUS}</button>
                                    </Tooltip>
                                </div>}
                            </div>
                        )
                    })
                }
            </div>
            {fields.length < 6 && <button
                className='d-block mx-auto btn btn-lg btn-outline-primary mt-1 mb-4'
                disabled={fields.length > 5}
                onClick={(e) => {
                    if (fields.length > 5) {
                        return;
                    }
                    else {
                        fields.push({});
                        e.preventDefault();
                    }
                }}>
                Add More Option
            </button>}
        </div>
    )
}