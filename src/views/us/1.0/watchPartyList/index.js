import { connect } from 'react-redux';
import { Screen } from "./screen";
import './styles.scss';
const {
    listWatchParty,
    updateWatchParty
} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    console.log(state)
    return ({
        allPlatforms: state.ContentReducer.plaformList,
        allLeagues: state.ContentReducer.leagueList,
        watchPartyListing: state.ContentReducer.watchPartyList && state.ContentReducer.watchPartyList.watchPartyListing,
        LiveTotalCount: state && state.ContentReducer && state.ContentReducer.watchPartyList && state.ContentReducer.watchPartyList.totalCount
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        listWatchParty: (data, success, failure) => dispatch(listWatchParty(data, success, failure)),
        updateParty: (data, success, failure) => dispatch(updateWatchParty(data, success, failure))
    }
}
export const WatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);