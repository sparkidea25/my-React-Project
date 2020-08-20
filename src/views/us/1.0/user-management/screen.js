import React, { useState, useEffect } from "react";
import "./style.scss";
import { ADMIN_TABLE_HEADINGS } from "../../../../shared/constants";
import { CustomPagination } from "../../../../components/atoms/pagination";
import { SnackbarWrapper } from "../../../../components/molecules/snackbar-wrapper";

export const Screen = ({ admins, users }) => {
  const [adminsListing, set_adminsListing] = useState([]);
  const [usersListing, set_usersListing] = useState([]);
  const [adminTotalCount, set_adminTotalCount] = useState(0);
  const [usersTotalCount, set_usersTotalCount] = useState(0);
  const [adminsTableIndex, set_adminsTableIndex] = useState(0);
  const [usersTableIndex, set_usersTableIndex] = useState(0);
  const [showLimit, set_showLimit] = useState(5);

  useEffect(() => {
    set_usersListing(
      users.slice(
        usersTableIndex * showLimit,
        usersTableIndex * showLimit + showLimit
      )
    );
    set_usersTotalCount(users.length);
  }, [usersTableIndex]);

  useEffect(() => {
    set_usersListing(
      users.slice(
        usersTableIndex * showLimit,
        usersTableIndex * showLimit + showLimit
      )
    );
  }, [usersTableIndex]);

  const [openSnackBar, set_openSnackbar] = useState(false);
  const [snackbarData, set_snackBarData] = useState({
    variant: "",
    message: "",
  });

  const removeUser = (username) => {
      //function for remove user api
      set_snackBarData({
          variant: 'success',
          message: username
      });
      set_openSnackbar(true);
  };

  return (
    <div className="container-fluid">
      <SnackbarWrapper
        visible={openSnackBar}
        onClose={() => set_openSnackbar(false)}
        variant={snackbarData.variant}
        message={snackbarData.message}
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
                {admins.length
                  ? admins.map((admin, ind) => (
                      <tr key={ind}>
                        <td>
                          {ind + 1}. {admin.first_name}
                        </td>
                        <td>{admin.last_name}</td>
                        <td>{admin.username}</td>
                        <td>{admin.email}</td>
                        <td>{admin.phone}</td>
                        <td>{admin.home_town}</td>
                        <td>{admin.time_zone}</td>
                        <td>{admin.age}</td>
                        <td>{admin.date_added}</td>
                        <td>{admin.last_active}</td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
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
                {users.length ? (
                  usersListing.map((user, ind) => (
                    <tr key={ind}>
                      <td>
                        {usersTableIndex * showLimit + ind + 1}.{" "}
                        {user.first_name}
                      </td>
                      <td>{user.last_name}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.home_town}</td>
                      <td>{user.time_zone}</td>
                      <td>{user.age}</td>
                      <td>{user.date_added}</td>
                      <td>{user.last_active}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={()=>removeUser(user.username)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>No Users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {users.length ? (
            <CustomPagination
              limit={showLimit}
              totalPages={usersTotalCount}
              itemsCount={usersListing && usersListing.length}
              currentPage={usersTableIndex + 1}
              onPageChange={(value) => {
                set_usersTableIndex(value.selected);
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
