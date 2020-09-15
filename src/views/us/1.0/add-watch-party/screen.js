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
const { ROUTES, PAGE_TITLES } = require(`../../../../shared/constants`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { RadioButtons } = require(`../../../../components/atoms/radio-button`)
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
    userToken,
    getWatchPartyVideos,
    allWatchPartyVideosList,
    uploadFile = () => { }
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
        "video": ""
    })
    const [selectedWatchPartyVideoOption, setSelectedWatchPartyVideoOption] = React.useState('Select Video')
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
    const [watchPartyVideos, setWatchPartyVideos] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [selectedVideo, setSelectedVideo] = useState('')
    const [leagues, setLeagues] = useState([])
    const [isCustom, updateIsCustom] = useState(false)
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

    }, [fields])

    useEffect(() => {
        let arr = []
        allWatchPartyVideosList && allWatchPartyVideosList.map(platform => {
            let obj = { _id: platform._id, label: platform.name, videoUrl: platform.videoUrl }
            arr.push(obj)
        })
        setWatchPartyVideos(arr)
    }, [allWatchPartyVideosList])

    const convertToServerTimeZone = (date) => {
        var localZone = moment.tz.guess();
        var zoneOffset = moment.tz.zone(localZone).utcOffset(new Date().getTime()) * 60000;
        var estOffset = (moment.tz.zone('America/New_York').utcOffset(new Date().getTime()) + 60) * 60000;

        return moment(date.getTime() - zoneOffset + estOffset).toISOString()
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
            "contentPicture": credentials.contentPicture,
            "videoUrl": fields.video,
            "isCustom": isCustom
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
        getWatchPartyVideos(userToken, () => { }, () => { })
    }, [])
    console.log('videopsss fiueldddd', fields.video, isCustom)

    const uploadVideoFile = (file) => {
        uploadFile(
            file,
            (url) => {
                console.log('done uploadfileee', url)
                onChangeField('video', url)
                updateIsCustom(true)
            },
            (err) => {
                console.log('err', err)
            }
        )
    }
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
                    <h1>{PAGE_TITLES.ADD_NEW_WATCH_PARTY}</h1>
                </div>
                <Form onSubmit={
                    handleSubmit(onSubmit)} class="add_watch_form">
                    <div className="row">
                        <div className="col-md-6">
                            <label>{STRINGS.SHOW}</label>
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
                            <label>{STRINGS.HOST}</label>
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
                            <label>{STRINGS.SPORTS} </label>
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
                            <label>{STRINGS.LEAGUE}</label>
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
                            <label>{STRINGS.PLATFORM} </label>
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
                                    <label>{STRINGS.START}</label>
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
                                    <label>{STRINGS.END}</label>
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
                            <label>{STRINGS.CONTENT}</label>
                            <Field
                                name={STRINGS.CONTENT_LENGTH}
                                component={Input}
                                placeholder={'Content Length'}
                                config={{

                                    type: 'number',
                                    readOnly: true,
                                    value: fields.contentLength ? fields.contentLength : null
                                }}
                            />
                        </div>
                        <div class="col-md-12">
                            <label>{STRINGS.WATCH_PARTY_VIDEO}</label>
                            <div>
                                <RadioButtons
                                    handleValueChange={(value) => {
                                        setSelectedWatchPartyVideoOption(value)
                                    }}
                                    selectedValue={selectedWatchPartyVideoOption}
                                    component={RadioButtons}
                                    radioGroupItems={[{ label: 'Select Video', value: 'Select Video' }, { label: 'Add Video', value: 'Add Video' }]}
                                />
                            </div>
                            <div>
                                {selectedWatchPartyVideoOption == 'Select Video' ?
                                    <Field
                                        name='video'
                                        component={Select}
                                        options={watchPartyVideos}
                                        value={selectedVideo}
                                        placeholder={'Watch Party Video'}
                                        onChange={value => {
                                            console.log('video on change', value.videoUrl)
                                            onChangeField('video', value.videoUrl)
                                            setSelectedVideo(value.videoUrl)
                                        }}
                                    />
                                    : <Field
                                        name='video'
                                        component={CustomFileDrop}
                                        acceptFiles={'.webm,.MPG,.MP2,.MPEG,.MPE,.MPV,.mp4,.m4p,.m4v'}
                                        uploadVideoFile={uploadVideoFile}
                                    />}
                            </div>
                        </div>
                        <div className="btn_group text-center col-md-12">
                            <InputSubmit buttonLabel={PAGE_TITLES.ADD_WATCH_PARTY} />
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

