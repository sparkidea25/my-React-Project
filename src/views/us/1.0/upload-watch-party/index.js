import { connect } from 'react-redux';
import { Screen } from "./screen";

const { exportWatchParty } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {

    return ({
        allPlatforms: state.ContentReducer.plaformList,
        allLeagues: state.ContentReducer.leagueList,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        exportWatchParty: (data, success, onError) => dispatch(exportWatchParty(data, success, onError)),
    }
}
export const UploadWatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);