import React, { useEffect, useState } from 'react';

import { Field } from "redux-form";
const { Input } = require(`../../../../components/atoms/input`);
const { Select } = require(`../../../../components/atoms/select`)

const { KeyboardDateTimePickerr } = require(`../../../../components/atoms/date-time-picker`)
const { TimePickerInputField } = require(`../../../../components/atoms/field-time-picker`)
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`);
const { diff_minutes, changeEndDate } = require(`../../../../helpers`);

const UForm = (props) => {

    const { fields, name, allPlatforms, allLeagues, uploadImage } = props

    const [leagues, setLeagues] = useState([])
    const [platforms, setPlatforms] = useState([])

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [contentLength, setContentLength] = useState({})

    useEffect(() => {
        let arr = []
        allLeagues && allLeagues.map(platform => {
            let obj = { value: platform._id, label: platform.name }
            arr.push(obj)
        })
        setLeagues(arr)
    }, [allLeagues])

    useEffect(() => {
        fields.push({})
    }, [])

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

    const onDeleteRow = (index) => {
        fields.remove(index)
    }

    useEffect(() => {

    }, [endDate])


    return (
        <>

            <React.Fragment>
                {
                    fields && fields.map((member, index) => {
                        return (
                            <React.Fragment key={index + ''}>

                                <fieldset className="add_formList">
                                    <div className="form-row">
                                        <div className="col-md-3 col-sm-6">
                                            <label>{STRINGS.SHOW}</label>
                                            <Field
                                                name={`${member}.contentName`}
                                                component={Input}
                                                placeholder={'Show'}
                                                type={'text'}

                                            />
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <label>{STRINGS.HOST}</label>
                                            <div className="form-group">
                                                <Field
                                                    name={`${member}.${STRINGS.HOST_NAME}`}
                                                    component={Input}
                                                    placeholder={'Host'}
                                                    type={"text"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-3 col-sm-6">
                                            <label>{STRINGS.SPORTS} </label>
                                            <div className="form-group">
                                                <Field
                                                    name={`${member}.${STRINGS.SPORTS_NAME}`}
                                                    component={Select}
                                                    options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                                                    placeholder={'Sports'}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-3 col-sm-6">
                                            <label>{STRINGS.LEAGUE}</label>
                                            <div className="form-group">
                                                <Field
                                                    name={`${member}.${STRINGS.LEAGUE_NAME}`}
                                                    component={Select}
                                                    options={leagues}
                                                    placeholder={"League"}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-3 col-sm-6">
                                            <label>{STRINGS.PLATFORM} </label>
                                            <div className="form-group">
                                                <Field
                                                    name={`${member}.${STRINGS.PLATFORM_NAME}`}
                                                    component={Select}
                                                    options={platforms}
                                                    placeholder={'Platform'}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <label>{STRINGS.START}</label>
                                            <div className="form-group">
                                                <Field
                                                    name={`${member}.${STRINGS.START_TIME}`}
                                                    component={KeyboardDateTimePickerr}
                                                    placeholder={'Start Time(EST.)'}
                                                    minDate={new Date()}
                                                    minTime={new Date()}
                                                    value={startDate && startDate[`${member}.${STRINGS.START_TIME}`] ? startDate[`${member}.${STRINGS.START_TIME}`] : null}
                                                    onChangeDate={(value) => {
                                                        if (endDate && endDate[`${member}.${STRINGS.END_TIME}`]) {
                                                            setEndDate({ ...endDate, [`${member}.${STRINGS.END_TIME}`]: null })
                                                        }
                                                        setStartDate({ ...startDate, [`${member}.${STRINGS.START_TIME}`]: value })
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-3 col-sm-6">
                                            <label>{STRINGS.END}</label>
                                            <div className="form-group">
                                                <Field
                                                    name={`${member}.${STRINGS.END_TIME}`}
                                                    component={TimePickerInputField}
                                                    placeholder={'End Time(EST.)'}
                                                    defaultValue={endDate && endDate[`${member}.${STRINGS.END_TIME}`] ? endDate[`${member}.${STRINGS.END_TIME}`] : null}
                                                    minTime={startDate && startDate[`${member}.${STRINGS.START_TIME}`] ? startDate[`${member}.${STRINGS.START_TIME}`] : null}
                                                    onChangeTime={value => {
                                                        let convertedTime = changeEndDate(startDate && startDate[`${member}.${STRINGS.START_TIME}`] ? startDate && startDate[`${member}.${STRINGS.START_TIME}`] : new Date(), value)

                                                        setEndDate({ ...endDate, [`${member}.${STRINGS.END_TIME}`]: convertedTime })
                                                        if (startDate && startDate[`${member}.${STRINGS.START_TIME}`]) {

                                                            let min = diff_minutes(startDate[`${member}.${STRINGS.START_TIME}`], convertedTime)
                                                            setContentLength({ ...contentLength, [`${member}.${STRINGS.CONTENT_LENGTH}`]: min })
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-3">
                                            <label>{STRINGS.CONTENT}</label>
                                            <div className="form-group">
                                                <Field
                                                    name={`${member}.${STRINGS.CONTENT_LENGTH}`}
                                                    component={Input}
                                                    placeholder={'Content Length'}
                                                    config={{
                                                        type: 'number',
                                                        readOnly: true,
                                                        value: contentLength && contentLength[`${member}.${STRINGS.CONTENT_LENGTH}`] ? contentLength[`${member}.${STRINGS.CONTENT_LENGTH}`] : null
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-1">
                                            <div className="d-flex">
                                                <button type='button' className="btn add_row btn-transparent" onClick={() => addRow()}><img src={require('../../../../assets/img/icons/add_icon.svg')} width="24px" /></button>
                                                {index > 0 ? <div className="remove_row" onClick={() => onDeleteRow(index)}>
                                                    <img src={require("../../../../assets/img/icons/delete_icon.svg")} alt="" width="20" />
                                                </div> : ''}
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
        </>
    )
}



export const UploadForm = UForm