import React, { useState, useEffect } from "react";
import "./style.scss";
import { ADMIN_TABLE_HEADINGS, MESSAGES, PAGE_TITLES, VALIDATION_MESSAGES, NAME_REGX, EMAIL_REGX } from "../../../../shared/constants";
import Switch from "react-switch";

import { CustomPagination } from "../../../../components/atoms/pagination";
import { SnackbarWrapper } from "../../../../components/molecules/snackbar-wrapper";
import { DecisionPopup } from "../../../../components/atoms/decision-popup";
import { STRINGS } from "../../../../shared/constants/us/strings";
import moment from 'moment'
const { getPhoneValid } = require('../../../../helpers/phoneValidator')

const User = ({ listAdmins, listUsers, removeUserAction, updateUser, getAllTimeZones, TimeZones, handleSubmit = () => { } }) => {
  const [adminsListing, set_adminsListing] = useState([]);
  const [usersListing, set_usersListing] = useState([]);
  const [adminTotalCount, set_adminTotalCount] = useState(0);
  const [usersTotalCount, set_usersTotalCount] = useState(0);
  const [adminsTableIndex, set_adminsTableIndex] = useState(0);
  const [usersTableIndex, set_usersTableIndex] = useState(0);
  const [userPageLimit, updateUserPageLimit] = useState(STRINGS.SHOW_LIMIT);
  const [adminPageLimit, updateAdminPageLimit] = useState(STRINGS.SHOW_LIMIT);
  const [rowToEdit, setRowToEdit] = useState(null)
  const [editmode, setEditMode] = useState(false)
  const [fields, setFields] = useState({})
  const [error, setError] = useState({})
  const [adminSortFilter, updateAdminSortFilter] = useState({ sortKey: 'firstName', sortOrder: 1 })
  const [userSortFilter, updateUserSortFilter] = useState({ sortKey: 'firstName', sortOrder: 1 })


  const adminListApi = (data) => {
    listAdmins(
      data,
      ({ admins = [], totalRecords = 0 }) => {
        set_adminsListing(admins);
        set_adminTotalCount(totalRecords);
      },
      () => { }
    );
  };

  const getUsersList = (data, response) => {
    listUsers(
      data,
      ({ users = [], totalRecords = 0 }) => {
        set_usersListing(users);
        set_usersTotalCount(totalRecords);
      }
    );
  };

  useEffect(() => {
    getAllTimeZones({}, () => { }, () => { })
  }, []);

  useEffect(() => {
    set_usersTableIndex(0);
    getUsersList({ skip: 0, limit: userPageLimit, ...userSortFilter });
  }, [userPageLimit]);

  useEffect(() => {
    adminListApi({ skip: 0, limit: adminPageLimit, ...adminSortFilter });
  }, [adminPageLimit]);

  useEffect(() => { }, [adminsTableIndex]);
  useEffect(() => { }, [usersTableIndex]);

  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [snackbarData, setSnackBarData] = useState({
    variant: '',
    message: ''
  });

  const [openPopup, set_openPopup] = useState(false);
  const [userToRemove, set_userToRemove] = useState("");

  const removeUser = (user_id) => {
    removeUserAction(
      user_id,
      (response) => {
        setSnackBarData({
          variant: response.status ? 'success' : 'error',
          message: response.msg
        });
        setOpenSnackbar(true);
        set_usersTableIndex(
          usersTotalCount === 1
            ? 0
            : usersTotalCount === usersTableIndex * userPageLimit + 1
              ? usersTableIndex - 1
              : usersTableIndex
        );
        getUsersList({
          skip:
            usersTotalCount === 1
              ? 0
              : usersTotalCount === usersTableIndex * userPageLimit + 1
                ? (usersTableIndex - 1) * userPageLimit
                : usersTableIndex * userPageLimit,
          limit: userPageLimit,
          ...userSortFilter
        });
      },
      (error) => {
        setSnackBarData({
          variant: error.status ? 'success' : 'error',
          message: error.msg
        });
        setOpenSnackbar(true)
      }
    );
    set_userToRemove("");
  };

  const EditUser = (index) => {
    setRowToEdit(index)
    setEditMode(true)
    let time = checkTimezone(index)
    setFields({
      ...fields,
      firstName: usersListing[index].firstName,
      lastName: usersListing[index].lastName, username: usersListing[index].username, email: usersListing[index].email,
      phone: usersListing[index].phone, age: usersListing[index].age, address: usersListing[index].address, timezone: time && time[0] ? time[0].label : ''
    })
  }


  const checkTimezone = (index) => {
    let ob = TimeZones && TimeZones.filter(obj => {
      if (obj._id === (usersListing && usersListing[index] && usersListing[index].timezone)) {
        return obj
      }
    })
    return ob
  }

  const onSubmit = () => {
    let errors = checkValidateFields()

    setError(errors)

    if (errors['firstName'] || errors['lastName'] || errors['email'] || errors['age'] || errors['address'] || errors['phone'] || errors['username']) {
      return
    }
    else {

      let timezone = TimeZones && TimeZones.filter(obj => {
        if (obj.label === (fields.timezone)) {
          return obj
        }
      })
      updateUser({ ...fields, timezone: timezone && timezone[0] && timezone[0]._id, zipcode: '140603', userId: usersListing[rowToEdit]._id },
        (response) => {

          setEditMode(false)
          setSnackBarData({
            variant: response.status ? 'success' : 'error',
            message: response.msg
          });
          setOpenSnackbar(true)
          getUsersList({ skip: usersTableIndex * userPageLimit, limit: userPageLimit, ...userSortFilter });
        }, (response) => {
          setSnackBarData({
            variant: response.status ? 'success' : 'error',
            message: response.msg
          });
          setOpenSnackbar(true)
        })

    }
  }
  const checkValidateFields = () => {
    let error = {}

    if (!NAME_REGX.test(fields.firstName)) {
      error['firstName'] = VALIDATION_MESSAGES.NAME_VALIDATION
    }

    if (!(NAME_REGX.test(fields.lastName))) {
      error['lastName'] = VALIDATION_MESSAGES.NAME_VALIDATION
    }

    if (fields.email && (!EMAIL_REGX.test(fields.email))) {
      error['email'] = VALIDATION_MESSAGES.EMAIL_INVALID
    }
    if (fields.phone && getPhoneValid(fields.phone) === 'invalid') {
      error['phone'] = VALIDATION_MESSAGES.PHONE_VALIDATION
    }

    if (fields.age < 13 || fields.age === 0) {
      error['age'] = VALIDATION_MESSAGES.AGE_VALIDATION
    }
    if (fields.age > 150) {
      error['age'] = VALIDATION_MESSAGES.MAX_AGE_VALIDATION
    }
    setError(error)
    return error
  }

  const updateFields = (type, value) => {
    if (error[type]) {
      setError({ ...error, [type]: null })
    }
    setFields({ ...fields, [type]: value })
  }

  const sortAscending = (sortKey, sortOrder, isAdmin = false) => {

    if (!isAdmin && !editmode) {
      updateUserSortFilter({ sortKey, sortOrder });
      getUsersList({ skip: usersTableIndex * userPageLimit, limit: userPageLimit, sortKey, sortOrder });
    }
    if (isAdmin) {
      updateAdminSortFilter({ sortKey, sortOrder });
      adminListApi({ skip: adminsTableIndex * adminPageLimit, limit: adminPageLimit, sortKey, sortOrder });
    }

  }

  return (
    <div className="container-fluid">
      <DecisionPopup
        modalVisibility={openPopup}
        dialogContent={`Are you sure you want to remove this user?`}
        dialogTitle={"Remove User"}
        confirmButtonTitle={STRINGS.CONFIRM}
        rejectButtonTitle={STRINGS.CANCEL}
        toggleDialogModal={() => set_openPopup(!openPopup)}
        onConfirmation={() => {
          removeUser(userToRemove);
          set_openPopup(false);
        }}
        onRejection={() => {
          set_openPopup(false);
          set_userToRemove("");
        }}
      />

      <div className="content-panel">
        <SnackbarWrapper
          visible={openSnackBar}
          onClose={() => setOpenSnackbar(false)}
          variant={snackbarData.variant}
          message={snackbarData.message}
        />
        <div className="row  page-title">
          <h1 className="col-md-3">{PAGE_TITLES.USER_MANAGEMENT}</h1>
          <div className="col-md-6">
            <button className="btn btn-md btn-primary">Export</button>
          </div>
        </div>

        <div className="users_list">
          <div className="d-flex table_title">
            <h3>{STRINGS.ADMINS}</h3>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {ADMIN_TABLE_HEADINGS.map(({ name, key }) => (
                    <th key={name} style={{ textDecoration: "none" }}>
                      {name}
                      {!!key && <div className="sorting">
                        <span className={(adminSortFilter.sortKey == key && adminSortFilter.sortOrder === -1) ? 'active' : ''} onClick={() => sortAscending(key, -1, true)} ><img src={require('../../../../assets/img/icons/down_arrow.png')} alt="down" /></span>
                        <span className={(adminSortFilter.sortKey == key && adminSortFilter.sortOrder === 1) ? 'active' : ''} onClick={() => sortAscending(key, 1, true)}><img src={require('../../../../assets/img/icons/up_arrow.png')} alt="up" /></span>
                      </div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adminsListing && adminsListing.length ? (
                  adminsListing.map((admin, ind) => {
                    let time = checkTimezone(ind)
                    return <tr key={ind}>
                      <td>
                        {admin.firstName}
                      </td>
                      <td>{admin.lastName}</td>
                      <td>{admin.email}</td>
                      <td>{admin.phone ? '+1 ' : ''}{admin.phone}</td>
                      <td>{time && time[0] && time[0].label}</td>
                      <td>{admin.age}</td>
                      <td>{moment(admin.createdAt).format('MM/DD/YYYY')}</td>
                    </tr>
                  })
                ) :
                  MESSAGES.noAdminsFound
                }
              </tbody>
            </table>
            {adminsListing && adminsListing.length ? (
              <CustomPagination
                limit={adminPageLimit}
                totalPages={adminTotalCount}
                // onChangePageLimit={(val) => updateAdminPageLimit(val)}
                itemsCount={adminsListing && adminsListing.length}
                currentPage={adminsTableIndex + 1}
                onPageChange={(value) => {
                  set_adminsTableIndex(value.selected);
                  adminListApi({ skip: value.selected * adminPageLimit, limit: adminPageLimit, ...adminSortFilter });
                }}
              />
            ) : null}
          </div>
        </div>

        <div className="users_list">
          <div className="d-flex table_title">
            <h3>Users</h3>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  {ADMIN_TABLE_HEADINGS.map(({ name, key }) => (
                    <th key={name} style={{ textDecoration: "none" }}>
                      {name}
                      {!!key && <div className="sorting">
                        <span className={(userSortFilter.sortKey == key && userSortFilter.sortOrder === -1) ? 'active' : ''} onClick={() => sortAscending(key, -1)} ><img src={require('../../../../assets/img/icons/down_arrow.png')} alt="down" /></span>
                        <span className={(userSortFilter.sortKey == key && userSortFilter.sortOrder === 1) ? 'active' : ''} onClick={() => sortAscending(key, 1)}><img src={require('../../../../assets/img/icons/up_arrow.png')} alt="up" /></span>
                      </div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {usersListing && usersListing.length ? (
                  usersListing.map((user, ind) => {
                    let time = checkTimezone(ind)

                    return !(ind === rowToEdit && editmode) ? <tr key={ind}>
                      <td>
                        {user.firstName}
                      </td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone ? '+1' : ''} {user.phone}</td>
                      <td>{time && time[0] && time[0].label}</td>
                      <td>{user.age}</td>
                      <td>{moment(user.createdAt).format('MM/DD/YYYY')}</td>
                      <td>
                        <div className="d-flex">
                          <button className="btn mr-1 btn-sm btn-secondary" onClick={() => EditUser(ind)}>Edit</button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => {
                              set_userToRemove(user._id);
                              set_openPopup(true);
                            }}
                          >
                            Remove
                        </button>
                        </div>
                      </td>
                    </tr> :
                      <tr>
                        <td><input name={STRINGS.FIRST_NAME_INPUT}
                          type={'text'}
                          value={fields.firstName}
                          onChange={(e) => updateFields(STRINGS.FIRST_NAME_INPUT, e.target.value)}
                        />
                          {error && error.firstName ? (
                            <span className="error_msg text-danger">{error.firstName}</span>
                          ) : null}
                        </td>
                        <td>
                          <input name={STRINGS.LAST_NAME_INPUT}
                            type={'text'}
                            value={fields.lastName}
                            onChange={(e) => updateFields(STRINGS.LAST_NAME_INPUT, e.target.value)}
                          />
                          {error && error.lastName ? (
                            <span className="error_msg text-danger">{error.lastName}</span>
                          ) : null}
                        </td>
                        {/* <td>   <input name={STRINGS.USERNAME_INPUT}
                          type={'text'}
                          value={fields.username}
                          onChange={(e) => updateFields(STRINGS.USERNAME_INPUT, e.target.value)}
                        />  {error && error.username ? (
                          <span className="error_msg text-danger">{error.username}</span>
                        ) : null}</td> */}
                        <td>
                          <input name={STRINGS.EMAIL_INPUT_NAME}
                            type={'email'}
                            value={fields.email}
                            disabled={true}
                            onChange={(e) => updateFields(STRINGS.EMAIL_INPUT_NAME, e.target.value)}
                          />
                          {error && error.email ? (
                            <span className="error_msg text-danger">{error.email}</span>
                          ) : null}
                        </td>
                        <td>
                          <div className="phone_key">
                            <input name={'phoneKey'}
                              type={'text'}
                              value={'+1'}
                              disabled={true}
                            />

                            <input name={STRINGS.PHONE_INPUT}
                              type={'number'}
                              value={fields.phone}
                              onChange={(e) => updateFields(STRINGS.PHONE_INPUT, e.target.value)}
                            /> </div>  {error && error.phone ? (
                              <span className="error_msg text-danger">{error.phone}</span>
                            ) : null}
                        </td>

                        {/* <td>  <input name={STRINGS.ADDRESS_INPUT}
                          type={'text'}
                          value={fields.address}
                          onChange={(e) => updateFields(STRINGS.ADDRESS_INPUT, e.target.value)}
                        />  {error && error.address ? (
                          <span className="error_msg text-danger">{error.address}</span>
                        ) : null}
                        </td> */}

                        <td>   <select name={STRINGS.TIME_ZONE_INPUT}
                          value={fields.timezone}
                          onChange={(e) => updateFields(STRINGS.TIME_ZONE_INPUT, e.target.value)}
                        >
                          <>
                            {!fields.timezone ? <option>Choose Timezone</option> : null}
                            {TimeZones.map(sport => {
                              return <option>{sport && sport.label}</option>
                            })}
                          </>
                        </select>

                        </td>
                        <td>   <input name={STRINGS.AGE_INPUT}
                          type={'number'}
                          value={fields.age}
                          onChange={(e) => updateFields(STRINGS.AGE_INPUT, e.target.value)}
                        />
                          {error && error.age ? (
                            <span className="error_msg text-danger">{error.age}</span>
                          ) : null}
                        </td>
                        <td>{moment(user.createdAt).format('MM/DD/YYYY')}</td>
                        <td>  <button className="btn btn-sm btn-secondary" onClick={onSubmit} >Update</button></td>
                      </tr>
                  }
                  ))
                  : (
                    <tr>
                      <td
                        style={{
                          color: "#4D4D4F",
                          fontSize: 16,
                          fontWeight: "600",
                        }}
                      >
                        {MESSAGES.noUsersFound}
                      </td>
                    </tr>
                  )}
              </tbody>

            </table>

          </div>
          {usersListing && usersListing.length ? (
            <CustomPagination
              limit={userPageLimit}
              totalPages={usersTotalCount}
              onChangePageLimit={(val) => updateUserPageLimit(val)}
              itemsCount={usersListing && usersListing.length}
              currentPage={usersTableIndex + 1}
              onPageChange={(value) => {
                setEditMode(false)
                setFields({})
                set_usersTableIndex(value.selected);
                getUsersList({
                  skip: value.selected * userPageLimit,
                  limit: userPageLimit,
                  ...userSortFilter
                });
              }}
            />
          ) : null}
        </div>
      </div>
    </div >
  );
};

export const Screen = User