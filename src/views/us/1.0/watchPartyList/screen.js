import React, { Component, useState, useEffect } from 'react'
import moment from 'moment';
import { ROUTES } from '../../../../shared/constants';
import { Field } from "redux-form";
const { CustomPagination } = require('../../../../components/atoms/pagination')
const { TimePickerInput } = require('../../../../components/atoms/time-picker')
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const {
    Input,
} = require(`../../../../components/atoms/input`);
const { SPORTS_OPTIONS, MONTH_OPTIONS, DAY_OPTIONS } = require('../../../../shared/constants/constants')
const { STRINGS } = require('../../../../shared/constants/us/strings')
const { FieldDatePickerr } = require('../../../../components/atoms/field-date-picker')
// moment.tz.setDefault("America/New_York");
const copyDate = (date, time) => {
    time = time ? new Date(time) : new Date()
    date = date ? new Date(date) : new Date()
    time.setDate(date.getDate());
    time.setMonth(date.getMonth());
    time.setYear(date.getFullYear());
    console.log(time, 'check time')
    return time;
}

const convertToClientTimeZone = (date, format, type) => {
    // console.log('xhexk date utc', date, type)
    if (date) {
        // console.log(moment(date).toDate(), 'check new stamp')
        var localZone = moment.tz.guess();
        var zoneOffset = moment.tz.zone(localZone).utcOffset(new Date().getTime()) * 60000;
        var estOffset = moment.tz.zone('America/New_York').utcOffset(new Date().getTime()) * 60000;
        // console.log('xhexk date pdt', moment(new Date(date).getTime()).format(format), type)
        if (type) {
            return moment(new Date(date).getTime()).format(format)
        }
    }
}

const convertTimeForEdit = (date, type) => {
    console.log('xhexk date while edit', date, type)
    if (date) {
        // console.log(moment(date).toDate(), 'check new stamp')
        var localZone = moment.tz.guess();

        var zoneOffset = moment.tz.zone(localZone).utcOffset(new Date().getTime()) * 60000;

        var estOffset = moment.tz.zone('America/New_York').utcOffset(new Date().getTime()) * 60000;
        // console.log(zoneOffset, localZone, estOffset)

        console.log(moment(new Date(date).getTime() - estOffset + zoneOffset).format())
        console.log(moment((new Date(date).getTime() - (2 * zoneOffset) - estOffset)).toISOString(), 'check before update')
        // console.log('check before update', moment(new Date(date).getTime()).format('hh:mm A'))
        return moment(new Date(date).getTime() - estOffset + zoneOffset).format()
    }
}

