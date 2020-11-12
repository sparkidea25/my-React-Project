import { connect } from 'react-redux';
import { Screen } from "./screen";

const { getWatchPartyUsers } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        getWatchPartyUsers: (payload, success, failure) => dispatch(getWatchPartyUsers(payload, success, failure)),
    }
}
export const WatchPartyOperatorScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);