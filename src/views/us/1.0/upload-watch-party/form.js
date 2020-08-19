import React, { useEffect, useState } from 'react';

import { reduxForm, Field } from "redux-form";
const { Form } = require(`../../../../components/atoms/form`);
const { Input } = require(`../../../../components/atoms/input`);
const { Select } = require(`../../../../components/atoms/select`)

const { KeyboardDateTimePickerr } = require(`../../../../components/atoms/date-time-picker`)
const { TimePickerInputField } = require(`../../../../components/atoms/field-time-picker`)
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`)

const UForm = (props) => {

    const { fields, onAdd, onChangeField, name, extraItemsList, removeSelected, allPlatforms, allLeagues } = props

    const [leagues, setLeagues] = useState([])
    const [platforms, setPlatforms] = useState([])

    const [startDate, setStartDate] = useState({})
    const [endDate, setEndDate] = useState({})
    const [formId, setFormId] = useState([])
    useEffect(() => {
        let arr = []
        allLeagues && allLeagues.map(platform => {
            let obj = { value: platform._id, label: platform.name }
            arr.push(obj)
        })
        setLeagues(arr)
    }, [allLeagues])

    useEffect(() => {

    }, [props])

    useEffect(() => {
        let arr = []

        allPlatforms && allPlatforms.map(platform => {
            let obj = { value: platform._id, label: platform.name }
            arr.push(obj)
        })
        setPlatforms(arr)
    }, [allPlatforms])

    const addRow = () => {
        fields.push({})
    }

    return (
        <>

            <div className="container">
                <React.Fragment>
                    {
                        fields && fields.map((member, index) => {
                            return (
                                <React.Fragment key={index + ''}>
                                    <div class="page-title col-12"><h4>Add Watch Party</h4></div>
                                    <fieldset>
                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-6">
                                                <Field
                                                    name={`${member}.${STRINGS.SHOW_NAME}`}
                                                    component={Input}
                                                    placeholder={'Show'}
                                                    type={'text'}
                                                />
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <Field
                                                        name={`${member}.${STRINGS.HOST_NAME}`}
                                                        component={Input}
                                                        placeholder={'Host'}
                                                        type={"text"}

                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <Field
                                                        name={`${member}.${STRINGS.SPORTS_NAME}`}
                                                        component={Select}
                                                        options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                                                        placeholder={'Sports'}

                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <Field
                                                        name={`${member}.${STRINGS.LEAGUE_NAME}`}
                                                        component={Select}
                                                        options={leagues}
                                                        placeholder={"League"}

                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <Field
                                                        name={`${member}.${STRINGS.PLATFORM_NAME}`}
                                                        component={Select}
                                                        options={platforms}
                                                        placeholder={'Platform'}

                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <Field
                                                            name={`${member}.${STRINGS.START_TIME}`}
                                                            component={KeyboardDateTimePickerr}
                                                            placeholder={'Start Time'}
                                                            minDate={new Date()}
                                                            minTime={new Date()}
                                                            value={startDate[`${STRINGS.START_TIME}${member.parties}`]}
                                                            onChangeDate={(value) => {
                                                                setStartDate({ ...startDate, [`${STRINGS.START_TIME}${member.parties}`]: value })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <Field
                                                            name={`${member}.${STRINGS.END_TIME}`}
                                                            component={TimePickerInputField}
                                                            placeholder={'End Time'}
                                                            defaultValue={endDate[`${STRINGS.END_TIME}${member.parties}`]}
                                                            minTime={startDate[`${STRINGS.START_TIME}${member.parties}`]}
                                                            onChangeTime={value => {
                                                                setEndDate({ ...endDate, [`${STRINGS.END_TIME}${member.parties}`]: value })
                                                            }}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <div className="form-group">
                                                    <Field
                                                        name={`${member}.${STRINGS.CONTENT_LENGTH}`}
                                                        component={Input}
                                                        placeholder={'Content Length'}
                                                        config={{
                                                            type: 'number',
                                                            readOnly: true
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-6">
                                                <div className="remove_row col-12">
                                                    <img src={require("../../../../assets/img/icons/delete_icon.svg")} alt="" width="20" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12">
                                                <hr className="add_hr" />
                                            </div>
                                        </div>
                                    </fieldset>
                                </React.Fragment>
                            )
                        })}
                </React.Fragment>
            </div>
            <div className="row">
                <div className="col-md-12 text-right">
                    <button className="btn btn-lg btn-secondary btn-radius" onClick={() => addRow()}><i>+</i> Add New </button>
                </div>
            </div>
        </>
    )
}
export const UploadForm = UForm