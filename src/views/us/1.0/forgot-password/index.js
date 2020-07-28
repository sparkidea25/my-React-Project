import { connect } from 'react-redux';
import { Screen } from "./screen";
const { sendForgotEmail } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
    return ({
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendForgotEmail: (email, success, error) => dispatch(sendForgotEmail(email, success, error))
    }
}
export const ForgotScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



