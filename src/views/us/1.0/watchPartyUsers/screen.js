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
]

const WatchPartyUsers = ({
    history,
    getWatchPartyUsers,
}) => {
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    const [noData, toggleNoData] = useState(false)
    const [users, updateUsers] = useState([])
    const [usersPageLimit, updateUsersPageLimit] = useState(STRINGS.SHOW_LIMIT);
    const [currentPageIndex, updateCurrentPageIndex] = useState(0)
    const [totalUsers, updateTotalUsers] = useState(0)

    let query = useQuery();
    useEffect(() => { updateCurrentPageIndex(0); _getJoinedUsers() }, [usersPageLimit])
    const _getJoinedUsers = (skip = 0,) => {
        let path = history.location.pathname
        let watchPartyId = query.get("watch_party_id")
        if (path == '/watch-party-users' && watchPartyId) {
            toggleNoData(false)
            getWatchPartyUsers(
                {
                    watchPartyId,
                    limit: usersPageLimit,
                    skip
                },
                (data) => {
                    updateUsers(data.users || []);
                    updateTotalUsers(data.numberOfDocuments || 0)
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
                    <div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    {!!users.length && columns.map(party => {
                                        return <th key={party.name}>{party.name}</th>
                                    })}
                                </thead>
                                <tbody>

                                    {users.length ?
                                        <>
                                            {users.map((user, index) => {
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

                                        : 'No user found in this Watch Party.'}
                                </tbody>
                            </table>

                        </div>
                        {!!users.length && <CustomPagination
                            limit={usersPageLimit}
                            totalPages={totalUsers}
                            onChangePageLimit={(val) => updateUsersPageLimit(val)}
                            itemsCount={users.length}
                            currentPage={currentPageIndex + 1}
                            onPageChange={(value) => { _getJoinedUsers(value.selected * usersPageLimit); updateCurrentPageIndex(value.selected) }}
                        />}
                    </div>
                </>
            }
        </div>
    );
};

export const Screen = WatchPartyUsers

