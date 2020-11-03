import React, { useState, useEffect } from 'react'
import moment from 'moment';
import { ROUTES } from '../../../../shared/constants';
import Switch from "react-switch";
const { CustomPagination } = require('../../../../components/atoms/pagination');
const { TimePickerInput } = require('../../../../components/atoms/time-picker');
const { SnackbarWrapper } = require(`../../../../components/molecules/snackbar-wrapper`);
const {
    Input,
} = require(`../../../../components/atoms/input`);
const { SPORTS_OPTIONS, PAGE_TITLES, NAME_REGX, LABELS, VALIDATION_MESSAGES, upcomingPartyTable, pastPartyTable } = require('../../../../shared/constants/constants')
const { STRINGS } = require('../../../../shared/constants/us/strings')
const { FieldDatePickerr } = require('../../../../components/atoms/field-date-picker')
const { diff_minutes, convertToESTTimeZone, convertTimeForEdit } = require('../../../../helpers')

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

    const [upcomingAndLiveListing, setUpcomingAndLiveListing] = useState([]);
    const [pastListing, setPastListing] = useState([]);
    const [LiveTotalCount, setLiveTotalCount] = useState(0);
    const [PastTotalCount, setPastTotalCount] = useState(0);
    const [livePageLimit, updateLivePageLimit] = useState(STRINGS.SHOW_LIMIT);
    const [pastPageLimit, updatePastPageLimit] = useState(STRINGS.SHOW_LIMIT);
    const [liveSortFilter, updateLiveSortFilter] = useState({ sortKey: 'startTime', sortOrder: 1 })
    const [pastSortFilter, updatePastSortFilter] = useState({ sortKey: 'startTime', sortOrder: 1 })

    const getLiveWatchParties = (data = {}) => {
        listWatchParty(
            data,
            ({ watchPartyListing = [], totalCount = 0 }) => {
                setUpcomingAndLiveListing(watchPartyListing)
                setLiveTotalCount(totalCount)
            },
            () => { })
    }
    const getPastWatchParties = (data = {}) => {
        listPastWatchParty(
            data,
            ({ watchPartyListing = [], totalCount = 0 }) => {
                setPastListing(watchPartyListing)
                setPastTotalCount(totalCount)
            },
            () => { })
    }
    useEffect(() => {
        getPlatforms(() => { }, () => { })
        getLeagues(() => { }, () => { })
        getSports(() => { }, () => { })
    }, []);

    useEffect(() => {
        setLiveTableIndex(0);
        getLiveWatchParties({ skip: 0, limit: livePageLimit, filter: 2, ...liveSortFilter })
    }, [livePageLimit]);

    useEffect(() => {
        setPastTableIndex(0);
        getPastWatchParties({ skip: 0, limit: pastPageLimit, filter: 3, ...pastSortFilter })
    }, [pastPageLimit])

    useEffect(() => {
    }, [upcomingAndLiveListing])

    const [openSnackBar, setOpenSnackbar] = useState(false);
    const [snackbarData, setSnackBarData] = useState({
        variant: '',
        message: ''
    });

    const [liveTableIndex, setLiveTableIndex] = useState(0)
    const [PastTableIndex, setPastTableIndex] = useState(0)


    const sortAscending = (sortKey, sortOrder, isLive = false) => {
        if (isLive) {
            updateLiveSortFilter({ sortKey, sortOrder });
            getLiveWatchParties({ skip: liveTableIndex * livePageLimit, limit: livePageLimit, filter: 2, sortKey, sortOrder })
        } else {
            updatePastSortFilter({ sortKey, sortOrder });
            getPastWatchParties({ skip: PastTableIndex * pastPageLimit, limit: pastPageLimit, filter: 3, sortKey, sortOrder })
        }
    }

    const _toggleWatchpartyVisibility = (val, party = {}) => {
        updateParty(
            {
                watchPartyId: party._id,
                isHidden: val
            },
            (data) => {
                data && setUpcomingAndLiveListing((parties) => {
                    let index = parties.findIndex(item => item._id == party._id);
                    index >= 0 && (parties[index] = { ...parties[index], ...data.data })
                    return [...parties];
                })
            }
        )
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
                                {(upcomingPartyTable || []).map(({ name = '', key = '' }) => {
                                    return <th key={name}>{name}
                                        {!!key && <div className="sorting">
                                            <span className={(liveSortFilter.sortKey == key && liveSortFilter.sortOrder == -1) ? 'active' : ''} onClick={() => sortAscending(key, -1, true)} ><img src={require('../../../../assets/img/icons/down_arrow.png')} alt="down" /></span>
                                            <span className={(liveSortFilter.sortKey == key && liveSortFilter.sortOrder == 1) ? 'active' : ''} onClick={() => sortAscending(key, 1, true)}><img src={require('../../../../assets/img/icons/up_arrow.png')} alt="up" /></span>
                                        </div>}
                                    </th>
                                })}
                            </thead>
                            <tbody>

                                {upcomingAndLiveListing && upcomingAndLiveListing.length > 0 ?
                                    <>
                                        {upcomingAndLiveListing.map((party, index) => {
                                            return <tr key={index}>
                                                <td>
                                                    <div
                                                        onClick={() => history.push(`${ROUTES.WATCH_PARTY_USERS}?watch_party_id=${party._id}`)}
                                                        className="input_field watchcPartyName"
                                                    >
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
                                                        {party && party.leagueInfo && party.leagueInfo.name ? party.leagueInfo.name : 'N/A'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {party && party.platformInfo && party.platformInfo.name}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {convertToClientTimeZone(party && party.startTime, 'lll', party && party.contentName)}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {convertToClientTimeZone(party && party.endTime, "lll", party && party.contentName)}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {convertToClientTimeZone(party && party.createdAt, "MM/DD/yyyy", party && party.contentName)}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {party.joined}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        {party && party.videoInfo && party.videoInfo.name ? party.videoInfo.name : 'N/A'}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="input_field">
                                                        <Switch
                                                            checked={!party.isHidden}
                                                            checkedIcon={false}
                                                            height={24}
                                                            onColor={'#64d2ff'}
                                                            onChange={(val) => _toggleWatchpartyVisibility(!val, party)}
                                                            uncheckedIcon={false}
                                                            width={48}
                                                        />
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
                    {!!upcomingAndLiveListing.length && <CustomPagination
                        limit={livePageLimit}
                        totalPages={LiveTotalCount}
                        onChangePageLimit={(val) => updateLivePageLimit(val)}
                        itemsCount={upcomingAndLiveListing && upcomingAndLiveListing.length}
                        currentPage={liveTableIndex + 1}
                        onPageChange={(value) => {
                            getLiveWatchParties({ limit: livePageLimit, skip: (value && value.selected) * livePageLimit, filter: 2, ...liveSortFilter })
                            setLiveTableIndex(value && value.selected)
                        }}
                    />}
                </div>
                <div className="managment_list">
                    <div class="d-flex table_title">
                        <h3>{LABELS.PAST}</h3>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    {(pastPartyTable || []).map(({ name = '', key = '' }) => {
                                        return <th key={name}>{name}
                                            {!!key && <div className="sorting">
                                                <span className={(pastSortFilter.sortKey == key && pastSortFilter.sortOrder == -1) ? 'active' : ''} onClick={() => sortAscending(key, -1)} ><img src={require('../../../../assets/img/icons/down_arrow.png')} alt="down" /></span>
                                                <span className={(pastSortFilter.sortKey == key && pastSortFilter.sortOrder == 1) ? 'active' : ''} onClick={() => sortAscending(key, 1)}><img src={require('../../../../assets/img/icons/up_arrow.png')} alt="up" /></span>
                                            </div>}
                                        </th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {pastListing && pastListing.length > 0 ?
                                    <>
                                        {pastListing.map((pastParty, index) => {
                                            return <tr className="preview_mode" key={index}>
                                                <td> <div
                                                    onClick={() => history.push(`${ROUTES.WATCH_PARTY_USERS}?watch_party_id=${pastParty._id}`)}
                                                    className="input_field watchcPartyName"
                                                >
                                                    {pastParty.contentName}
                                                </div>
                                                </td>
                                                <td><div className="input_field">{pastParty.host ? pastParty.host : 'N/A'}</div></td>
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

                                                <td><div className="input_field">
                                                    {convertToClientTimeZone(pastParty && pastParty.startTime, 'lll', pastParty && pastParty.contentName)}
                                                </div>
                                                </td>
                                                <td><div className="input_field">
                                                    {convertToClientTimeZone(pastParty && pastParty.endTime, 'lll', pastParty && pastParty.contentName)}
                                                </div>
                                                </td>
                                                <td><div className="input_field">
                                                    {convertToClientTimeZone(pastParty && pastParty.createdAt, 'MM/DD/yyyy', pastParty && pastParty.contentName)}
                                                </div>
                                                </td>
                                                <td><div className="input_field">{pastParty.joined}</div></td>
                                                <td><div className="input_field">{pastParty && pastParty.videoInfo && pastParty.videoInfo.name ? pastParty.videoInfo.name : 'N/A'}</div></td>
                                                <td style={{ minWidth: '86px' }}> </td>
                                            </tr>
                                        })}

                                    </> : 'No Watch Parties found.'}
                            </tbody>
                        </table>
                    </div>
                    {pastListing && pastListing.length > 0 ? <CustomPagination
                        limit={pastPageLimit}
                        totalPages={PastTotalCount}
                        onChangePageLimit={(val) => updatePastPageLimit(val)}
                        itemsCount={pastListing && pastListing.length}
                        currentPage={PastTableIndex + 1}
                        onPageChange={(value) => {
                            getPastWatchParties({ limit: pastPageLimit, skip: (value.selected || 0) * pastPageLimit, filter: 3, ...pastSortFilter })
                            setPastTableIndex(value.selected)
                        }}
                    /> : ''}
                </div>

            </div>
        </div >
    )
}