import { connect } from 'react-redux';
import { Screen } from "./screen";

const { } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {

    return ({
        allPlatforms: state.ContentReducer.plaformList,
        allLeagues: state.ContentReducer.leagueList,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export const UploadWatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);