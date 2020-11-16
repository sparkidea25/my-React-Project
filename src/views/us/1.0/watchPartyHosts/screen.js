import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { reduxForm, Field, change as onChangeForm } from "redux-form";
import "./styles.scss";
import moment from "moment-timezone"
import { connect } from 'react-redux'
import Switch from "react-switch";
import { TextField } from '@material-ui/core';
import { CustomPagination } from "../../../../components/atoms/pagination";
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

let columns = [
    { name: 'Pic' },
    { name: 'Name' },
    { name: 'Email' },
    { name: 'Host Access' },
];

let addHostColumns = [
    { name: 'Pic' },
    { name: 'Name' },
    { name: 'Email' },
    { name: 'Host Access' },
]

const WatchPartyOperators = ({
    history,
    addRemoveHostsRequest,
    getWatchPartyHosts,
    searchWatchPartyHostUsers,
}) => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const [noData, toggleNoData] = useState(false)
    const [operators, updateOperators] = useState([])
    const [searchedUsers, updateSearchedUsers] = useState([]);
    const [operatorPageLimit, updateOperatorPageLimit] = useState(STRINGS.SHOW_LIMIT);
    const [userPageLimit, updateUserPageLimit] = useState(STRINGS.SHOW_LIMIT);
    const [currentPageIndex, updateCurrentPageIndex] = useState(0);
    const [currentUsersPageIndex, updateCurrentUsersPageIndex] = useState(0)
    const [totalOperators, updateTotalOperators] = useState(0);
    const [totalUsers, updateTotalUser] = useState(0);
    const [searchString, setSearchString] = useState('');
    const [userOptionAvailable, setUsersOptionVisible] = useState(false);
    const [hostsToAdd, setHostsToAdd] = useState({});

    let query = useQuery();
    useEffect(() => { updateCurrentPageIndex(0); _getOperators() }, [operatorPageLimit]);
    useEffect(() => { updateCurrentUsersPageIndex(0); _searchUsers(searchString) }, [userPageLimit]);
    const _getOperators = (skip = 0,) => {
        let path = history.location.pathname
        let watchPartyId = query.get("watch_party_id")
        if (path == '/watch-party-hosts' && watchPartyId) {
            toggleNoData(false)
            getWatchPartyHosts(
                {
                    watchPartyId,
                    filter: 1,
                    limit: operatorPageLimit,
                    skip
                },
                (data) => {
                    updateOperators(data.hosts || []);
                    updateTotalOperators(data.count || 0)
                    console.log(data);
                },
                () => { }
            )
        } else {
            toggleNoData(true)
        }
    }

    const _addRemoveHost = (users = []) => {
        let path = history.location.pathname
        let watchPartyId = query.get("watch_party_id")
        if (path == '/watch-party-hosts' && watchPartyId) {
            addRemoveHostsRequest(
                {
                    users,
                    watchPartyId
                },
                () => {
                    updateCurrentPageIndex(0);
                    _getOperators();
                    onCloseModal()
                },
                () => { },
            )
        }
    }

    const onCloseModal = () => {
        setSearchString('');
        setHostsToAdd({});
        updateCurrentUsersPageIndex(0);
        setUsersOptionVisible(false);
    }

    const _searchUsers = (name = '', skip = 0, showModal = false, searching = false) => {

        let path = history.location.pathname;
        let watchPartyId = query.get("watch_party_id")
        if (path == '/watch-party-hosts' && watchPartyId) {
            setSearchString(name);

            searchWatchPartyHostUsers(
                {
                    watchPartyId,
                    filter: 0,
                    name: name.trim(),
                    loading: !searching,
                    limit: userPageLimit,
                    skip
                },
                (data) => {
                    updateSearchedUsers(data.users || []);
                    updateTotalUser(data.count || 0)
                    console.log(data);
                    showModal && setUsersOptionVisible(true);
                },
                () => { }
            )
        } else {
            toggleNoData(true)
        }
    }

    return (
        <div className="container">
            {noData ?
                <div>Watch party id not found.</div>
                :
                <>
                    {userOptionAvailable &&
                        <div className='dropzone-div'>
                            <div className="overlay"></div>
                            <div className="dropzone-dialog">
                                <div className="dropzone-content">
                                    <div className="dropzone-body">
                                        <h3 className="mb-4 text-center">{`Add Hosts (${Object.keys(hostsToAdd).length} selected)`}</h3>
                                        <div>
                                            <div className='form-row'>
                                                <input
                                                    className='form-control col-md-12'
                                                    label={'Search User'}
                                                    type="text"
                                                    value={searchString}
                                                    placeholder={'Search here...'}
                                                    onChange={e => {
                                                        _searchUsers(e.target.value, 0, false, true); updateCurrentUsersPageIndex(0);
                                                    }}
                                                    margin="0"
                                                />
                                            </div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        {!!searchedUsers.length && addHostColumns.map(party => {
                                                            return <th key={party.name}>{party.name}</th>
                                                        })}
                                                    </thead>
                                                    <tbody>

                                                        {searchedUsers.length ?
                                                            <>
                                                                {searchedUsers.map((user, index) => {
                                                                    return <tr key={index}>
                                                                        <td >
                                                                            <img
                                                                                style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                                                                                alt=''
                                                                                src={user.pictureUrl ? user.pictureUrl : require('../../../../assets/img/icons/profile-user.png')}
                                                                            />
                                                                        </td>
                                                                        <td>
                                                                            <div className="input_field"                                                        >
                                                                                {user.firstName}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="input_field">
                                                                                {user.email}
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="input_field">
                                                                                <Switch
                                                                                    checked={!!hostsToAdd[user._id]}
                                                                                    checkedIcon={false}
                                                                                    height={24}
                                                                                    onColor={'#64d2ff'}
                                                                                    onChange={(val) => {
                                                                                        setHostsToAdd(hosts => {
                                                                                            val ? (hosts[user._id] = { userId: user._id, status: 1 }) : (delete hosts[user._id]);
                                                                                            return { ...hosts }
                                                                                        })
                                                                                    }}
                                                                                    uncheckedIcon={false}
                                                                                    width={48}
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                })}
                                                            </>

                                                            : 'No User found.'}
                                                    </tbody>
                                                </table>

                                            </div>
                                            {!!searchedUsers.length && <CustomPagination
                                                limit={userPageLimit}
                                                totalPages={totalUsers}
                                                onChangePageLimit={(val) => updateUserPageLimit(val)}
                                                itemsCount={searchedUsers.length}
                                                currentPage={currentUsersPageIndex + 1}
                                                onPageChange={(value) => { _searchUsers(searchString, value.selected * userPageLimit); updateCurrentUsersPageIndex(value.selected) }}
                                            />}
                                        </div>
                                        <button type={'button'} className={'btn btn-md reject-button mr-2'} onClick={onCloseModal}>{'Cancel'}</button>
                                        <button type={'button'} className={'btn btn-md btn-primary'} onClick={() => { _addRemoveHost(Object.values(hostsToAdd)) }}>{'Add'}</button>

                                    </div>
                                </div>
                            </div>
                        </div>}
                    <div>
                        <div className="col-sm-8 text-md-right">
                            <button className={'btn btn-md btn-primary'} onClick={() => { _searchUsers('', 0, true) }}>{'Add Hosts'}</button>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    {!!operators.length && columns.map(party => {
                                        return <th key={party.name}>{party.name}</th>
                                    })}
                                </thead>
                                <tbody>

                                    {operators.length ?
                                        <>
                                            {operators.map((user, index) => {
                                                return <tr key={index}>
                                                    <td >
                                                        <img
                                                            style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                                                            alt=''
                                                            src={user.pictureUrl ? user.pictureUrl : require('../../../../assets/img/icons/profile-user.png')}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="input_field"                                                        >
                                                            {user.firstName}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            {user.email}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="input_field">
                                                            <Switch
                                                                checked={true}
                                                                checkedIcon={false}
                                                                height={24}
                                                                onColor={'#64d2ff'}
                                                                onChange={(val) => _addRemoveHost([{ userId: user._id, status: 0 }])}
                                                                uncheckedIcon={false}
                                                                width={48}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            })}
                                        </>

                                        : 'No host found in this Watch Party.'}
                                </tbody>
                            </table>

                        </div>
                        {!!operators.length && <CustomPagination
                            limit={operatorPageLimit}
                            totalPages={totalOperators}
                            onChangePageLimit={(val) => updateOperatorPageLimit(val)}
                            itemsCount={operators.length}
                            currentPage={currentPageIndex + 1}
                            onPageChange={(value) => { _getOperators(value.selected * operatorPageLimit); updateCurrentPageIndex(value.selected) }}
                        />}
                    </div>
                </>
            }
        </div>
    );
};

export const Screen = WatchPartyOperators

