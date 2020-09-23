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
const { diff_minutes,convertToESTTimeZone,convertTimeForEdit } = require('../../../../helpers')

// const copyDate = (date, time) => {
//     time = time ? new Date(time) : new Date()
//     date = date ? new Date(date) : new Date()
//     time.setDate(date.getDate());
//     time.setMonth(date.getMonth());
//     time.setYear(date.getFullYear());
//     return time;
// }

const convertToClientTimeZone = (date, format, type) => {
    if (date) {
        var toEST = new Date(date).setHours(new Date(date).getHours(), new Date(date).getMinutes(), new Date(date).getSeconds(), new Date(date).getMilliseconds())
        if (type) {
            return moment(toEST).format(format)
        }
    }
}

export const Screen = ({ listWatchParty, history, setWatchListParty,
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
            setWatchListParty(response && response.watchPartyListing)
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

    const [liveTableIndex, setLiveTableIndex] = useState(0)
    const [PastTableIndex, setPastTableIndex] = useState(0)


    const sortAscending = (sortkey, type, order) => {
        let key = (sortkey === 'Show') ? 'contentName' : (sortkey === 'Time (EST)') ? 'startTime' : ''
        if (type === 2 ) {
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
                                            
                                               return <tr>
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
                                                            {party && party.videoInfo && party.videoInfo.name ? party.videoInfo.name : 'N/A'}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            <button className="btn btn-sm btn-secondary" onClick={() => {
                                                             
                                                                history.push(`${ROUTES.EDIT_WATCH_PARTY}?watch_party_id=${party._id}`)
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
                            // setEditMode(false)

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
                                                <td><div className="input_field">{pastParty && pastParty.videoInfo && pastParty.videoInfo.name ? pastParty.videoInfo.name : 'N/A'}</div></td>
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