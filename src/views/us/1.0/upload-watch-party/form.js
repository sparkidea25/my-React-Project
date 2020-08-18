import React, { useEffect, useState } from 'react';

import { reduxForm, Field } from "redux-form";
const { Form } = require(`../../../../components/atoms/form`);
const { Input } = require(`../../../../components/atoms/input`);
const { Select } = require(`../../../../components/atoms/select`)
const { onSubmitFail } = require(`../../../../helpers`);

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


    return (
        <div>
            <React.Fragment>
                {
                    fields && fields.map((member, index) => {
                        return (
                            <React.Fragment key={index + ''}>

                                <div className="form-row">
                                    <div className="col-md-4 col-sm-5 col-10">
                                        <Field
                                            name={`${STRINGS.SHOW_NAME}${member.parties}`}
                                            component={Input}
                                            placeholder={'Show'}
                                            // value={fields.show}
                                            type={'text'}
                                        // onChange={event => onChangeField('show', event.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${STRINGS.HOST_NAME}${member.parties}`}
                                                component={Input}
                                                // value={fields.host}
                                                placeholder={'Host'}
                                                type={"text"}
                                            // onChange={event => onChangeField('host', event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${STRINGS.SPORTS_NAME}${member.parties}`}
                                                component={Select}
                                                options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                                                // value={selectedSport}
                                                placeholder={'Sports'}
                                            // onChange={value => {
                                            //     onChangeField('sports', value.value)
                                            //     setSelectedSport(value.label)
                                            // }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${STRINGS.LEAGUE_NAME}${member.parties}`}
                                                component={Select}
                                                options={leagues}
                                                // value={selectedLeague}
                                                placeholder={"League"}
                                            // onChange={value => {
                                            //     onChangeField('league', value.value)
                                            //     setSelectedLeague(value.label)
                                            // }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${STRINGS.PLATFORM_NAME}${member.parties}`}
                                                component={Select}
                                                options={platforms}
                                                // value={selectedPlatform}
                                                placeholder={'Platform'}
                                            // onChange={value => {
                                            //     onChangeField('platform', value.value)
                                            //     setSelectedPlatform(value.label)
                                            // }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${STRINGS.START_TIME}${member.parties}`}
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
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${STRINGS.END_TIME}${member.parties}`}
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
                                    <div className="col-md-2 col-sm-4 col-10">
                                        <div className="form-group">
                                            <Field
                                                name={`${STRINGS.CONTENT_LENGTH}${member.parties}`}
                                                component={Input}

                                                placeholder={'Content Length'}
                                                config={{
                                                    // value: fields.contentLength,
                                                    type: 'number',
                                                    readOnly: true
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