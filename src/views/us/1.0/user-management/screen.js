import React, { useState, useEffect } from "react";
import "./style.scss";
import { ADMIN_TABLE_HEADINGS, MESSAGES, PAGE_TITLES, VALIDATION_MESSAGES, NAME_REGX, EMAIL_REGX } from "../../../../shared/constants";

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
  const [rowToEdit, setRowToEdit] = useState(null)
  const [editmode, setEditMode] = useState(false)
  const [fields, setFields] = useState({})
  const [error, setError] = useState({})

  const adminListApi = (data, resp) => {
    listAdmins(
      data,
      (response) => {
        set_adminsListing(response && response.admins);
        set_adminTotalCount(response && response.totalRecords);
        resp();
      },
      () => { }
    );
  };

  const userListApi = (data, response) => {
    let postData = Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
    listUsers(
      postData,
      (resp) => {
        response(resp);
      },
      () => { }
    );
  };

  useEffect(() => {
    adminListApi({ skip: 0, limit: STRINGS.SHOW_LIMIT });
    userListApi({ skip: 0, limit: STRINGS.SHOW_LIMIT }, (response) => {
      set_usersListing(response.users);
      set_usersTotalCount(response.totalRecords);
    });

    getAllTimeZones({}, () => { }, () => { })
  }, []);

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
        setOpenSnackbar(true)
        userListApi(
          {
            skip:
              usersTotalCount === 1
                ? 0
                : usersTotalCount === usersTableIndex * STRINGS.SHOW_LIMIT + 1
                  ? (usersTableIndex - 1) * STRINGS.SHOW_LIMIT
                  : usersTableIndex * STRINGS.SHOW_LIMIT,
            limit: STRINGS.SHOW_LIMIT,
          },
          (response) => {
            set_usersTableIndex(
              usersTotalCount === 1
                ? 0
                : usersTotalCount === usersTableIndex * STRINGS.SHOW_LIMIT + 1
                  ? usersTableIndex - 1
                  : usersTableIndex
            );
            set_usersListing(response.users);
            set_usersTotalCount(response.totalRecords);
          }
        );
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

  }

  const checkTimezone = (index) => {
    let ob = TimeZones && TimeZones.filter(obj => {
      if (obj._id === (usersListing && usersListing[index] && usersListing[index].timezone)) {
        return obj
      }
    })
    return ob
  }

  useEffect(() => {
    if (editmode) {
      let time = checkTimezone(rowToEdit)
      setFields({
        ...fields, firstName: usersListing[rowToEdit].firstName,
        lastName: usersListing[rowToEdit].lastName, username: usersListing[rowToEdit].username, email: usersListing[rowToEdit].email,
        phone: usersListing[rowToEdit].phone, age: usersListing[rowToEdit].age, address: usersListing[rowToEdit].address, timezone: time && time[0] ? time[0].label : ''
      })
    }
  }, [rowToEdit])

  const onSubmit = () => {
    let errors = checkValidateFields()
    console.log(errors)
    setError(errors)

    if (errors['firstName'] || errors['lastName'] || errors['email'] || errors['age'] || errors['address'] || errors['phone'] || errors['username']) {
      return
    }
    else {
      console.log(fields.timezone)
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
          userListApi({ skip: usersTableIndex * STRINGS.SHOW_LIMIT, limit: STRINGS.SHOW_LIMIT }, (response) => {
            set_usersListing(response.users);
            set_usersTotalCount(response.totalRecords);
          });
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

    // if (!fields.firstName || (fields.firstName === '')) {
    //   error['firstName'] = VALIDATION_MESSAGES.FIRST_NAME_REQUIRED
    // }
    if (!NAME_REGX.test(fields.firstName)) {
      error['firstName'] = VALIDATION_MESSAGES.NAME_VALIDATION
    }

    // if (!fields.lastName || (fields.lastName === '')) {
    //   error['lastName'] = VALIDATION_MESSAGES.LAST_NAME_REQUIRED
    // }
    if (!(NAME_REGX.test(fields.lastName))) {
      error['lastName'] = VALIDATION_MESSAGES.NAME_VALIDATION
    }

    // if (!fields.username || (fields.username === '')) {
    //   error['username'] = VALIDATION_MESSAGES.USER_NAME_REQUIRED
    // }
    // if (!fields.email || (fields.email === '')) {
    //   error['email'] = VALIDATION_MESSAGES.EMAIL_REQUIRED
    // }
    if (fields.email && (!EMAIL_REGX.test(fields.email))) {
      error['email'] = VALIDATION_MESSAGES.EMAIL_INVALID
    }
    if (fields.phone && getPhoneValid(fields.phone) === 'invalid') {
      error['phone'] = VALIDATION_MESSAGES.PHONE_VALIDATION
    }
    // if (!fields.address || (fields.address === '')) {
    //   error['address'] = VALIDATION_MESSAGES.ADDRESS_REQUIRED
    // }
    if (fields.age && (fields.age < 13)) {
      error['age'] = VALIDATION_MESSAGES.AGE_VALIDATION
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

  return (
    <div className="container-fluid">
      <DecisionPopup
        modalVisibility={openPopup}
        dialogContent={`Click confirm to remove user `}
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
                  {ADMIN_TABLE_HEADINGS.map((head) => (
                    <th key={head.name} style={{ textDecoration: "none" }}>
                      {head.name}

                      <div className="sorting">
                        <span><img src={require('../../../../assets/img/icons/down_arrow.png')} alt="down" /></span>
                        <span><img src={require('../../../../assets/img/icons/up_arrow.png')} alt="up" /></span>
                      </div>
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
                      <td>{admin.username}</td>
                      <td>{admin.email}</td>
                      <td>{admin.phone}</td>
                      <td>{admin.address}</td>
                      <td>{time && time[0] && time[0].label}</td>
                      <td>{admin.age}</td>
                      <td>{moment(admin.createdAt).format('DD/MM/YYYY')}</td>
                      <td>{admin.lastactive}</td>
                    </tr>
                  })
                ) :
                  MESSAGES.noAdminsFound
                }
              </tbody>
            </table>
            {adminsListing && adminsListing.length ? (
              <CustomPagination
                limit={STRINGS.SHOW_LIMIT}
                totalPages={adminTotalCount}
                itemsCount={adminsListing && adminsListing.length}
                currentPage={adminsTableIndex + 1}
                onPageChange={(value) => {
                  adminListApi(
                    {
                      skip: value.selected * STRINGS.SHOW_LIMIT,
                      limit: STRINGS.SHOW_LIMIT,
                    },
                    (response) => {
                      set_adminsTableIndex(value && value.selected);
                    }
                  );
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
                  {ADMIN_TABLE_HEADINGS.map((head) => (
                    <th key={head.name} style={{ textDecoration: "none" }}>
                      {head.name}
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
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone ? '+1' : ''} {user.phone}</td>
                      <td>{user.address}</td>
                      <td>{time && time[0] && time[0].label}</td>
                      <td>{user.age}</td>
                      <td>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
                      <td>{user.lastactive}</td>
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
                        <td>   <input name={STRINGS.USERNAME_INPUT}
                          type={'text'}
                          value={fields.username}
                          onChange={(e) => updateFields(STRINGS.USERNAME_INPUT, e.target.value)}
                        />  {error && error.username ? (
                          <span className="error_msg text-danger">{error.username}</span>
                        ) : null}</td>
                        <td>
                          <input name={STRINGS.EMAIL_INPUT_NAME}
                            type={'email'}
                            value={fields.email}
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
                              type={'tel'}
                              value={fields.phone}
                              onChange={(e) => updateFields(STRINGS.PHONE_INPUT, e.target.value)}
                            />   {error && error.phone ? (
                              <span className="error_msg text-danger">{error.phone}</span>
                            ) : null} </div>
                        </td>

                        <td>  <input name={STRINGS.ADDRESS_INPUT}
                          type={'text'}
                          value={fields.address}
                          onChange={(e) => updateFields(STRINGS.ADDRESS_INPUT, e.target.value)}
                        />  {error && error.address ? (
                          <span className="error_msg text-danger">{error.address}</span>
                        ) : null}
                        </td>

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
                        <td>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
                        <td>{user.lastactive}</td>
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
              limit={STRINGS.SHOW_LIMIT}
              totalPages={usersTotalCount}
              itemsCount={usersListing && usersListing.length}
              currentPage={usersTableIndex + 1}
              onPageChange={(value) => {
                setEditMode(false)
                setFields({})
                userListApi(
                  {
                    skip: value.selected * STRINGS.SHOW_LIMIT,
                    limit: STRINGS.SHOW_LIMIT,
                  },
                  (response) => {
                    set_usersListing(response.users);
                    set_usersTotalCount(response.totalRecords);
                    set_usersTableIndex(value.selected);
                  }
                );
              }}
            />
          ) : null}
        </div>
      </div>
    </div >
  );
};

export const Screen = User