import { connect } from "react-redux";
import { Screen } from "./screen";
import { listAdmins, removeUser, listUsers, updateUser, getAllTimeZones } from "../../../../redux/actions";

const mapStateToProps = (state) => {
  return { TimeZones: state.CommonReducer.TimeZones };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listAdmins: (payload, success, failure) =>
      dispatch(listAdmins(payload, success, failure)),
    listUsers: (payload, success, failure) =>
      dispatch(listUsers(payload, success, failure)),
    removeUserAction: (payload, success, failure) =>
      dispatch(removeUser(payload, success, failure)),
    updateUser: (data, success, failure) =>
      dispatch(updateUser(data, success, failure)),
    getAllTimeZones: (data, success, failure) => dispatch(getAllTimeZones(data, success, failure))
  };
};

export const UserManagementScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(Screen);
