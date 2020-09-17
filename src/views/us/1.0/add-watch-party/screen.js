import React, { useState, useEffect } from "react";
import { reduxForm, Field, change as onChangeForm } from "redux-form";
import "./style.scss";
import validator from "./validator";
import moment from "moment-timezone"
import { connect } from 'react-redux'
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

let initialParty = {}
//let initilaParty = window.history.state.state.party || {}
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
    uploadFile = () => { },
    updateParty
}) => {

    const [fields, setFields] = useState({
        "host": "",
        "startTime": null,
        "sports": "",
        "league": "",
        "platform": "",
        "contentLength": "",
        "endTime": null,
        "show": "",
        "video": ""
    })
    let editMode = history && history.location && history.location.editMode
    const [selectedWatchPartyVideoOption, setSelectedWatchPartyVideoOption] = React.useState('Select Video')
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [setvideoName, updateVideoName] = useState()
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const onChangeField = (type, value) => {
        setFields({ ...fields, [type]: value })
    }
    const [selectedLeague, setSelectedLeague] = useState()
    const [selectedPlatform, setSelectedPlatform] = useState('')
    const [selectedSport, setSelectedSport] = useState('')
    const [watchPartyVideos, setWatchPartyVideos] = useState([])
    const [platforms, setPlatforms] = useState([])
    const [selectedVideo, setSelectedVideo] = useState('')
    const [leagues, setLeagues] = useState([])
    const [isCustom, updateIsCustom] = useState(false)
    const [showRemoveVideoOption, updateRemoveVideoOption] = useState(false)
    useEffect(() => {
        if (history && history.location && history.location.state && history.location.state.party && editMode) {
            let { party } = history.location.state
            console.log('partyuuuuuuuu conetnt=>>>>>>>>>>>>>>>>>>>', party)
            updateRemoveVideoOption(true)
            // onChangeForm('watchparty', 'show', party.contentName)
            setFields({
                ...fields,
                watchPartyId: party._id,
                show: party && party.contentName, host: party.host,
                sports: party.sports === true ? 'Yes' : 'No',
                league: party && party.leagueInfo && party.leagueInfo._id,
                platform: party && party.platformInfo && party.platformInfo._id,
                //month: moment(party && party.startTime).format('MMM').toUpperCase(),
                // date: convertTimeForEdit(party && party.startTime),
                // year: moment(party && party.startTime).format('YYYY'),
                //time: convertTimeForEdit(party && party.startTime, party && party.contentName),

                endTime: new Date(party && party.endTime),
                startTime: new Date(party && party.startTime),
                //joined: party && party.joined,
                //interested: party && party.interested,
                contentLength: party && party.contentLength,
                //video:party && party.video

            })
            // setSelectedLeague(fields.league)
            //setSelectedSport(fields.sports)
            console.log('showwwww name', fields.show)
        }
    }, [])
    const updateWatchParty = (index) => {
        //  let obj = checkValidateFields()
        // setLiveArrow('asc')
        // setError(obj)

        // if (obj['show'] || obj['host'] || obj['time'] || obj['endTime']) {
        //     return
        // }
        //else {
        console.log('editttt=>>>>>>>>>>>>>>>>>>>>>>>>>>>')

        let st = convertToServerTimeZone(new Date(fields.startTime))
        let et = convertToServerTimeZone(new Date(fields.endTime))

        const postData = {
            "watchPartyId": fields.watchPartyId,
            "contentName": fields.show,
            "host": fields.host,
            "startTime": st,
            "endTime": et,
            "sports": fields.sports === 'No' ? 'false' : 'true',
            "league": fields.league,
            "platform": fields.platform,
            "contentLength": fields.contentLength
        }


        updateParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            history.push(ROUTES.WATCH_PARTY)
            // postWatchPartyApi({ skip: (liveTableIndex) * STRINGS.SHOW_LIMIT, limit: STRINGS.SHOW_LIMIT, filter: 2, sortkey: "startTime", sortOrder: 1 }, (response) => {
            //     setUpcomingAndLiveListing(response && response.watchPartyListing)
            //     setLiveTotalCount(response && response.totalCount)
            // })
        }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg
            });
            setOpenSnackbar(true)
        })
        //setEditMode(false)

    }
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
    // useEffect(() => {

    // }, [fields])

    useEffect(() => {
        let arr = []
        allWatchPartyVideosList && allWatchPartyVideosList.map(platform => {
            let obj = { label: platform.name, value: platform.videoUrl }
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
        //   history && history.location && history.location.editMode ? updateWatchParty() :
        console.log('addd=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        // let st = convertToServerTimeZone(fields.startTime)
        // let et = convertToServerTimeZone(fields.endTime)
        // let postData = {
        //     "contentName": fields.show,
        //     "host": fields.host,
        //     "startTime": st,
        //     "sports": fields.sports === 'No' ? 'false' : 'true',
        //     "league": fields.league,
        //     "platform": fields.platform,
        //     "contentLength": fields.contentLength,
        //     "endTime": et,
        //     "contentPicture": credentials.contentPicture,
        //     "videoUrl": fields.video,
        //     "isCustom": isCustom,
        //     "videoName": setvideoName
        // }

        // addWatchParty(postData, (response) => {
        //     setSnackBarData({
        //         variant: response.status ? 'success' : 'error',
        //         message: response.msg
        //     });
        //     setOpenSnackbar(true)
        //     history.push(ROUTES.WATCH_PARTY)
        // }, (response) => {
        //     setSnackBarData({
        //         variant: response.status ? 'success' : 'error',
        //         message: response.msg
        //     });
        //     setOpenSnackbar(true)
        // })
    }

    useEffect(() => {

        if (fields.endTime !== null) {
            onChangeField('endTime', null)
        }
    }, [fields.startTime])

    useEffect(() => {
        if (fields.startTime != null && fields.endTime != null) {
            let min = diff_minutes(fields.startTime, fields.endTime)
            onChangeField('contentLength', min)
        }

    }, [fields.endTime])

    useEffect(() => {
        getLeagues(() => { }, () => { })
        getPlatforms(() => { }, () => { })
        getWatchPartyVideos(userToken, () => { }, () => { })
    }, [])


    useEffect(() => {
        console.log('fieldsssss in useEffect', fields, fields.sports)
        initialParty = { ...fields }
    }, [fields])

    const uploadVideoFile = (file, name) => {
        console.log('videooo name', name)
        uploadFile(
            file,
            (url) => {
                console.log('done uploadfileee', url)
                onChangeField('video', url)
                updateIsCustom(true)
                updateVideoName(name)
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
                    <h1>{history && history.location && history.location.editMode ? PAGE_TITLES.EDIT_WATCH_PARTY : PAGE_TITLES.ADD_NEW_WATCH_PARTY}</h1>
                </div>
                <Form onSubmit={
                    history && history.location && history.location.editMode ? handleSubmit(updateWatchParty) :
                        handleSubmit(onSubmit)
                } class="add_watch_form">
                    <div className="row">
                        <div className="col-md-6">
                            <label>{STRINGS.SHOW}</label>
                            <Field
                                name={STRINGS.SHOW_NAME}
                                component={Input}
                                placeholder={'Show'}
                                default={fields.show}
                                type={'text'}
                                onChange={event => onChangeField('show', event.target.value)}
                                config={{
                                    // type: 'number',
                                    // readOnly: true,
                                    value: fields.show ? fields.show : null
                                }}
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
                                config={{
                                    // type: 'number',
                                    // readOnly: true,
                                    value: fields.host ? fields.host : null
                                }}
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
                                    console.log('sportsss', value.label)
                                    onChangeField('sports', value.label)
                                    setSelectedSport(value.label)
                                }}
                                config={{
                                    // type: 'number',
                                    // readOnly: true,
                                    value: fields.sports ? fields.sports == 'Yes' ? true : false : null
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
                                config={{
                                    // type: 'number',
                                    // readOnly: true,
                                    value: fields.league ? fields.league : null
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
                                config={{
                                    // type: 'number',
                                    // readOnly: true,
                                    value: fields.platform ? fields.platform : null
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

                            {showRemoveVideoOption ?
                                <div>
                                    <input value={'sample video thusa sts uas u7sa shy aus astu asu '} style={{ width: '100%' }} disabled></input>
                                    <button className="btn btn-sm btn-secondary" style={{ marginTop: '20px' }} onClick={() => {
                                        updateRemoveVideoOption(false)
                                    }}>Remove</button>
                                </div> : null}
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
                                        name={'video name'}
                                        component={Select}
                                        options={watchPartyVideos}
                                        value={selectedVideo}
                                        placeholder={'Watch Party Video'}
                                        onChange={value => {
                                            console.log('video on change', value.value, value.label)
                                            onChangeField('video', value.value)
                                            setSelectedVideo(value.label)
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
                        <div className="btn_group text-center col-md-12" style={{ textAlign: 'left' }}>
                            <InputSubmit buttonLabel={history && history.location && history.location.editMode ? PAGE_TITLES.EDIT_WATCH_PARTY : PAGE_TITLES.ADD_WATCH_PARTY} />
                        </div>
                    </div>
                </Form>

            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    //  console.log('initial', initialParty)
    let initialValues = {
        show: initialParty && initialParty.show,
        host: initialParty.host,
        sports: initialParty.sports,
        league: initialParty && initialParty.league,
        platform: initialParty && initialParty.platform,
        endTime: new Date(initialParty && initialParty.endTime),
        startTime: new Date(initialParty && initialParty.startTime),
        contentLength: initialParty && initialParty.contentLength,
    };
    return {
        initialValues: initialValues
    };
}

const showForm = reduxForm({
    form: "watchparty",
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(WatchPartyForm);
export const Screen = connect(mapStateToProps)(showForm);

