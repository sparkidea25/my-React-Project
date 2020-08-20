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

    const { fields, name, removeSelected, allPlatforms, allLeagues, onFileChange, uploadImage } = props

    const [leagues, setLeagues] = useState([])
    const [platforms, setPlatforms] = useState([])

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [contentLength, setContentLength] = useState(0)

    useEffect(() => {
        let arr = []
        allLeagues && allLeagues.map(platform => {
            let obj = { value: platform._id, label: platform.name }
            arr.push(obj)
        })
        setLeagues(arr)
    }, [allLeagues])

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
        setEndDate(null)
        setContentLength(null)
    }

    useEffect(() => {
        let min = diff_minutes(startDate, endDate)
        setContentLength(min)
    }, [endDate])
    useEffect(() => {
        let min = diff_minutes(startDate, endDate)
        setContentLength(min)
    }, [startDate])

    const onDeleteRow = (index) => {
        fields.remove(index)
    }
    useEffect(() => {
        if (endDate !== null) {
            setEndDate(null)
        }
    }, [startDate])



    return (
        <>

            <div className="container-fluid">
                <React.Fragment>
                    {
                        fields && fields.map((member, index) => {
                            return (
                                <React.Fragment key={index + ''}>

                                    <fieldset>
                                        <div className="form-row">
                                            <div className="col-md-3 col-sm-6">
                                                <Field
                                                    name={`${member}.contentName`}
                                                    component={Input}
                                                    placeholder={'Show'}
                                                    type={'text'}
                                                />
                                            </div>
                                            <Field
                                                name={`${member}.contentPicture`}
                                                component={CustomFileDrop}
                                                placeholder={'ContentPicture'}
                                                uploadImage={uploadImage}
                                            />

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
                                                    <div className="col-md-12">
                                                        <Field
                                                            name={`${member}.${STRINGS.START_TIME}`}
                                                            component={KeyboardDateTimePickerr}
                                                            placeholder={'Start Time'}
                                                            minDate={new Date()}
                                                            minTime={new Date()}
                                                            value={startDate}
                                                            onChangeDate={(value) => {
                                                                setStartDate(value)
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-3 col-sm-6">
                                                <div className="form-group">
                                                    <div className="col-md-12">
                                                        <Field
                                                            name={`${member}.${STRINGS.END_TIME}`}
                                                            component={TimePickerInputField}
                                                            placeholder={'End Time'}
                                                            defaultValue={endDate}
                                                            minTime={startDate}
                                                            onChangeTime={value => {
                                                                let convertedTime = changeEndDate(startDate, value)
                                                                setEndDate(convertedTime)
                                                            }}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-sm-4">
                                                <div className="form-group">
                                                    <Field
                                                        name={`${member}.${STRINGS.CONTENT_LENGTH}`}
                                                        component={Input}
                                                        placeholder={'Content Length'}
                                                        value={contentLength}
                                                        config={{
                                                            type: 'number',
                                                            readOnly: true,
                                                            value: contentLength
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-1 col-sm-1">
                                                <div className="remove_row col-12" onClick={() => onDeleteRow(index)}>
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