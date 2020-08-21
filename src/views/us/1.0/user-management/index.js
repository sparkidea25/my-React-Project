import { connect } from "react-redux";
import { Screen } from "./screen";
import { listAdmins, removeUser, listUsers } from "../../../../redux/actions";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    listAdmins: (payload, success, failure) =>
      dispatch(listAdmins(payload, success, failure)),
    listUsers: (payload, success, failure) =>
      dispatch(listUsers(payload, success, failure)),
    removeUserAction: (payload, success, failure) =>
      dispatch(removeUser(payload, success, failure)),
  };
};

export const UserManagementScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
