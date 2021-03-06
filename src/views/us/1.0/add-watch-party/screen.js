import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { reduxForm, Field, change as onChangeForm } from "redux-form";
import "./style.scss";
import validator from "./validator";
import moment from "moment-timezone"
import { connect } from 'react-redux'
import Switch from "react-switch";
const { defaultConfig: { LOCATION } } = require(`../../../../config/default`);
const { Form } = require(`../../../../components/atoms/form`);
const { InputSubmit } = require(`../../../../components/atoms/input-submit`);
const { Input } = require(`../../../../components/atoms/input`);
const { Select } = require(`../../../../components/atoms/select`)
const { KeyboardDateTimePickerr } = require(`../../../../components/atoms/date-time-picker`)
const { TimePickerInputField } = require(`../../../../components/atoms/field-time-picker`)
const { onSubmitFail, diff_minutes, changeEndDate, convertToESTTimeZone, convertTimeForEdit } = require(`../../../../helpers`);
const { STRINGS } = require(`../../../../shared/constants/${LOCATION}/strings`)
const { ROUTES, PAGE_TITLES } = require(`../../../../shared/constants`);
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { RadioButtons } = require(`../../../../components/atoms/radio-button`)
const { CustomFileDrop } = require(`../../../../components/cells/custom-filedrop`)
moment.tz.setDefault('America/New_York');

