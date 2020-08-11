import { connect } from 'react-redux';
import { Screen } from "./screen";
const {
    stopLoader,
    startLoader,
    getPlatforms,
    getLeagues,
    getSports,
} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({

    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPlatforms: (success, failure) => dispatch(getPlatforms(success, failure)),
        getLeagues: (success, failure) => dispatch(getLeagues(success, failure)),
        getSports: (success, failure) => dispatch(getSports(success, failure)),
    }
}
export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