export const Screen = ({ listWatchParty, history,
    allPlatforms, allLeagues, updateParty, getPlatforms, getLeagues, listPastWatchParty, getSports }) => {

    const [upcomingAndLiveListing, setUpcomingAndLiveListing] = useState([])
    const [pastListing, setPastListing] = useState([])
    const [LiveTotalCount, setLiveTotalCount] = useState(0)
    const [PastTotalCount, setPastTotalCount] = useState(0)
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

        postWatchPartyApi({ skip: 0, limit: STRINGS.SHOW_LIMIT, filter: 2 }, (response) => {

            setUpcomingAndLiveListing(response && response.watchPartyListing)
            setLiveTotalCount(response && response.totalCount)
        })
        pastWatchPartyApi({ skip: 0, limit: STRINGS.SHOW_LIMIT, filter: 3 }, (response) => {

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
            date: convertTimeForEdit(party && party.startTime),//moment(party && party.startTime).format('Do').split('th')[0],
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
        // console.log(estOffset, 'estOffset')
        // console.log(moment(date.getTime() - zoneOffset + estOffset).toISOString(), 'toISOString')
        return moment(date.getTime() - zoneOffset + estOffset).toISOString()
    }

    const updateWatchParty = () => {
        let st = convertToServerTimeZone(fields.time)
        let et = convertToServerTimeZone(fields.endTime)
        // const stime = moment.utc(date)
        // console.log({ fields });
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

        // console.log('chcek uo', postData)

        updateParty(postData, (response) => {
            setSnackBarData({
                variant: response.status ? 'success' : 'error',
                message: response.msg
            });
            setOpenSnackbar(true)
            postWatchPartyApi({ skip: (liveTableIndex) * STRINGS.SHOW_LIMIT, limit: STRINGS.SHOW_LIMIT, filter: 2 }, (response) => {
                setUpcomingAndLiveListing(response && response.watchPartyListing)
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
    const updateFields = (type, value) => {

        setFields({ ...fields, [type]: value })
    }

    const validateFields = (type) => {
        // console.log(type)
        if (fields[type] === '') {
            return `${type} is required.`
        } else {
            return ''
        }
    }

    useEffect(() => {

    }, [rowToEdit])
    useEffect(() => {

    }, [editMode])
    useEffect(() => {
        // console.log(fields, 'check fields')
    }, [fields])
    useEffect(() => {
        changeStartTime()
    }, [fields.endTime])
    useEffect(() => {
        changeStartTime()
    }, [fields.time])
    const diff_minutes = (dt2, dt1) => {
        dt2 = new Date(dt2)
        dt1 = new Date(dt1)

        var diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    }
    const changeStartTime = () => {
        let min = diff_minutes(fields.time, fields.endTime)
        updateFields('contentLength', min)
    }


    useEffect(() => {
        console.log('check watch fields', fields)
    }, [fields])

    useEffect(() => {


    }, [fields.date])

    // console.log({ fields })
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
                    <h1 class="col-md-6">Content Management</h1>
                    <div class="col-md-6">
                        <div class="form-row group-btn justify-content-end">
                            <button class="btn btn-md btn-primary" onClick={(() => history.push(ROUTES.CONTENT))}>Upload New</button>
                            <button class="btn btn-md btn-primary" onClick={(() => history.push(ROUTES.ADD_WATCH_PARTY))}>Add New</button>
                        </div>
                    </div>
                </div>

                <div className="managment_list">
                    <div class="d-flex table_title">
                        <h3>Live & Upcoming</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <th>Show</th>
                                <th>Host</th>
                                <th>Sports</th>
                                <th>League</th>
                                <th>Platform</th>
                                {/* <th>Month</th> */}
                                <th>Date</th>
                                <th>Time (EST).</th>
                                <th>End Time</th>
                                <th>Content length</th>
                                <th>Joined</th>
                                <th>Interested </th>
                                <th></th>
                            </thead>
                            <tbody>
                                {upcomingAndLiveListing && upcomingAndLiveListing.length > 0 ? upcomingAndLiveListing.map((party, index) => {
                                    return <tr key={index}>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <> <input name="Content Name" type="text" placefolder="Content Name"

                                                    value={fields.show}
                                                    onChange={(e) => updateFields('show', e.target.value)}


                                                />
                                                    {fields.show === '' ? (
                                                        <>
                                                            <span className="error_msg text-danger">{validateFields('show')}</span></>
                                                    ) : null}</>
                                                : party.contentName}

                                        </div></td>
                                        <td><div className="input_field">{index === rowToEdit && editMode === true ? <>
                                            <input type="text" placefolder="Host Name" value={fields.host} onChange={(e) => updateFields('host', e.target.value)} />
                                            {fields.host === '' ? (
                                                <>
                                                    <span className="error_msg text-danger">{validateFields('host')}</span></>
                                            ) : null}</>
                                            : party.host}

                                        </div></td>
                                        <td>
                                            <div className="input_field">

                                                {index === rowToEdit && editMode === true ?
                                                    <select value={fields.sports} onChange={(e) => updateFields('sports', e.target.value)}>
                                                        {SPORTS_OPTIONS.map(sport => {
                                                            return <option>{sport && sport.value}</option>
                                                        })}
                                                    </select>
                                                    : party && party.sports === true ? 'Yes' : 'No'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="input_field">
                                                {index === rowToEdit && editMode === true ?
                                                    <select value={fields.league} onChange={(e) => updateFields('league', e.target.value)}>
                                                        {allLeagues && allLeagues.map(league => {
                                                            return <option value={league._id}>{league && league.name}</option>
                                                        })}
                                                    </select> : party && party.leagueInfo && party.leagueInfo.name}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="input_field">
                                                {index === rowToEdit && editMode === true ?
                                                    <select value={fields.platform} onChange={(e) => updateFields('platform', e.target.value)}>
                                                        {allPlatforms && allPlatforms.map(platform => {
                                                            return <option value={platform._id}>{platform && platform.name}</option>
                                                        })}
                                                    </select>
                                                    : party && party.platformInfo && party.platformInfo.name}
                                            </div>
                                        </td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <>
                                                    <FieldDatePickerr
                                                        value={(fields.date)}
                                                        onChangeDate={(value) => {

                                                            updateFields('date', value)
                                                            console.log(value, 'check updation')
                                                            updateFields('endTime', copyDate(fields.date, fields.endTime))
                                                            updateFields('time', copyDate(fields.date, fields.time))

                                                        }}

                                                    /></> :
                                                convertToClientTimeZone(party && party.startTime, 'Do MMM', party && party.contentName)
                                                // .format('Do MMM')
                                            }
                                        </div></td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?

                                                <TimePickerInput
                                                    value={fields.time}
                                                    minTime={new Date()}

                                                    onChangeTime={(time) => {

                                                        updateFields('time', copyDate(fields.date, time))
                                                    }}
                                                />
                                                : convertToClientTimeZone(party && party.startTime, "hh:mm A", party && party.contentName)
                                                // .format('LT')
                                            }
                                        </div></td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?

                                                <TimePickerInput
                                                    value={fields.endTime}
                                                    minTime={new Date()}
                                                    onChangeTime={(time) => {
                                                        updateFields('endTime', copyDate(fields.date, time))
                                                        // changeStartTime('endTime', time)
                                                    }}
                                                />
                                                : convertToClientTimeZone(party && party.endTime, "hh:mm A", party && party.contentName)
                                                // .format('LT')
                                            }

                                        </div></td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ? <input type="number" value={fields.contentLength}
                                                readonly={true} />
                                                : party.contentLength}
                                        </div>
                                        </td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <input type="number" value={fields.joined} onChange={(e) => updateFields('joined', e.target.value)} readOnly={true} /> : party.joined}
                                        </div>
                                        </td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <input type="number" value={fields.interested} onChange={(e) => updateFields('interested', e.target.value)} readOnly={true} /> : party.interested}
                                        </div>
                                        </td>
                                        <td> {index === rowToEdit && editMode === true ?
                                            <button className="btn btn-sm btn-secondary" onClick={() => updateWatchParty(index)}>Done</button>
                                            : <button className="btn btn-sm btn-secondary" onClick={() => editRow(index, party)}>Edit</button>
                                        }
                                        </td>
                                    </tr>
                                }) : 'No Watch Parties found.'}
                            </tbody>
                        </table>
                        <CustomPagination
                            limit={STRINGS.SHOW_LIMIT}
                            totalPages={LiveTotalCount}
                            itemsCount={upcomingAndLiveListing && upcomingAndLiveListing.length}
                            currentPage={liveTableIndex + 1}
                            onPageChange={(value) => {

                                postWatchPartyApi({ limit: STRINGS.SHOW_LIMIT, skip: (value && value.selected) * STRINGS.SHOW_LIMIT, filter: 2 }, (response) => {
                                    setUpcomingAndLiveListing(response && response.watchPartyListing)
                                })
                                setLiveTableIndex(value && value.selected)

                            }}
                        />
                    </div>
                </div>
                <div className="managment_list">
                    <div class="d-flex table_title">
                        <h3>Past</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Show</th>
                                    <th>Host</th>
                                    <th>Sports</th>
                                    <th>League</th>
                                    <th>Platform</th>
                                    <th>Month</th>
                                    <th>Date</th>
                                    <th>Time (EST).</th>
                                    <th>End Time</th>
                                    <th>Content length</th>
                                    <th>Joined</th>
                                    <th>Interested </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {pastListing && pastListing.length > 0 ? pastListing.map((pastParty, index) => {
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
                                                {moment(pastParty && pastParty.startTime).format('MMM').toUpperCase()}
                                            </div>
                                        </td>
                                        <td><div className="input_field">{moment(pastParty && pastParty.startTime).format('Do').split('th')[0]}</div></td>
                                        <td><div className="input_field">{moment(pastParty && pastParty.startTime).format('LT')}</div></td>
                                        <td><div className="input_field">{moment(pastParty && pastParty.endTime).format('LT')}</div></td>
                                        <td><div className="input_field">{pastParty.contentLength}</div></td>
                                        <td><div className="input_field">{pastParty.joined}</div></td>
                                        <td><div className="input_field">{pastParty.interested}</div></td>
                                        <td style={{ minWidth: '86px' }}> </td>
                                    </tr>
                                }) : 'No Watch Parties found.'}
                            </tbody>
                        </table>
                        <CustomPagination
                            limit={STRINGS.SHOW_LIMIT}
                            totalPages={PastTotalCount}
                            itemsCount={pastListing && pastListing.length}
                            currentPage={PastTableIndex + 1}
                            onPageChange={(value) => {

                                pastWatchPartyApi({ limit: STRINGS.SHOW_LIMIT, skip: (value && value.selected) * STRINGS.SHOW_LIMIT, filter: 3 }, (response) => {
                                    setPastListing(response && response.watchPartyListing)
                                })
                                setPastTableIndex(value && value.selected)

                            }}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}