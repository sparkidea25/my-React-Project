import { connect } from 'react-redux';
import { Screen } from "./screen";
const { resetPassword } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {

    return ({
        userToken: state.CommonReducer.userToken
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (data, success, failure) => dispatch(resetPassword(data, success, failure))
    }
}
export const ResetPasswordScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);