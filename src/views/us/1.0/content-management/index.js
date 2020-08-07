import { connect } from 'react-redux';
import { Screen } from "./screen";
import './styles.scss';
const {
    exportWatchParty
} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({

    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        exportWatchParty: (data, success, onError) => dispatch(exportWatchParty(data, success, onError))
    }
}
export const ContentManagementScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);