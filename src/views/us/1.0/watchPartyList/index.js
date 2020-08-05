import { connect } from 'react-redux';
import { Screen } from "./screen";
const {
} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({

    });
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export const WatchPartyScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);