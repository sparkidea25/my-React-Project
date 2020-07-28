import { connect } from 'react-redux';
import { Screen } from "./screen";
const { checkLogin, rememberMe, stopLoader } = require(`../../../../redux/actions`);

const mapStateToProps = (state) => {
  return ({
    rememberCredentials: state.CommonReducer.rememberCredentials
  });
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: (credentials, success, onError) => dispatch(checkLogin(credentials, success, onError)),
    rememberMe: credentials => dispatch(rememberMe(credentials)),
    stopLoader: () => dispatch(stopLoader())
  }
}
export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Screen);



