import React from 'react';
import { reduxForm, Field, reset, FieldArray, change as changeField } from "redux-form";
import { connect } from 'react-redux';
import {
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel
} from '@material-ui/core';
import './styles.scss';
const { defaultConfig: { PLATFORM, LOCATION } } = require(`../../../../config/default`);
const { STRINGS } = require(`../../../../shared/sef/constants/us/strings`);
const { Input } = require(`../../atoms/input`);
const { RadioButtons } = require(`../../atoms/radio-button`);


export const AnswerListRadio = (props) => {
    const [selectedOption, setSelectedOption] = React.useState('')
    const setOption = (value) => {
        setSelectedOption(value)
    }
    return (
        <FieldArray name="members" {...props} selectedOption={selectedOption} setOption={setOption} component={renderForm} />
    )
}

const renderForm = (props) => {
    let { fields, answerType, onChoseAnswer, answerRadioOption, rightOptionList, selectedOption, setOption } = props;
    let expectedLength = !answerType ? 2 : 4;
    if (fields.length === 0) {
        if (!answerType) {
            fields.push({});
            fields.push({});
        }
        else if (answerType === 1) {
            fields.push({});
            fields.push({});
            fields.push({});
            fields.push({});
        }
    }
    else if (fields.length !== expectedLength) {
        fields = [];
        if (expectedLength < fields.length) {
            for (let index = expectedLength; index > expectedLength; index--) {
                fields.pop({})
            }
        }
        else {
            for (let index = 0; index < expectedLength; index++) {
                fields.push({})
            }
        }
    }

    return (

        <div className="question_sec">
            <div className='row justify-content-center align-items-center title_qus'>
                <label className="col-lg-11 col-sm-10 col-9">Answer Options</label>
                <label className="col-lg-1 col-sm-2 col-3 px-0 text-center">Right Answer</label>
            </div>
            <div className='row'>
                <div className="question_group col-lg-11 col-10">
                    {
                        fields.map((members, index) => {
                            return (
                                <div className="row" key={index + ''}>
                                    <Field
                                        name={`members[${index}].${STRINGS.ANSWER_OPTION_LIST}`}
                                        component={Input}
                                        widthStyle={"col-lg-12"}
                                        type='text'
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <Field
                    name={`${STRINGS.RIGHT_OPTION_LIST}`}
                    handleValueChange={(value) => {
                        setOption(value);
                        onChoseAnswer(value - 1)
                    }}
                    selectedValue={selectedOption ? selectedOption - 1 : rightOptionList ? rightOptionList[0] : ''}
                    component={RadioButtons}
                    radioGroupItems={answerRadioOption}
                    widthStyle={"col-lg-1 col-2 px-0 text-center"}
                />
            </div>
        </div>
    )
}
