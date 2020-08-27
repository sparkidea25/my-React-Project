import React, { useState, useEffect } from "react";

import { reduxForm, Field } from "redux-form";
import "./style.scss";

import validator from "./validator";
import moment from "moment-timezone"

const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { Form } = require(`../../../../components/atoms/form`);
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { Input } = require(`../../../../components/atoms/input`);
const { Select } = require(`../../../../components/atoms/select`)
const { KeyboardDateTimePickerr } = require(`../../../../components/atoms/date-time-picker`)
const { TimePickerInputField } = require(`../../../../components/atoms/field-time-picker`)
const { onSubmitFail, diff_minutes, changeEndDate } = require(`../../../../helpers`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`)
const { ROUTES } = require(`../../../../shared/constants`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { CustomFileDrop } = require(`../../../../components/cells/custom-filedrop`)

moment.tz.setDefault('America/New_York');

const WatchPartyForm = ({
    handleSubmit = () => { },
    initialize,
    allPlatforms,
    allLeagues,
    addWatchParty,
    getPlatforms,
    getLeagues,
    history,
    uploadImage
}) => {
    const [fields, setFields] = useState({
        "host": "",
        "startTime": null,
        "sports": "",
        "league": "",
        "platform": "",
        "contentLength": "",
        "endTime": null,
        'show': "",
    })

    const [validateFields, setValidateFields] = useState({
        "startTime": false,
        "endTime": false
    })
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const onChangeField = (type, value) => {
        setFields({ ...fields, [type]: value })
    }
    const [selectedLeague, setSelectedLeague] = useState('')
    const [selectedPlatform, setSelectedPlatform] = useState('')
    const [selectedSport, setSelectedSport] = useState('')

    const [platforms, setPlatforms] = useState([])
    const [leagues, setLeagues] = useState([])
    useEffect(() => {
        let arr = []

        allPlatforms && allPlatforms.map(platform => {
            let obj = { value: platform._id, label: platform.name }
            arr.push(obj)
        })
        setPlatforms(arr)
    }, [allPlatforms])

    // const copyDate = (date, time) => {
    //     time = time ? new Date(time) : new Date()
    //     date = date ? new Date(date) : new Date()
    //     time.setDate(date.getDate());
    //     time.setMonth(date.getMonth());
    //     time.setYear(date.getFullYear());

    //     return time;
    // }

    useEffect(() => {
        let arr = []
        allLeagues && allLeagues.map(platform => {
            let obj = { value: platform._id, label: platform.name }
            arr.push(obj)
        })
        setLeagues(arr)
    }, [allLeagues])
    useEffect(() => {

    }, [fields])

    const convertToServerTimeZone = (date) => {
        var localZone = moment.tz.guess();
        var zoneOffset = moment.tz.zone(localZone).utcOffset(new Date().getTime()) * 60000;
        var estOffset = (moment.tz.zone('America/New_York').utcOffset(new Date().getTime()) + 60) * 60000;
        console.log(estOffset, 'estOffset')

        return moment(date.getTime() - zoneOffset + estOffset).toISOString()
    }

    const validateTime = (field, message) => {
        if (validateFields[field] === true) {
            return message
        }
    }

    const onSubmit = (credentials) => {

        let st = convertToServerTimeZone(fields.startTime)
        let et = convertToServerTimeZone(fields.endTime)
        let postData = {
            "contentName": fields.show,
            "host": fields.host,
            "startTime": st,
            "sports": fields.sports,
            "league": fields.league,
            "platform": fields.platform,
            "contentLength": fields.contentLength,
            "endTime": et,
            "contentPicture": credentials.contentPicture
        }

        addWatchParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            history.push(ROUTES.WATCH_PARTY)
        }, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
        })
    }

    useEffect(() => {
        if (fields.endTime !== null) {
            onChangeField('endTime', null)
        }
    }, [fields.startTime])

    useEffect(() => {
        let min = diff_minutes(fields.startTime, fields.endTime)
        onChangeField('contentLength', min)

    }, [fields.endTime])

    useEffect(() => {
        getLeagues(() => { }, () => { })
        getPlatforms(() => { }, () => { })
    }, [])

    return (
        <div class="container">
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div class="content-panel">
                <div class="page-title">
                    <h1>Add New Watch Party</h1>
                </div>
                <Form onSubmit={
                    handleSubmit(onSubmit)} class="add_watch_form">
                    <div className="row">
                        <div className="col-md-6">
                            <label>Name</label>
                            <Field
                                name={STRINGS.SHOW_NAME}
                                component={Input}
                                placeholder={'Show'}
                                value={fields.show}
                                type={'text'}
                                onChange={event => onChangeField('show', event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Host</label>
                            <Field
                                name={STRINGS.HOST_NAME}
                                component={Input}
                                value={fields.host}
                                placeholder={'Host'}
                                type={"text"}
                                onChange={event => onChangeField('host', event.target.value)}
                            />
                        </div>
                        <div class="col-md-12">
                            <label>Sports </label>
                            <Field
                                name={STRINGS.SPORTS_NAME}
                                component={Select}
                                options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                                value={selectedSport}
                                placeholder={'Sports'}
                                onChange={value => {
                                    onChangeField('sports', value.value)
                                    setSelectedSport(value.label)
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div class="col-md-6">
                            <label>League Name</label>
                            <Field
                                name={STRINGS.LEAGUE_NAME}
                                component={Select}
                                options={leagues}
                                value={selectedLeague}
                                placeholder={"League"}
                                onChange={value => {
                                    onChangeField('league', value.value)
                                    setSelectedLeague(value.label)
                                }}
                            />
                        </div>
                        <div class="col-md-6">
                            <label>Platform </label>
                            <Field
                                name={STRINGS.PLATFORM_NAME}
                                component={Select}
                                options={platforms}
                                value={selectedPlatform}
                                placeholder={'Platform'}
                                onChange={value => {
                                    onChangeField('platform', value.value)
                                    setSelectedPlatform(value.label)
                                }}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div class="col-md-6">
                            <div className="row">
                                <div class="col-md-6">
                                    <label>Start Time(EST).</label>
                                    <div className="form-group">
                                        <Field
                                            name={STRINGS.START_TIME}
                                            component={KeyboardDateTimePickerr}
                                            placeholder={'Start Time'}
                                            minDate={new Date()}
                                            minTime={new Date()}
                                            value={fields.startTime}
                                            onChangeDate={(value) => {
                                                onChangeField('startTime', value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    {/* <div className="row"> */}
                                    <label>End Time(EST).</label>
                                    <Field
                                        name={STRINGS.END_TIME}
                                        component={TimePickerInputField}
                                        placeholder={'End Time'}
                                        defaultValue={fields.endTime}
                                        minTime={fields.startTime}
                                        onChangeTime={time => {
                                            onChangeField('endTime', changeEndDate(fields.startTime, time))
                                        }}

                                    />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label>Length</label>
                            <Field
                                name={STRINGS.CONTENT_LENGTH}
                                component={Input}

                                placeholder={'Content Length'}
                                config={{
                                    value: fields.contentLength,
                                    type: 'number',
                                    readOnly: true
                                }}
                            />
                        </div>

                        <div className="btn_group text-center">
                            <InputSubmit buttonLabel={'Add Watch Party'} />
                        </div>
                    </div>
                </Form>
            </div>

        </div>
    );
};


export const Screen = reduxForm({
    form: "watchparty",
    onSubmitFail,
    validate: validator,
})(WatchPartyForm);

