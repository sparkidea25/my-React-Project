import { connect } from 'react-redux';
import { Screen } from "./screen";

const { getWatchPartyHosts, addRemoveHostsRequest, searchWatchPartyHostUsers } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        addRemoveHostsRequest: (payload, success, failure) => dispatch(addRemoveHostsRequest(payload, success, failure)),
        getWatchPartyHosts: (payload, success, failure) => dispatch(getWatchPartyHosts(payload, success, failure)),
        searchWatchPartyHostUsers: (payload, success, failure) => dispatch(searchWatchPartyHostUsers(payload, success, failure)),
    }
}
export const WatchPartyHostScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);