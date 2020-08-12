import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import SimpleCrypto from "simple-crypto-js";
import { connect } from 'react-redux';
import "./style.scss";

import validator from "./validator";
import moment from "moment"
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { Form } = require(`../../../../components/atoms/form`);
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { Input } = require(`../../../../components/atoms/input`);
const { Select } = require(`../../../../components/atoms/select`)
const { KeyboardDateTimePickerr } = require(`../../../../components/atoms/date-time-picker`)
const { TimePickerInputField } = require(`../../../../components/atoms/field-time-picker`)
const { onSubmitFail } = require(`../../../../helpers`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`)
const { ROUTES } = require(`../../../../shared/constants`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);

const WatchPartyForm = ({
    handleSubmit = () => { },
    initialize,
    allPlatforms,
    allLeagues,
    addWatchParty,
    getPlatforms,
    getLeagues
}) => {
    const [fields, setFields] = useState({
        "host": "",
        "startTime": null,
        "sports": "",
        "league": "",
        "platform": "",
        "contentLength": 0,
        "endTime": null,
        'show': "",
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

    useEffect(() => {
        let arr = []
        allLeagues && allLeagues.map(platform => {
            let obj = { value: platform._id, label: platform.name }
            arr.push(obj)
        })
        setLeagues(arr)
    }, [allLeagues])
    useEffect(() => {
        console.log(fields, 'fieldss')
    }, [fields])

    const onSubmit = () => {
        let postData = {
            "contentName": fields.contentName,
            "host": fields.host,
            "startTime": moment.utc(fields.startTime),
            "sports": fields.sports,
            "league": fields.league,
            "platform": fields.platform,
            "contentLength": fields.contentLength,
            "endTime": moment.utc(fields.endTime)
        }
        addWatchParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
        }, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
        })
    }
    const diff_minutes = (dt2, dt1) => {
        dt2 = new Date(dt2)
        dt1 = new Date(dt1)
        console.log(dt2, dt1)
        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    }
    useEffect(() => {
        uponChangeStartTime()
    }, [fields.startTime])

    const uponChangeStartTime = () => {
        onChangeField('endTime', fields.startTime)
        // let min = diff_minutes(fields.startTime, fields.endTime)
        // onChangeField('contentLength', min)

    }

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
                            <div className="row">
                                <Field
                                    name={STRINGS.SHOW_NAME}
                                    component={Input}
                                    placeholder={STRINGS.SHOW_NAME}
                                    value={fields.show}
                                    type={'text'}

                                    onChange={event => onChangeField('show', event.target.value)}

                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <Field
                                    name={STRINGS.HOST_NAME}
                                    component={Input}
                                    value={fields.host}
                                    placeholder={STRINGS.HOST_NAME}

                                    type={"text"}
                                    onChange={event => onChangeField('host', event.target.value)}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="col-md-6">
                            <div className="row">
                                <Field
                                    name={STRINGS.SPORTS_NAME}
                                    component={Select}
                                    options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                                    value={selectedSport}
                                    placeholder={STRINGS.SPORTS_NAME}
                                    onChange={value => {
                                        onChangeField('sports', value.value)
                                        setSelectedSport(value.label)
                                    }}

                                />
                            </div>
                        </div>


                        <div class="col-md-6">
                            <div className="row">
                                <Field
                                    name={STRINGS.LEAGUE_NAME}
                                    component={Select}
                                    options={leagues}
                                    value={selectedLeague}
                                    placeholder={STRINGS.LEAGUE_NAME}
                                    onChange={value => {
                                        onChangeField('league', value.value)
                                        setSelectedLeague(value.label)
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="col-md-6">
                            <div className="row">
                                <Field
                                    name={STRINGS.PLATFORM_NAME}
                                    component={Select}
                                    options={platforms}
                                    value={selectedPlatform}
                                    placeholder={STRINGS.PLATFORM_NAME}
                                    onChange={value => {
                                        onChangeField('platform', value.value)
                                        setSelectedPlatform(value.label)
                                    }}
                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div className="form-group">
                                <Field
                                    name={STRINGS.START_TIME}
                                    component={KeyboardDateTimePickerr}
                                    placeholder={STRINGS.START_TIME}
                                    minDate={new Date()}
                                    minTime={new Date()}
                                    value={fields.startTime}
                                    onChangeDate={(value) => {
                                        onChangeField('startTime', value)
                                    }}

                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div class="col-md-6">
                            <div className="row">
                                <Field
                                    name={STRINGS.END_TIME}
                                    component={TimePickerInputField}
                                    placeholder={STRINGS.END_TIME}
                                    defaultValue={fields.endTime}
                                    minTime={fields.startTime}
                                    onChange={time => {
                                        onChangeField('endTime', time)

                                    }}

                                />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div className="form-group">
                                <Field
                                    name={STRINGS.CONTENT_LENGTH}
                                    component={Input}

                                    placeholder={STRINGS.CONTENT_LENGTH}
                                    config={{
                                        type: 'number',
                                        value: fields.contentLength,
                                        readOnly: true
                                    }}


                                />
                            </div>
                        </div>
                    </div>
                    <div className="btn_group text-center">
                        <InputSubmit buttonLabel={'Add'} />
                    </div>
                </Form>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    var _secretKey = "some-unique-key";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    return {

    };
}

const reduxFormFunction = reduxForm({
    form: "watchparty",
    fields: ['email', 'password'],
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(WatchPartyForm);

export const Screen = connect(mapStateToProps, null)(reduxFormFunction);
