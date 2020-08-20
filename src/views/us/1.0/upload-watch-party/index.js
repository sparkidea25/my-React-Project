import { connect } from 'react-redux';
import { Screen } from "./screen";

const { exportWatchParty, uploadImage } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {

    return ({
        allPlatforms: state.ContentReducer.plaformList,
        allLeagues: state.ContentReducer.leagueList,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        exportWatchParty: (data, success, onError) => dispatch(exportWatchParty(data, success, onError)),
        uploadImage: (data, success, onError) => dispatch(uploadImage(data, success, onError)),
    }
}
export const UploadWatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);