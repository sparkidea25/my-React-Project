import React, { useEffect, useState } from 'react';

import { Field } from "redux-form";
const { Input } = require(`../../../../components/atoms/input`);
const { Select } = require(`../../../../components/atoms/select`)

const { KeyboardDateTimePickerr } = require(`../../../../components/atoms/date-time-picker`)
const { TimePickerInputField } = require(`../../../../components/atoms/field-time-picker`)
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`);
const { diff_minutes, changeEndDate } = require(`../../../../helpers`);
const { CustomFileDrop } = require(`../../../../components/cells/custom-filedrop`)

const UForm = (props) => {

    const { fields, name, allPlatforms, allLeagues, uploadImage, values } = props

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

    // useEffect(() => {
    //     let min = diff_minutes(startDate, endDate)
    //     setContentLength(min)
    // }, [endDate])
    // useEffect(() => {
    //     let min = diff_minutes(startDate, endDate)
    //     setContentLength(min)
    // }, [startDate])

    const onDeleteRow = (index) => {
        fields.remove(index)
    }
    // useEffect(() => {
    //     if (endDate !== null) {
    //         setEndDate(null)
    //     }
    // }, [startDate])
    useEffect(() => {
        console.log(endDate, 'values')
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
                                            <Field
                                                name={`${member}.contentName`}
                                                component={Input}
                                                placeholder={'Show'}
                                                type={'text'}

                                            />
                                        </div>
                                        <div className="col-md-3 col-sm-6">
                                            <Field
                                                name={`${member}.contentPicture`}
                                                component={CustomFileDrop}
                                                placeholder={'ContentPicture'}
                                                uploadImage={uploadImage}

                                            />
                                        </div>
                                        <div className="col-md-3 col-sm-6">
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
                                        <div className="col-md-3 col-4">
                                            <div className="form-group">
                                                <Field
                                                    name={`${member}.${STRINGS.CONTENT_LENGTH}`}
                                                    component={Input}
                                                    placeholder={'Content Length'}
                                                    config={{
                                                        type: 'number',
                                                        readOnly: true,
                                                        value: contentLength && contentLength[`${member}.${STRINGS.CONTENT_LENGTH}`] ? contentLength[`${member}.${STRINGS.CONTENT_LENGTH}`] : 0
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2">
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

            {/* <div className="row">
                <div className="col-md-12 text-right">
                    <button type='button' className="btn btn-lg btn-secondary btn-radius" onClick={() => addRow()}><i>+</i> Add New </button>
                </div>
            </div> */}
        </>
    )
}



export const UploadForm = UForm