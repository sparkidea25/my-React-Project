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

    const { fields, name, removeSelected, allPlatforms, allLeagues } = props

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
    }

    useEffect(() => {
        let min = diff_minutes(startDate, endDate)
        setContentLength(min)
    }, [endDate])
    useEffect(() => {
        let min = diff_minutes(startDate, endDate)
        setContentLength(min)
    }, [startDate])

    return (
        <div>
            <button onClick={() => addRow()}>Add New</button>
            <React.Fragment>
                {
                    fields && fields.map((member, index) => {
                        return (
                            <React.Fragment key={index + ''}>
                                <div className="form-row">
                                    <div className="col-md-4 col-sm-5 col-10">
                                        <Field
                                            name={`${member}.${STRINGS.SHOW_NAME}`}
                                            component={Input}
                                            placeholder={'Show'}
                                            type={'text'}
                                        />
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${member}.${STRINGS.HOST_NAME}`}
                                                component={Input}
                                                placeholder={'Host'}
                                                type={"text"}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${member}.${STRINGS.SPORTS_NAME}`}
                                                component={Select}
                                                options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                                                placeholder={'Sports'}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${member}.${STRINGS.LEAGUE_NAME}`}
                                                component={Select}
                                                options={leagues}
                                                placeholder={"League"}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${member}.${STRINGS.PLATFORM_NAME}`}
                                                component={Select}
                                                options={platforms}
                                                placeholder={'Platform'}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
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
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
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
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${member}.${STRINGS.CONTENT_LENGTH}`}
                                                component={Input}
                                                placeholder={'Content Length'}
                                                config={{
                                                    type: 'number',
                                                    readOnly: true,
                                                    value: contentLength
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}  </React.Fragment>

        </div >)
}
export const UploadForm = UForm