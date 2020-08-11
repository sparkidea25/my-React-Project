import React, { Component, useState, useEffect } from 'react'
import moment from 'moment';
const { CustomPagination } = require('../../../../components/atoms/pagination')
const { TimePickerInput } = require('../../../../components/atoms/time-picker')
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { SPORTS_OPTIONS, MONTH_OPTIONS, DAY_OPTIONS } = require('../../../../shared/constants/constants')
const { STRINGS } = require('../../../../shared/constants/us/strings')
export const Screen = ({ listWatchParty,
    allPlatforms, allLeagues, watchPartyListing, updateParty, LiveTotalCount }) => {

    useEffect(() => {
        postWatchPartyApi({ skip: 0, limit: STRINGS.SHOW_LIMIT })

    }, [])

    const postWatchPartyApi = (data) => {
        let postData = Object.keys(data)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
            ).join('&');
        listWatchParty(postData, () => { }, () => { })
    }

    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    const [editMode, setEditMode] = useState(false)
    const [rowToEdit, setRowToEdit] = useState(null)
    const [liveTableIndex, setLiveTableIndex] = useState(0)
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
            date: moment(party && party.startTime).format('Do').split('th')[0],
            time: party && party.startTime,
            endTime: party && party.endTime,
            joined: party && party.joined,
            interested: party && party.interested,
            contentLength: party && party.contentLength,
            watchPartyId: party && party._id
        })
        setRowToEdit(index)
        setEditMode(true)
    }
    const updateWatchParty = () => {
        const postData = {
            "watchPartyId": fields.watchPartyId,
            "contentName": fields.show,
            "host": fields.host,
            "startTime": fields.time,
            "endTime": fields.endTime,
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
            postWatchPartyApi({ skip: liveTableIndex, limit: STRINGS.SHOW_LIMIT })
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
    useEffect(() => {

    }, [rowToEdit])
    useEffect(() => {

    }, [editMode])
    useEffect(() => {

    }, [fields])
    return (
        <div className="container-fluid">
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div className="content-panel">
                <div className="page-title">
                    <h1>Content Management</h1>
                </div>
                <div className="managment_list">
                    <div class="d-flex table_title">
                        <h3>Live & Upcoming</h3>
                        <div class="up_btn">
                            <button class="btn btn-md btn-primary">Upload</button>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
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
                            </thead>
                            <tbody>
                                {watchPartyListing && watchPartyListing.map((party, index) => {
                                    return <tr>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <input type="text" placefolder="Content Name" value={fields.show} onChange={(e) => updateFields('show', e.target.value)} />
                                                : party.contentName}
                                        </div></td>
                                        <td><div className="input_field">{index === rowToEdit && editMode === true ?
                                            <input type="text" placefolder="Host Name" value={fields.host} onChange={(e) => updateFields('host', e.target.value)} />
                                            : party.host} </div></td>
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
                                                <select value={fields.month} onChange={(e) => updateFields('month', e.target.value)}>

                                                    {
                                                        MONTH_OPTIONS && MONTH_OPTIONS.map(month => {
                                                            return <option>{month && month.value}</option>
                                                        })
                                                    }
                                                </select>
                                                : moment(party && party.startTime).format('MMM')}
                                        </div></td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ? <select value={fields.date}
                                                onChange={(e) => updateFields('date', e.target.value)}
                                            >
                                                {
                                                    DAY_OPTIONS && DAY_OPTIONS.map(day => {
                                                        return <option>{day && day.value}</option>
                                                    })
                                                }
                                            </select> : moment(party && party.startTime).format('Do')}
                                        </div></td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?

                                                <TimePickerInput
                                                    value={fields.time}
                                                    onChangeTime={(time) => { updateFields('time', time) }}
                                                />
                                                : moment(party && party.startTime).format('LT')}
                                        </div></td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?

                                                <TimePickerInput
                                                    value={fields.endTime}
                                                    onChangeTime={(time) => { updateFields('endTime', time) }}
                                                />
                                                : moment(party && party.endTime).format('LT')}
                                        </div></td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ? <input type="number" value={fields.contentLength}
                                                onChange={(e) => updateFields('contentLength', e.target.value)}
                                            /> : party.contentLength}
                                        </div>
                                        </td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <input type="number" value={fields.joined} onChange={(e) => updateFields('joined', e.target.value)} /> : party.joined}
                                        </div>
                                        </td>
                                        <td><div className="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <input type="number" value={fields.interested} onChange={(e) => updateFields('interested', e.target.value)} /> : party.interested}
                                        </div>
                                        </td>
                                        <td> {index === rowToEdit && editMode === true ?
                                            <button className="btn btn-sm btn-secondary" onClick={() => updateWatchParty(index)}>Done</button>
                                            : <button className="btn btn-sm btn-secondary" onClick={() => editRow(index, party)}>Edit</button>
                                        }
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        <CustomPagination
                            limit={STRINGS.SHOW_LIMIT}
                            totalPages={LiveTotalCount}
                            itemsCount={watchPartyListing && watchPartyListing.length}
                            currentPage={liveTableIndex + 1}
                            onPageChange={(value) => {
                                console.log('skip', (value && value.selected - 1) * STRINGS.SHOW_LIMIT)
                                postWatchPartyApi({ limit: STRINGS.SHOW_LIMIT, skip: (value && value.selected) * STRINGS.SHOW_LIMIT })
                                setLiveTableIndex(value && value.selected)

                            }}
                        />
                    </div>
                </div>
                <div className="managment_list">
                    <h3>Past</h3>
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
                                    <th>Content lenght</th>
                                    <th>Joined</th>
                                    <th>Intrested </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="preview_mode">
                                    <td><div className="input_field"><input type="text" placeholder="Content Name" /></div></td>
                                    <td><div className="input_field"><input type="text" placeholder="Host Name" /></div></td>
                                    <td>
                                        <div className="input_field">
                                            <select>
                                                <option>Select</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input_field">
                                            <select>
                                                <option>Select</option>
                                                <option>NBA</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input_field">
                                            <select>
                                                <option>Select</option>
                                                <option>TNT</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="input_field">
                                            <select>
                                                <option>Select</option>
                                                <option>Jan</option>
                                                <option>Feb</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td><div className="input_field"><input type="date" /></div></td>
                                    <td><div className="input_field"><input type="time" /></div></td>
                                    <td><div className="input_field"><input type="number" /></div></td>
                                    <td><div className="input_field"><input type="number" value="1" /></div></td>
                                    <td><div className="input_field"><input type="number" value="1" /></div></td>
                                    <td style={{ minWidth: '86px' }}> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}