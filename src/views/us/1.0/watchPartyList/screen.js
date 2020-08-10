import React, { Component, useState, useEffect } from 'react'
import moment from 'moment';
const { CustomPagination } = require('../../../../components/atoms/pagination')
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const { TimePickerInput } = require('../../../../components/atoms/time-picker')
const { SPORTS_OPTIONS, MONTH_OPTIONS, DAY_OPTIONS } = require('../../../../shared/constants/constants')

export const Screen = ({ listWatchParty, getPlatforms, getLeagues,
    allPlatforms, allLeagues, watchPartyListing, getSports, updateParty }) => {
    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });
    useEffect(() => {
        listWatchParty(() => { }, () => { })
        getPlatforms(() => { }, () => { })
        getLeagues(() => { }, () => { })
        getSports(() => { }, () => { })

    }, [])
    const [editMode, setEditMode] = useState(false)
    const [rowToEdit, setRowToEdit] = useState(null)
    const [fields, setFields] = useState({
        show: null,
        host: null,
        sports: '',
        league: '',
        platform: '',
        month: '',
        date: '',
        time: null,
        contentLength: '',
        joined: '',
        interested: '',
        watchPartyId: ''
    })

    const editRow = (index, party) => {
        setFields({
            ...fields, watchPartyId: party._id, show: party.contentName, host: party.host,
            sports: party.sports, league: party && party.leagueInfo && party.leagueInfo._id,
            platform: party && party.platformInfo && party.platformInfo._id,
            month: moment(party && party.startTime).format('MMM').toUpperCase(),
            date: moment(party && party.startTime).format('Do').split('th')[0],
            time: party && party.startTime,
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
            listWatchParty(() => { }, () => { })
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
        <div class="container-fluid">
            <SnackbarWrapper
                visible={openSnackBar}
                onClose={() => setOpenSnackbar(false)}
                variant={snackbarData.variant}
                message={snackbarData.message}
            />
            <div class="content-panel">
                <div class="page-title">
                    <h1>Content Management</h1>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <th>Show</th>
                            <th>Host</th>
                            <th>Sports</th>
                            <th>League</th>
                            <th>Platform</th>
                            <th>Month</th>
                            <th>Date</th>
                            <th>Time (EST).</th>
                            <th>Content length</th>
                            <th>Joined</th>
                            <th>Interested </th>
                            <th></th>
                        </thead>
                        <tbody>
                            {watchPartyListing && watchPartyListing.map((party, index) => {
                                return <tr>
                                    <td><div class="input_field">
                                        {index === rowToEdit && editMode === true ?
                                            <input type="text" placefolder="Content Name" value={fields.show} onChange={(e) => updateFields('show', e.target.value)} />
                                            : party.contentName}
                                    </div></td>
                                    <td><div class="input_field">{index === rowToEdit && editMode === true ?
                                        <input type="text" placefolder="Host Name" value={fields.host} onChange={(e) => updateFields('host', e.target.value)} />
                                        : party.host} </div></td>
                                    <td>
                                        <div class="input_field">

                                            {index === rowToEdit && editMode === true ?
                                                <select value={fields.sports === true ? 'Yes' : 'No'} onChange={(e) => updateFields('sports', e.target.value)}>
                                                    {SPORTS_OPTIONS.map(sport => {
                                                        return <option>{sport && sport.value}</option>
                                                    })}
                                                </select>
                                                : party && party.sports}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <select value={fields.league} onChange={(e) => updateFields('league', e.target.value)}>
                                                    {allLeagues && allLeagues.map(league => {
                                                        return <option value={league._id}>{league && league.name}</option>
                                                    })}
                                                </select> : party && party.leagueInfo && party.leagueInfo.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div class="input_field">
                                            {index === rowToEdit && editMode === true ?
                                                <select value={fields.platform} onChange={(e) => updateFields('platform', e.target.value)}>
                                                    {allPlatforms && allPlatforms.map(platform => {
                                                        return <option value={platform._id}>{platform && platform.name}</option>
                                                    })}
                                                </select>
                                                : party && party.platformInfo && party.platformInfo.name}
                                        </div>
                                    </td>
                                    <td><div class="input_field">
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
                                    <td><div class="input_field">
                                        {index === rowToEdit && editMode === true ? <select value={fields.date}
                                            onChange={(e) => updateFields('date', e.target.value)}
                                        >
                                            {
                                                DAY_OPTIONS && DAY_OPTIONS.map(day => {
                                                    return <option>{fields.date !== '' ? fields.date : day && day.value}</option>
                                                })
                                            }
                                        </select> : moment(party && party.startTime).format('Do')}
                                    </div></td>
                                    <td><div class="input_field">
                                        {index === rowToEdit && editMode === true ?

                                            <TimePickerInput
                                                value={fields.time}
                                                onChangeTime={(time) => { updateFields('time', time) }}
                                            />
                                            : moment(party && party.startTime).format('LT')}
                                    </div></td>
                                    <td><div class="input_field">
                                        {index === rowToEdit && editMode === true ? <input type="number" value={fields.contentLength}
                                            onChange={(e) => updateFields('contentLength', e.target.value)}
                                        /> : party.contentLength}
                                    </div>
                                    </td>
                                    <td><div class="input_field">
                                        {index === rowToEdit && editMode === true ?
                                            <input type="number" value={fields.joined} onChange={(e) => updateFields('joined', e.target.value)} /> : party.joined}
                                    </div>
                                    </td>
                                    <td><div class="input_field">
                                        {index === rowToEdit && editMode === true ?
                                            <input type="number" value={fields.interested} onChange={(e) => updateFields('interested', e.target.value)} /> : party.interested}
                                    </div>
                                    </td>
                                    <td> {index === rowToEdit && editMode === true ?
                                        <button class="btn btn-sm btn-primary" onClick={() => updateWatchParty(index)}>Done</button>
                                        : <button class="btn btn-sm btn-primary" onClick={() => editRow(index, party)}>Edit</button>
                                    }
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}