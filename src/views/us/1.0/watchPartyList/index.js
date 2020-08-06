import { connect } from 'react-redux';
import { Screen } from "./screen";
const {
    listWatchParty
} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({

    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        listWatchParty: (success, failure) => dispatch(listWatchParty(success, failure))
    }
}
export const WatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);