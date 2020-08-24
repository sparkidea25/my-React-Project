import React, { useState, useEffect } from "react";
import "./style.scss";
import { ADMIN_TABLE_HEADINGS } from "../../../../shared/constants";
import { CustomPagination } from "../../../../components/atoms/pagination";
import { SnackbarWrapper } from "../../../../components/molecules/snackbar-wrapper";
import { DecisionPopup } from "../../../../components/atoms/decision-popup";
import { STRINGS } from "../../../../shared/constants/us/strings";

export const Screen = ({ listAdmins, listUsers, removeUserAction }) => {
  const [adminsListing, set_adminsListing] = useState([]);
  const [usersListing, set_usersListing] = useState([]);
  const [adminTotalCount, set_adminTotalCount] = useState(0);
  const [usersTotalCount, set_usersTotalCount] = useState(0);
  const [adminsTableIndex, set_adminsTableIndex] = useState(0);
  const [usersTableIndex, set_usersTableIndex] = useState(0);

  const adminListApi = (data, response) => {
    let postData = Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
    listAdmins(
      postData,
      (resp) => response(resp),
      () => {}
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
      () => {}
    );
  };

  useEffect(() => {
    adminListApi({ skip: 0, limit: STRINGS.SHOW_LIMIT }, (response) => {
      set_adminsListing(response.admins);
      set_adminTotalCount(response.totalRecords);
    });
    userListApi({ skip: 0, limit: STRINGS.SHOW_LIMIT }, (response) => {
      set_usersListing(response.users);
      set_usersTotalCount(response.totalRecords);
    });
  }, []);

  useEffect(() => {}, [adminsTableIndex]);

  useEffect(() => {}, [usersTableIndex]);

  const [openSnackBar, set_openSnackbar] = useState(false);
  const [snackbarData, set_snackBarData] = useState({
    variant: "",
    message: "",
  });

  const [openPopup, set_openPopup] = useState(false);
  const [userToRemove, set_userToRemove] = useState("");

  const removeUser = (username) => {
    //function for remove user api
    removeUserAction(
      username,
      (response) => {
        set_snackBarData({
          variant: response.status ? "success" : "error",
          message: response.msg,
        });
        set_openSnackbar(true);
        if (usersTotalCount <= usersTableIndex * STRINGS.SHOW_LIMIT + 1) {
          set_usersTableIndex(usersTableIndex - 1);
        } else {
          userListApi(
            {
              skip: usersTableIndex * STRINGS.SHOW_LIMIT,
              limit: STRINGS.SHOW_LIMIT,
            },
            (response) => {
              set_usersListing(response.userListing);
              set_usersTotalCount(response.totalCount);
            }
          );
        }
      },
      (error) => {
        set_snackBarData({
          variant: error.status ? "error" : "error",
          message: error.msg,
        });
        set_openSnackbar(true);
      }
    );
    set_userToRemove("");
  };

  return (
    <div className="container-fluid">
      <SnackbarWrapper
        visible={openSnackBar}
        onClose={() => set_openSnackbar(false)}
        variant={snackbarData.variant}
        message={snackbarData.message}
      />

      <DecisionPopup
        modalVisibility={openPopup}
        dialogContent={`Click confirm to remove user : ${userToRemove}`}
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
        <div className="row  page-title">
          <h1 className="col-md-3">User Management</h1>
          <div className="col-md-6">
            <button className="btn btn-md btn-primary">Export</button>
          </div>
        </div>

        <div className="users_list">
          <div className="d-flex table_title">
            <h3>Admins</h3>
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
                {adminsListing && adminsListing.length ? (
                  adminsListing.map((admin, ind) => (
                    <tr key={ind}>
                      <td>
                        {adminsTableIndex * STRINGS.SHOW_LIMIT + ind + 1}.{" "}
                        {admin.firstName}
                      </td>
                      <td>{admin.lastName}</td>
                      <td>{admin.username}</td>
                      <td>{admin.email}</td>
                      <td>{admin.phone}</td>
                      <td>{admin.hometown}</td>
                      <td>{admin.timezone}</td>
                      <td>{admin.age}</td>
                      <td>{admin.dateadded}</td>
                      <td>{admin.lastactive}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      style={{
                        color: "#4D4D4F",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      Sorry, something went wrong.
                    </td>
                  </tr>
                )}
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
                      console.log(response);
                      set_adminsListing(response.admins);
                      set_adminTotalCount(response.totalRecords);
                      set_adminsTableIndex(value.selected);
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
                  usersListing.map((user, ind) => (
                    <tr key={ind}>
                      <td>
                        {usersTableIndex * STRINGS.SHOW_LIMIT + ind + 1}.{" "}
                        {user.firstName}
                      </td>
                      <td>{user.lastName}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.hometown}</td>
                      <td>{user.timezone}</td>
                      <td>{user.age}</td>
                      <td>{user.dateadded}</td>
                      <td>{user.lastactive}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            set_userToRemove(user.username);
                            set_openPopup(true);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      style={{
                        color: "#4D4D4F",
                        fontSize: 16,
                        fontWeight: "600",
                      }}
                    >
                      No Users found.
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
    </div>
  );
};
