import { connect } from 'react-redux';
import { Screen } from "./screen";
import './styles.scss';
const {
    exportWatchParty,
    getPlatforms,
    getLeagues,
    getSports
} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    console.log(state)
    return ({
        allPlatforms: state.ContentReducer.plaformList,
        allLeagues: state.ContentReducer.leagueList,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        exportWatchParty: (data, success, onError) => dispatch(exportWatchParty(data, success, onError)),
        getPlatforms: (success, failure) => dispatch(getPlatforms(success, failure)),
        getLeagues: (success, failure) => dispatch(getLeagues(success, failure)),
        getSports: (success, failure) => dispatch(getSports(success, failure)),
    }
}
export const ContentManagementScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);