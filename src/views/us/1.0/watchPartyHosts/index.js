import { connect } from 'react-redux';
import { Screen } from "./screen";

const { getWatchPartyHosts } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        getWatchPartyHosts: (payload, success, failure) => dispatch(getWatchPartyHosts(payload, success, failure)),
    }
}
export const WatchPartyHostScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);