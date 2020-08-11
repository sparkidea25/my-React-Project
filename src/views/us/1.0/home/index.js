import { connect } from 'react-redux';
import { Screen } from "./screen";
const {
    stopLoader,
    startLoader,

} = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({

    });
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



