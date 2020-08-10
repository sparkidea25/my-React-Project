import { connect } from 'react-redux';
import { Screen } from "./screen";
import './styles.scss';
const {
    listWatchParty,
    getPlatforms,
    getLeagues
} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({
        allPlatforms: state.ContentReducer.plaformList,
        allLeagues: state.ContentReducer.leagueList
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        listWatchParty: (success, failure) => dispatch(listWatchParty(success, failure)),
        getPlatforms: (success, failure) => dispatch(getPlatforms(success, failure)),
        getLeagues: (success, failure) => dispatch(getLeagues(success, failure))
    }
}
export const WatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);