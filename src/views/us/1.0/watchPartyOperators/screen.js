import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'
import { reduxForm, Field, change as onChangeForm } from "redux-form";
import "./styles.scss";
import moment from "moment-timezone"
import { connect } from 'react-redux'
import Switch from "react-switch";
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
];

let addHostColumns = [
    { name: 'Pic' },
    { name: 'Name' },
    { name: 'Email' },
    { name: 'Host Access' },
]

const WatchPartyOperators = ({
    history,
    getWatchPartyHosts,
}) => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const [noData, toggleNoData] = useState(false)
    const [operators, updateOperators] = useState([])
    const [operatorPageLimit, updateOperatorPageLimit] = useState(STRINGS.SHOW_LIMIT);
    const [currentPageIndex, updateCurrentPageIndex] = useState(0)
    const [totalOperators, updateTotalOperators] = useState(0);
    const [userOptionAvailable, setUsersOptionVisible] = useState(false);
    const [hostsToAdd, setHostsToAdd] = useState(new Set());

    let query = useQuery();
    useEffect(() => { updateCurrentPageIndex(0); _getOperators() }, [operatorPageLimit]);
    const _getOperators = (skip = 0,) => {
        let path = history.location.pathname
        let watchPartyId = query.get("watch_party_id")
        if (path == '/watch-party-operators' && watchPartyId) {
            toggleNoData(false)
            getWatchPartyHosts(
                {
                    watchPartyId,

                    limit: operatorPageLimit,
                    skip
                },
                (data) => {
                    updateOperators(data.operators || []);
                    updateTotalOperators(data.numberOfDocuments || 0)
                    console.log(data);
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
                                        <h3 className="mb-4 text-center">{'Add Hosts'}</h3>
                                        <div>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        {!!operators.length && addHostColumns.map(party => {
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
                                                                                    checked={hostsToAdd.has(user._id)}
                                                                                    checkedIcon={false}
                                                                                    height={24}
                                                                                    onColor={'#64d2ff'}
                                                                                    onChange={(val) => {
                                                                                        let addHosts = new Set(hostsToAdd);
                                                                                        console.log('val', val, 'user', user);
                                                                                        if (val) {
                                                                                            addHosts.add(user._id);
                                                                                        } else {
                                                                                            addHosts.delete(user._id);
                                                                                        }
                                                                                        setHostsToAdd(addHosts)
                                                                                    }}
                                                                                    uncheckedIcon={false}
                                                                                    width={48}
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                })}
                                                            </>

                                                            : 'No operator found in this Watch Party.'}
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
                                        <button type={'button'} className={'btn btn-md reject-button mr-2'} onClick={() => setUsersOptionVisible(false)}>{'Cancel'}</button>
                                        <button type={'button'} className={'btn btn-md btn-primary'} onClick={() => setUsersOptionVisible(false)}>{'Add'}</button>

                                    </div>
                                </div>
                            </div>
                        </div>}
                    <div>
                        <div className="col-sm-8 text-md-right">
                            <button className={'btn btn-md btn-primary'} onClick={() => { setUsersOptionVisible(true) }}>{'Add Hosts'}</button>
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
                                                </tr>
                                            })}
                                        </>

                                        : 'No operator found in this Watch Party.'}
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

