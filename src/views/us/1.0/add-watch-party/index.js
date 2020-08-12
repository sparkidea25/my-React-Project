import { connect } from 'react-redux';
import { Screen } from "./screen";

const { addWatchParty, getPlatforms, getLeagues } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({
        allPlatforms: state.ContentReducer.plaformList,
        allLeagues: state.ContentReducer.leagueList,
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        addWatchParty: (data, success, failure) => dispatch(addWatchParty(data, success, failure)),
        getPlatforms: (success, failure) => dispatch(getPlatforms(success, failure)),
        getLeagues: (success, failure) => dispatch(getLeagues(success, failure)),
    }
}
export const AddWatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);