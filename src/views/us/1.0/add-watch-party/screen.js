import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
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
    updateParty,
    watchPartyList,
    getWatchPartyInfo,
    // watchPartyForUpdate
}) => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    const [fields, setFields] = useState({
        "host": "",
        "startTime": null,
        "sports": "",
        "league": "",
        "platform": "",
        "contentLength": "",
        "endTime": null,
        "show": "",
        "video": "",
        "videoName": ""
    })

    const [selectedWatchPartyVideoOption, setSelectedWatchPartyVideoOption] = React.useState('Select Video')
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [setvideoName, updateVideoName] = useState()
    const [currentWatchParty, updateCurrentWatchParty] = useState()
    const [editMode, updateEditMode] = useState(false)
    const [showNotFoundWatchPartyIdMessage, updateNotFoundWatchPartyIdMessage] = useState()
    const [watchPartyForUpdate, updateWatchPartyForUpdate] = useState()
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
    const [videoFileData, updateVideoFileData] = useState()
    const [showRemoveVideoOption, updateRemoveVideoOption] = useState(false)


    useEffect(() => {
        if (watchPartyForUpdate && watchPartyForUpdate.videoInfo && watchPartyForUpdate.videoInfo.name && editMode) {
            updateRemoveVideoOption(true)
        }
        console.log('ruyn=>>>>>>>>>>>>>>', watchPartyForUpdate)
        if (watchPartyForUpdate) {
            setFields({
                ...fields,
                watchPartyId: watchPartyForUpdate._id,
                show: watchPartyForUpdate && watchPartyForUpdate.contentName,
                host: watchPartyForUpdate.host,
                sports: watchPartyForUpdate.sports === true ? 'Yes' : 'No',
                league: watchPartyForUpdate && watchPartyForUpdate.leagueInfo && watchPartyForUpdate.leagueInfo._id,
                platform: watchPartyForUpdate && watchPartyForUpdate.platformInfo && watchPartyForUpdate.platformInfo._id,
                endTime: new Date(convertTimeForEdit(watchPartyForUpdate && watchPartyForUpdate.endTime)),
                startTime: new Date(convertTimeForEdit(watchPartyForUpdate && watchPartyForUpdate.startTime)),
                contentLength: watchPartyForUpdate && watchPartyForUpdate.contentLength,
                videoName: watchPartyForUpdate && watchPartyForUpdate.videoInfo && watchPartyForUpdate.videoInfo.name,
                video: watchPartyForUpdate && watchPartyForUpdate.videoInfo && watchPartyForUpdate.videoInfo.url
            })
        }
    }, [watchPartyForUpdate])

    useEffect(() => {
        let path = history.location.pathname
        let watch_party_id = query.get("watch_party_id")
        if (path == '/edit-watch-party' && watch_party_id) {
            updateEditMode(true)
            getWatchPartyInfo(
                watch_party_id,
                (response) => {
                    console.log('dataaaaaa paryyyyyyyyyyy=>>>>>', response)
                    updateWatchPartyForUpdate(response)
                    setSnackBarData({
                        variant: response.status ? 'success' : 'error',
                        message: response.msg
                    });
                    //  setOpenSnackbar(true)
                },
                (error) => {
                    console.log('error=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', error)
                    setSnackBarData({
                        variant: error.status ? 'success' : 'error',
                        message: error.msg
                    });
                    setOpenSnackbar(true)
                }
            )
        }

        else if (path == '/edit-watch-party') {
            updateNotFoundWatchPartyIdMessage(true)
        }
    }, [history && history.location && history.location.pathname])

    const updateWatchParty = (index) => {
        if (!!videoFileData) {
            uploadFile(
                videoFileData,
                (url) => {
                    console.log('done uploadfileee', url)
                    onChangeField('video', url)
                    updateIsCustom(true)
                    updateRemoveVideoOption(false)
                    edit_WatchParty(url)
                },
                (error) => {
                    console.log('err', error)
                    setSnackBarData({
                        variant: error.status ? 'success' : 'error',
                        message: error.msg
                    });
                    setOpenSnackbar(true)
                }
            )
        }
        else {
            edit_WatchParty('')
        }
    }
    const edit_WatchParty = (url) => {
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
            "contentLength": fields.contentLength,
            "videoUrl": !!url ? url : fields.video,
            "isCustom": isCustom,
            "videoName": fields.videoName
        }
        console.log('editttt=>>>>>>>>>>>>>>>>>>>>>>>>>>>', postData)


        updateParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            history.push(ROUTES.WATCH_PARTY)
        }, (error) => {
            console.log('err', error)
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg
            });
            setOpenSnackbar(true)
        })

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
        console.log('Server timw=>>>>>>>>>>>', moment(date.getTime() - zoneOffset + estOffset).toISOString())
        return moment(date.getTime() - zoneOffset + estOffset).toISOString()
    }

    const onSubmit = (credentials) => {

        if (!!videoFileData) {
            uploadFile(
                videoFileData,
                (url) => {
                    console.log('done uploadfileee', url)
                    onChangeField('video', url)
                    updateIsCustom(true)
                    updateRemoveVideoOption(false)
                    add_WatchParty(credentials, url)
                },
                (error) => {
                    console.log('err', error)
                    setSnackBarData({
                        variant: error.status ? 'success' : 'error',
                        message: error.msg
                    });
                    setOpenSnackbar(true)
                }
            )
        }
        else {
            add_WatchParty(credentials, '')
        }
    }
    const add_WatchParty = (credentials, url) => {

        let st = convertToServerTimeZone(fields.startTime)
        let et = convertToServerTimeZone(fields.endTime)
        let postData = {
            "contentName": fields.show,
            "host": fields.host,
            "startTime": st,
            "sports": fields.sports === 'No' ? 'false' : 'true',
            "league": fields.league,
            "platform": fields.platform,
            "contentLength": fields.contentLength,
            "endTime": et,
            "contentPicture": credentials.contentPicture,
            "videoUrl": !!url ? url : fields.video,
            "isCustom": isCustom,
            "videoName": fields.videoName
        }
        console.log('videooooo url=>>>>>>>>>>>> post dataaaaaaa', postData)
        addWatchParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            history.push(ROUTES.WATCH_PARTY)
        },
            (error) => {
                console.log('err', error)
                setSnackBarData({
                    variant: error.status ? 'success' : 'error',
                    message: error.msg
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
        //  console.log('fieldsssss in useEffect', fields)
        initialParty = { ...fields }
    }, [fields])


    const updateVideoData = (file, name) => {
        onChangeField('videoName', name)
        updateVideoFileData(file)
        updateIsCustom(true)
        updateRemoveVideoOption(false)
    }
    const convertTimeForEdit = (date, type) => {
        if (date) {
            var localZone = moment.tz.guess();

            var zoneOffset = moment.tz.zone(localZone).utcOffset(new Date().getTime()) * 60000;

            var estOffset = moment.tz.zone('America/New_York').utcOffset(new Date().getTime()) * 60000;
            var toEST = new Date(date).setHours(new Date(date).getHours() - 1, new Date(date).getMinutes(), new Date(date).getSeconds(), new Date(date).getMilliseconds())
            return moment(new Date(date).getTime() - (estOffset + 3600000) + zoneOffset).format()
        }
    }
    useEffect(() => {
        console.log('Fieldssssssssss', fields)
    }, [fields])

    return (
        <div class="container">
            {showNotFoundWatchPartyIdMessage ?
                <div>Watch Party Id Not Found for Update</div>
                :
                <>
                    <SnackbarWrapper
                        visible={openSnackBar}
                        onClose={() => setOpenSnackbar(false)}
                        variant={snackbarData.variant}
                        message={snackbarData.message}
                    />
                    <div class="content-panel">
                        <div class="page-title">
                            <h1>{!!editMode ? PAGE_TITLES.EDIT_WATCH_PARTY : PAGE_TITLES.ADD_NEW_WATCH_PARTY}</h1>
                        </div>
                        <Form onSubmit={
                            !!editMode ? handleSubmit(updateWatchParty) :
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
                                                    defaultValue={fields.startTime}
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
                                        <div style={{ marginTop: '10px', marginBottom: '20px' }}>
                                            <label style={{ color: 'gray', marginRight: '20px' }}>{fields.videoName}</label>
                                            <button className="btn btn-sm btn-secondary" onClick={() => {
                                                setFields({ ...fields, videoName: '', video: '' })
                                                updateRemoveVideoOption(false)
                                            }}>Remove</button>
                                        </div> : null}

                                    <div style={{ marginBottom: '10px', marginLeft: 10 }}>
                                        <RadioButtons
                                            handleValueChange={(value) => {
                                                setSelectedWatchPartyVideoOption(value)
                                                updateVideoFileData('')
                                                //onChangeField('videoName', '')
                                                setFields({ ...fields, videoName: '', video: '' })
                                                updateRemoveVideoOption(false)
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
                                                    // onChangeField('video', value.value)
                                                    setSelectedVideo(value.label)
                                                    // onChangeField('videoName', value.label)
                                                    setFields({ ...fields, videoName: value.label, video: value.value })
                                                    updateRemoveVideoOption(false)
                                                }}
                                                config={{
                                                    value: fields.video ? fields.video : null
                                                }}
                                            />
                                            : <Field
                                                name='video'
                                                component={CustomFileDrop}
                                                acceptFiles={'.webm,.MPG,.MP2,.MPEG,.MPE,.MPV,.mp4,.m4p,.m4v'}
                                                updateVideoData={updateVideoData}
                                            />}

                                    </div>
                                </div>
                                <div className="btn_group  col-md-12" style={{ alignSelf: 'left' }}>
                                    <InputSubmit buttonLabel={!!editMode ? PAGE_TITLES.EDIT_WATCH_PARTY : PAGE_TITLES.ADD_WATCH_PARTY} />
                                </div>
                            </div>
                        </Form>

                    </div>
                </>
            }
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
        videoName: initialParty && initialParty.videoName,
        video: initialParty && initialParty.video
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

