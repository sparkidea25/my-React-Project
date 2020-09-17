import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { ROUTES } from '../../../../shared/constants';
const { CustomPagination } = require('../../../../components/atoms/pagination')
const { TimePickerInput } = require('../../../../components/atoms/time-picker')
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const {
    Input,
} = require(`../../../../components/atoms/input`);
const { SPORTS_OPTIONS, PAGE_TITLES, NAME_REGX, LABELS, VALIDATION_MESSAGES, upcomingPartyTable, pastPartyTable } = require('../../../../shared/constants/constants')
const { STRINGS } = require('../../../../shared/constants/us/strings')
const { FieldDatePickerr } = require('../../../../components/atoms/field-date-picker')
const { diff_minutes } = require('../../../../helpers')

const copyDate = (date, time) => {
    time = time ? new Date(time) : new Date()
    date = date ? new Date(date) : new Date()
    time.setDate(date.getDate());
    time.setMonth(date.getMonth());
    time.setYear(date.getFullYear());
    return time;
}

const convertToClientTimeZone = (date, format, type) => {
    if (date) {
        var toEST = new Date(date).setHours(new Date(date).getHours() - 1, new Date(date).getMinutes(), new Date(date).getSeconds(), new Date(date).getMilliseconds())
        if (type) {
            return moment(toEST).format(format)
        }
    }
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

export const Screen = ({ listWatchParty, history,
    allPlatforms, allLeagues, updateParty, getPlatforms, getLeagues, listPastWatchParty, getSports }) => {

    const [upcomingAndLiveListing, setUpcomingAndLiveListing] = useState([])
    const [pastListing, setPastListing] = useState([])
    const [LiveTotalCount, setLiveTotalCount] = useState(0)
    const [PastTotalCount, setPastTotalCount] = useState(0)
    const [liveArrow, setLiveArrow] = useState('asc')
    const [pastArrow, setPastArrow] = useState('asc')

    const postWatchPartyApi = (data, response) => {
        let postData = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        listWatchParty(postData, (resp) => { response(resp) }, () => { })
    }
    const pastWatchPartyApi = (data, response) => {
        let postData = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        listPastWatchParty(postData, (resp) => { response(resp) }, () => { })
    }
    useEffect(() => {
        postWatchPartyApi({ skip: 0, limit: STRINGS.SHOW_LIMIT, filter: 2, sortkey: "startTime", sortOrder: 1 }, (response) => {

            setUpcomingAndLiveListing(response && response.watchPartyListing)
            setLiveTotalCount(response && response.totalCount)
        })
        pastWatchPartyApi({ skip: 0, limit: STRINGS.SHOW_LIMIT, filter: 3, sortkey: "startTime", sortOrder: 1 }, (response) => {

            setPastListing(response && response.watchPartyListing)
            setPastTotalCount(response && response.totalCount)
        })
        getPlatforms(() => { }, () => { })
        getLeagues(() => { }, () => { })
        getSports(() => { }, () => { })

    }, [])

    useEffect(() => {
    }, [upcomingAndLiveListing])

    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [editMode, setEditMode] = useState(false)
    const [rowToEdit, setRowToEdit] = useState(null)
    const [liveTableIndex, setLiveTableIndex] = useState(0)
    const [PastTableIndex, setPastTableIndex] = useState(0)
    const [fields, setFields] = useState({
        show: null,
        host: null,
        sports: '',
        league: '',
        platform: '',
        month: '',
        date: '',
        time: null,
        endTime: null,
        contentLength: '',
        year: null,
        joined: '',
        interested: '',
        watchPartyId: ''
    })


    const editRow = (index, party) => {
        setFields({
            ...fields, watchPartyId: party._id, show: party.contentName, host: party.host,
            sports: party.sports === true ? 'Yes' : 'No', league: party && party.leagueInfo && party.leagueInfo._id,
            platform: party && party.platformInfo && party.platformInfo._id,
            month: moment(party && party.startTime).format('MMM').toUpperCase(),
            date: convertTimeForEdit(party && party.startTime),
            year: moment(party && party.startTime).format('YYYY'),
            time: convertTimeForEdit(party && party.startTime, party && party.contentName),

            endTime: convertTimeForEdit(party && party.endTime),
            joined: party && party.joined,
            interested: party && party.interested,
            contentLength: party && party.contentLength,
            watchPartyId: party && party._id
        })
        setRowToEdit(index)
        setEditMode(true)

    }

    const convertToServerTimeZone = (date) => {
        var localZone = moment.tz.guess();
        var zoneOffset = moment.tz.zone(localZone).utcOffset(new Date().getTime()) * 60000;
        var estOffset = moment.tz.zone('America/New_York').utcOffset(new Date().getTime()) * 60000;
        return moment(date.getTime() - zoneOffset + (estOffset + 3600000)).toISOString()
    }
    const [error, setError] = useState({})

    const updateWatchParty = (index) => {
        let obj = checkValidateFields()
        setLiveArrow('asc')
        setError(obj)

        if (obj['show'] || obj['host'] || obj['time'] || obj['endTime']) {
            return
        }
        else {

            let st = convertToServerTimeZone(new Date(fields.time))
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
                postWatchPartyApi({ skip: (liveTableIndex) * STRINGS.SHOW_LIMIT, limit: STRINGS.SHOW_LIMIT, filter: 2, sortkey: "startTime", sortOrder: 1 }, (response) => {
                    setUpcomingAndLiveListing(response && response.watchPartyListing)
                    setLiveTotalCount(response && response.totalCount)
                })
            }, (error) => {
                setSnackBarData({
                    variant: error.status ? 'success' : 'error',
                    message: error.msg
                });
                setOpenSnackbar(true)
            })
            setEditMode(false)
        }
    }
    const updateFields = (type, value) => {
        if (error[type]) {
            setError({ ...error, [type]: null })
        }
        setFields({ ...fields, [type]: value })
    }

    const checkValidateFields = () => {
        let error = {}
        if (fields.show === '') {

            error['show'] = VALIDATION_MESSAGES.SHOW_NAME_REQUIRED
        }
        if (!NAME_REGX.test(fields.show)) {
            error['show'] = VALIDATION_MESSAGES.NAME_VALIDATION
        }
        if (fields.host === '') {

            error['host'] = VALIDATION_MESSAGES.HOST_REQUIRED
        }
        if (!NAME_REGX.test(fields.host)) {
            error['host'] = VALIDATION_MESSAGES.NAME_VALIDATION
        }
        var localZone = moment.tz.guess();
        let currTime = new Date();
        var zoneOffset = moment.tz(new Date(), localZone).utcOffset();
        var estOffset = moment.tz(new Date(), 'America/New_York').utcOffset();
        currTime = currTime.setHours((currTime.getHours() - (zoneOffset / 60) + (estOffset / 60)), (currTime.getMinutes() - (zoneOffset % 60) + (estOffset % 60)), 0)

        if (new Date(fields.time) < new Date(currTime)) {
            error['time'] = VALIDATION_MESSAGES.TIME_SHOUDLD_NOT_BE_IN_PAST
        }
        if (new Date(fields.endTime) < new Date(currTime)) {
            error['endTime'] = VALIDATION_MESSAGES.END_TIME_SHOUDLD_NOT_BE_IN_PAST
        }

        if (diff_minutes(fields.time, fields.endTime) == 0) {
            error['endTime'] = VALIDATION_MESSAGES.SAME_TIME_VALIDATION
        }


        if (new Date(fields.endTime) < new Date(fields.time)) {

            error['endTime'] = VALIDATION_MESSAGES.START_TIME_SHOULD_BE_AHEAD
        }
        setError(error)
        return error
    }

    useEffect(() => {

    }, [rowToEdit])
    useEffect(() => {

    }, [editMode])
    useEffect(() => {

    }, [fields])
    useEffect(() => {
        changeStartTime()
    }, [fields.endTime])
    useEffect(() => {
        changeStartTime()
    }, [fields.time])

    const changeStartTime = () => {
        let min = diff_minutes(fields.time, fields.endTime)
        updateFields('contentLength', min)
    }


    useEffect(() => {
    }, [fields])

    useEffect(() => {
        updateFields('time', copyDate(fields.date, fields.time))
    }, [fields.date])

    useEffect(() => {
        updateFields('endTime', copyDate(fields.date, fields.endTime))
    }, [fields.time])

    const sortAscending = (sortkey, type, order) => {
        let key = (sortkey === 'Show') ? 'contentName' : (sortkey === 'Time (EST)') ? 'startTime' : ''
        if (type === 2 && !editMode) {
            order === 1 ? setLiveArrow('asc') : setLiveArrow('des')
            postWatchPartyApi({ skip: (liveTableIndex) * STRINGS.SHOW_LIMIT, limit: STRINGS.SHOW_LIMIT, filter: 2, sortKey: key, sortOrder: order }, (response) => {
                setUpcomingAndLiveListing(response && response.watchPartyListing)
                setLiveTotalCount(response && response.totalCount)
            })
        }
        if (type === 3) {
            order === 1 ? setPastArrow('asc') : setPastArrow('des')
            pastWatchPartyApi({ skip: 0, limit: STRINGS.SHOW_LIMIT, filter: 3, sortKey: key, sortOrder: order }, (response) => {
                setPastListing(response && response.watchPartyListing)
                setPastTotalCount(response && response.totalCount)
            })
        }
    }

    return (
        <div className="container-fluid">
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div className="content-panel">
                <div className="row align-items-center page-title">
                    <h1 class="col-md-6">{PAGE_TITLES.CONTENT_MANGEMENT}</h1>
                    <div class="col-md-6">
                        <div class="form-row group-btn justify-content-end">
                            <button class="btn btn-md btn-primary" onClick={(() => history.push(ROUTES.UPLOAD_WATCH_PARTY))}>Upload New</button>
                            <button class="btn btn-md btn-primary" onClick={(() => history.push(ROUTES.ADD_WATCH_PARTY))}>Add New</button>
                        </div>
                    </div>
                </div>

                <div className="managment_list">
                    <div class="d-flex table_title">
                        <h3>{LABELS.LIVE_UPCOMING}</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                {upcomingPartyTable && upcomingPartyTable.map(party => {
                                    return <th>{party && party.name}
                                        <div className="sorting">
                                            {(party.name === 'Show' || party.name === 'Time (EST)') ? <><span className={liveArrow === 'des' ? 'active' : ''} onClick={() => sortAscending(party.name, 2, -1)} ><img src={require('../../../../assets/img/icons/down_arrow.png')} alt="down" /></span>
                                                <span className={liveArrow === 'asc' ? 'active' : ''} onClick={() => sortAscending(party.name, 2, 1)}><img src={require('../../../../assets/img/icons/up_arrow.png')} alt="up" /></span></> : ''}
                                        </div>
                                    </th>
                                })}
                            </thead>
                            <tbody>

                                {upcomingAndLiveListing && upcomingAndLiveListing.length > 0 ?
                                    <>
                                        {upcomingAndLiveListing.map((party, index) => {
                                            return index === rowToEdit && editMode === true ?

                                                <tr key={index}>
                                                    <td><div className="input_field">
                                                        <input name="Content Name" type="text" placefolder="Content Name"
                                                            value={fields.show}
                                                            onChange={(e) => {
                                                                updateFields('show', e.target.value)

                                                            }}
                                                        />

                                                        {error && error.show ? (
                                                            <span className="error_msg text-danger">{error.show}</span>
                                                        ) : null}
                                                    </div></td>
                                                    <td><div className="input_field">
                                                        <input type="text" placefolder="Host Name" value={fields.host}
                                                            onChange={(e) => updateFields('host', e.target.value)} />
                                                        {error && error.host !== '' ? (

                                                            <span className="error_msg text-danger">{error.host}</span>
                                                        ) : null}


                                                    </div></td>
                                                    <td>
                                                        <div className="input_field">
                                                            <select value={fields.sports} onChange={(e) => updateFields('sports', e.target.value)}>
                                                                {SPORTS_OPTIONS.map(sport => {
                                                                    return <option>{sport && sport.value}</option>
                                                                })}
                                                            </select>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">

                                                            <select value={fields.league} onChange={(e) => updateFields('league', e.target.value)}>
                                                                {allLeagues && allLeagues.map(league => {
                                                                    return <option value={league._id}>{league && league.name}</option>
                                                                })}
                                                            </select>

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">

                                                            <select value={fields.platform} onChange={(e) => updateFields('platform', e.target.value)}>
                                                                {allPlatforms && allPlatforms.map(platform => {
                                                                    return <option value={platform._id}>{platform && platform.name}</option>
                                                                })}
                                                            </select>

                                                        </div>
                                                    </td>
                                                    <td><div className="input_field">
                                                        <>
                                                            <FieldDatePickerr
                                                                value={(fields.date)}
                                                                onChangeDate={(value) => {
                                                                    updateFields('date', value)
                                                                }}

                                                            /></>

                                                    </div></td>
                                                    <td><div className="input_field">

                                                        <TimePickerInput
                                                            value={fields.time}
                                                            minTime={new Date()}

                                                            onChangeTime={(time) => {

                                                                updateFields('time', copyDate(fields.date, time))
                                                            }}
                                                        />
                                                        {error && error.time ? (
                                                            <span className="error_msg text-danger">{error.time}</span>
                                                        ) : null}


                                                    </div></td>
                                                    <td><div className="input_field">
                                                        <TimePickerInput
                                                            value={fields.endTime}
                                                            minTime={new Date()}
                                                            onChangeTime={(time) => {
                                                                updateFields('endTime', copyDate(fields.date, time))

                                                            }}
                                                        />
                                                        {error && error.endTime ? (
                                                            <span className="error_msg text-danger">{error.endTime}</span>
                                                        ) : null}

                                                    </div></td>
                                                    <td><div className="input_field">
                                                        <input type="number" value={fields.contentLength}
                                                            readonly={true} disabled={true} />

                                                    </div>
                                                    </td>
                                                    <td><div className="input_field">

                                                        <input type="number" value={fields.joined} onChange={(e) => updateFields('joined', e.target.value)} disabled={true} readOnly={true} />

                                                    </div>
                                                    </td>
                                                    <td><div className="input_field">

                                                        <input type="number" value={fields.interested} onChange={(e) => updateFields('interested', e.target.value)} disabled={true} readOnly={true} />

                                                    </div>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-sm btn-secondary" onClick={() => updateWatchParty(index)}>Done</button>


                                                    </td>
                                                </tr> :

                                                <tr>
                                                    <td>
                                                        <div className="input_field">
                                                            {party.contentName}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {party.host ? party.host : 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {party && party.sports === true ? 'Yes' : 'No'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {party && party.leagueInfo && party.leagueInfo.name}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {party && party.platformInfo && party.platformInfo.name}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {convertToClientTimeZone(party && party.startTime, 'Do MMM', party && party.contentName)}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {convertToClientTimeZone(party && party.startTime, "hh:mm A", party && party.contentName)}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {convertToClientTimeZone(party && party.endTime, "hh:mm A", party && party.contentName)}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {party.contentLength}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {party.joined}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {party.interested}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">

                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            <button className="btn btn-sm btn-secondary" onClick={() => {
                                                                //editRow(index, party)
                                                                history.push({
                                                                    pathname: ROUTES.EDIT_WATCH_PARTY,
                                                                    editMode: true,
                                                                    state: {
                                                                        party
                                                                    }
                                                                });
                                                            }}>Edit</button></div></td>
                                                </tr>
                                        })}
                                    </>

                                    : 'No Watch Parties found.'}
                            </tbody>
                        </table>

                    </div>
                    {upcomingAndLiveListing && upcomingAndLiveListing.length > 0 ? <CustomPagination
                        limit={STRINGS.SHOW_LIMIT}
                        totalPages={LiveTotalCount}
                        itemsCount={upcomingAndLiveListing && upcomingAndLiveListing.length}
                        currentPage={liveTableIndex + 1}
                        onPageChange={(value) => {
                            setLiveArrow('asc')
                            postWatchPartyApi({ limit: STRINGS.SHOW_LIMIT, skip: (value && value.selected) * STRINGS.SHOW_LIMIT, filter: 2, sortkey: "startTime", sortOrder: 1 }, (response) => {
                                setUpcomingAndLiveListing(response && response.watchPartyListing)
                                setLiveTotalCount(response && response.totalCount)
                            })
                            setLiveTableIndex(value && value.selected)
                            setEditMode(false)

                        }}
                    /> : ''}
                </div>
                <div className="managment_list">
                    <div class="d-flex table_title">
                        <h3>{LABELS.PAST}</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    {pastPartyTable && pastPartyTable.map(party => {
                                        return <th>{party && party.name}
                                            <div className="sorting">
                                                {(party.name === 'Show' || party.name === 'Time (EST)') ? <><span className={pastArrow === 'des' ? 'active' : ''} onClick={() => sortAscending(party.name, 3, -1)} ><img src={require('../../../../assets/img/icons/down_arrow.png')} alt="down" /></span>
                                                    <span className={pastArrow === 'asc' ? 'active' : ''} onClick={() => sortAscending(party.name, 3, 1)}><img src={require('../../../../assets/img/icons/up_arrow.png')} alt="up" /></span></> : ''}
                                            </div>
                                        </th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {pastListing && pastListing.length > 0 ?
                                    <>
                                        {pastListing.map((pastParty, index) => {
                                            return <tr className="preview_mode" key={index}>
                                                <td><div className="input_field">{pastParty.contentName}</div></td>
                                                <td><div className="input_field">{pastParty.host}</div></td>
                                                <td>
                                                    <div className="input_field">
                                                        {pastParty && pastParty.sports === true ? 'Yes' : 'No'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {pastParty && pastParty.leagueInfo && pastParty.leagueInfo.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {pastParty && pastParty.platformInfo && pastParty.platformInfo.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {convertToClientTimeZone(pastParty && pastParty.startTime, 'MMM', pastParty && pastParty.contentName)}

                                                    </div>
                                                </td>
                                                <td><div className="input_field">
                                                    {convertToClientTimeZone(pastParty && pastParty.startTime, 'Do', pastParty && pastParty.contentName)}
                                                </div>
                                                </td>
                                                <td><div className="input_field">
                                                    {convertToClientTimeZone(pastParty && pastParty.startTime, 'LT', pastParty && pastParty.contentName)}
                                                </div></td>
                                                <td><div className="input_field">
                                                    {convertToClientTimeZone(pastParty && pastParty.endTime, 'LT', pastParty && pastParty.contentName)}
                                                </div></td>
                                                <td><div className="input_field">{pastParty.contentLength}</div></td>
                                                <td><div className="input_field">{pastParty.joined}</div></td>
                                                <td><div className="input_field">{pastParty.interested}</div></td>
                                                <td style={{ minWidth: '86px' }}> </td>
                                            </tr>
                                        })}

                                    </> : 'No Watch Parties found.'}
                            </tbody>
                        </table>
                    </div>
                    {pastListing && pastListing.length > 0 ? <CustomPagination
                        limit={STRINGS.SHOW_LIMIT}
                        totalPages={PastTotalCount}
                        itemsCount={pastListing && pastListing.length}
                        currentPage={PastTableIndex + 1}
                        onPageChange={(value) => {
                            setPastArrow('asc')
                            pastWatchPartyApi({ limit: STRINGS.SHOW_LIMIT, skip: (value && value.selected) * STRINGS.SHOW_LIMIT, filter: 3, sortkey: "startTime", sortOrder: 1 }, (response) => {
                                setPastListing(response && response.watchPartyListing)
                            })
                            setPastTableIndex(value && value.selected)

                        }}
                    /> : ''}
                </div>

            </div>
        </div >
    )
}