let initialParty = {}

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
    cloneWatchParty,
    watchPartyList,
    getWatchPartyInfo,
}) => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }


    let query = useQuery();
    const [fields, setFields] = useState({
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
    const [editMode, updateEditMode] = useState(false);
    const [cloneMode, updateCloneMode] = useState(false);
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
        if (watchPartyForUpdate) {
            setFields({
                ...fields,
                watchPartyId: watchPartyForUpdate._id,
                show: !!cloneMode ? '' : watchPartyForUpdate && watchPartyForUpdate.contentName,
                isHidden: watchPartyForUpdate.isHidden,
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
        if ((path == '/edit-watch-party' || path == '/clone-watch-party') && watch_party_id) {
            if (path == '/edit-watch-party') {
                updateEditMode(true);
            }
            else {
                updateCloneMode(true);
            }
            getWatchPartyInfo(
                watch_party_id,
                (response) => {
                    updateWatchPartyForUpdate(response)
                    setSnackBarData({
                        variant: response.status ? 'success' : 'error',
                        message: response.msg
                    });
                    //  setOpenSnackbar(true)
                },
                (error) => {
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

    const onsubmit = (credentials) => {

        if (!!videoFileData) {
            uploadFile(
                videoFileData,
                (url) => {
                    onChangeField('video', url)
                    updateIsCustom(true)
                    updateRemoveVideoOption(false)
                    !!editMode ? edit_WatchParty(url)
                        : !!cloneMode ? clone_WatchParty(url)
                            : add_WatchParty(credentials, url)
                },
                (error) => {
                    setSnackBarData({
                        variant: error.status ? 'success' : 'error',
                        message: error.msg
                    });
                    setOpenSnackbar(true)
                }
            )
        }
        else {
            !!editMode ? edit_WatchParty('') : !!cloneMode ? clone_WatchParty('') : add_WatchParty(credentials, '')
        }
    }
    const edit_WatchParty = (url) => {
        let st = convertToESTTimeZone(new Date(new Date(fields.startTime).setSeconds(0, 0)))
        let et = convertToESTTimeZone(new Date(new Date(fields.endTime).setSeconds(0, 0)))

        const postData = {
            "watchPartyId": fields.watchPartyId,
            "contentName": fields.show,
            "startTime": st,
            "endTime": et,
            "isHidden": fields.isHidden,
            "sports": fields.sports === 'No' ? 'false' : 'true',
            "league": fields.league,
            "platform": fields.platform,
            "contentLength": fields.contentLength,
            "videoUrl": !!url ? url : fields.video,
            "isCustom": isCustom,
            "videoName": fields.videoName
        }

        updateParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            history.push(ROUTES.WATCH_PARTY)
        }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg
            });
            setOpenSnackbar(true)
        })

    }
    const clone_WatchParty = (url) => {
        let st = convertToESTTimeZone(new Date(new Date(fields.startTime).setSeconds(0, 0)))
        let et = convertToESTTimeZone(new Date(new Date(fields.endTime).setSeconds(0, 0)))

        if (fields.show == watchPartyForUpdate.contentName) {
            setSnackBarData({
                variant: 'error',
                message: 'Kindly select different name for clone watch party.'
            });
            setOpenSnackbar(true)
            return;
        }
        const postData = {
            "watchPartyId": fields.watchPartyId,
            "contentName": fields.show,
            "startTime": st,
            "endTime": et,
            "isHidden": fields.isHidden,
            "sports": fields.sports === 'No' ? 'false' : 'true',
            "league": fields.league,
            "platform": fields.platform,
            "contentLength": fields.contentLength,
            "videoUrl": !!url ? url : fields.video,
            "isCustom": isCustom,
            "videoName": fields.videoName
        }
        console.log('postData clone', postData)
        cloneWatchParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            history.push(ROUTES.WATCH_PARTY)
        }, (error) => {
            setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg
            });
            setOpenSnackbar(true)
        })

    }

    useEffect(() => {
        let arr = [];

        allPlatforms && allPlatforms.map(platform => {
            let obj = { value: platform._id, label: platform.name }
            arr.push(obj);
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

    const add_WatchParty = (credentials, url) => {
        let st = convertToESTTimeZone(new Date(new Date(fields.startTime).setSeconds(0, 0)))
        let et = convertToESTTimeZone(new Date(new Date(fields.endTime).setSeconds(0, 0)))
        let postData = {
            "contentName": fields.show,
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


        if (postData['league'] === "") {
            delete postData['league']
        }


        addWatchParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            history.push(ROUTES.WATCH_PARTY)
        },
            (error) => {

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
        if (editMode || cloneMode) {
            initialParty = { ...fields }
        }
    }, [fields])


    const updateVideoData = (file, name) => {
        onChangeField('videoName', name)
        updateVideoFileData(file)
        updateIsCustom(true)
        updateRemoveVideoOption(false)
    }


    useEffect(() => {

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
                            <h1>{!!editMode ? PAGE_TITLES.EDIT_WATCH_PARTY : !!cloneMode ? PAGE_TITLES.CLONE_WATCH_PARTY : PAGE_TITLES.ADD_NEW_WATCH_PARTY}</h1>
                        </div>

                        <Form onSubmit={handleSubmit(onsubmit)} >
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

                                <div class='col-md-6'>
                                    <label>{STRINGS.SPORTS} </label>
                                    <Field
                                        name={STRINGS.SPORTS_NAME}
                                        component={Select}
                                        options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                                        value={selectedSport}
                                        placeholder={'Sports'}
                                        onChange={value => {

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
                                                component={KeyboardDateTimePickerr}
                                                placeholder={'End Time'}
                                                // minDate={new Date()}

                                                defaultValue={fields.endTime}
                                                minDate={fields.startTime}
                                                minTime={fields.startTime}
                                                onChangeDate={(value) => {
                                                    onChangeField('endTime', value)
                                                }}
                                            />
                                            {/* <Field
                                                name={STRINGS.END_TIME}
                                                component={TimePickerInputField}
                                                placeholder={'End Time'}
                                                defaultValue={fields.endTime}
                                                minTime={fields.startTime}
                                                onChangeTime={time => {
                                                    onChangeField('endTime', changeEndDate(fields.startTime, time))
                                                }}
                                            /> */}
                                        </div>
                                    </div>
                                </div>
                                <div class={`col-md-${editMode || cloneMode ? '4' : '6'}`}>
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
                                {(!!editMode || !!cloneMode) && <div style={{ display: 'flex', flexDirection: 'column' }} class="col-md-2">
                                    <label>{STRINGS.SHOWN} </label>
                                    <div className='css-yk16xz-control' style={{ alignItems: 'center', borderWidth: 0 }} >
                                        <Switch
                                            checked={!fields.isHidden}
                                            checkedIcon={false}
                                            height={24}
                                            onChange={(val) => onChangeField('isHidden', !val)}
                                            onColor={'#64d2ff'}
                                            uncheckedIcon={false}
                                            width={48}
                                        />
                                    </div>
                                </div>}
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

                            </div>
                            <div className="btn_group  col-md-12" style={{ alignSelf: 'left' }}>
                                <InputSubmit buttonLabel={!!editMode ? PAGE_TITLES.EDIT_WATCH_PARTY : !!cloneMode ? PAGE_TITLES.CLONE_WATCH_PARTY : PAGE_TITLES.ADD_WATCH_PARTY} />
                            </div>
                        </Form>

                    </div>
                </>
            }
        </div>
    );
};

const showForm = reduxForm({
    form: "watchparty",
    onSubmitFail,
    validate: validator,
    enableReinitialize: true
})(WatchPartyForm);

const mapStateToProps = (state, props) => {
    let path = props.history.location.pathname;
    let cloneMode = path == '/clone-watch-party';
    if (Object.keys(initialParty).length > 0) {
        let initialValues = {
            show: !!cloneMode ? '' : initialParty && initialParty.show,
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
}

const mapDispatchToProps = (state, props) => {
    return {}
}

export const Screen = connect(mapStateToProps, mapDispatchToProps)(showForm);

