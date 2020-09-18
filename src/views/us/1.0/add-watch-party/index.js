import { connect } from 'react-redux';
import { Screen } from "./screen";

const { addWatchParty, getPlatforms, getLeagues, uploadImage, getWatchPartyVideos, updateWatchParty, getWatchPartyInfo } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({
        allPlatforms: state.ContentReducer.plaformList,
        allLeagues: state.ContentReducer.leagueList,
        userToken: state.CommonReducer.userToken,
        allWatchPartyVideosList: state.ContentReducer.watchPartyVideosList,
        watchPartyList: state.ContentReducer.watchPartyList,
        watchPartyForUpdate: state.ContentReducer.watchPartyForUpdate
        // formValues: state && state.form && state.form.watchparty && state.form.watchparty.values,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        addWatchParty: (data, success, failure) => dispatch(addWatchParty(data, success, failure)),
        getPlatforms: (success, failure) => dispatch(getPlatforms(success, failure)),
        getLeagues: (success, failure) => dispatch(getLeagues(success, failure)),
        uploadFile: (data, success, failure) => dispatch(uploadImage(data, success, failure)),
        getWatchPartyVideos: (token, success, failure) => dispatch(getWatchPartyVideos(token, success, failure)),
        updateParty: (data, success, failure) => dispatch(updateWatchParty(data, success, failure)),
        getWatchPartyInfo: (data, success, failure) => dispatch(getWatchPartyInfo(data, success, failure))
    }
}
export const AddWatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);