import { connect } from 'react-redux';
import { Screen } from "./screen";
const {
    stopLoader,
    startLoader,
    updateApprovalStatus,
    fetchAllUsersStats,
    fetchChampionshipUserStats,
} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({
        platformType: state.CommonReducer.platformType,
        usersRequestList: state.UserReducer.usersRequestList
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        startLoader: () => dispatch(startLoader()),
        stopLoader: () => dispatch(stopLoader()),
        fetchAllUsersStats: () => dispatch(fetchAllUsersStats()),
        fetchChampionshipUserStats: () => dispatch(fetchChampionshipUserStats()),
        updateApprovalStatus: (data, success) => dispatch(updateApprovalStatus(data, success))
    }
}
export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



