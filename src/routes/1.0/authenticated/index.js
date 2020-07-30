import React, { useEffect, useState } from 'react';
import {
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/styles';

const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../config/default`);
const { STRINGS } = require(`../../../shared/constants/${LOCATION}/strings`);
const { DecisionPopup } = require(`../../../components/atoms/decision-popup`);
const { ScreenHOC } = require(`../../../components/hoc/screen-hoc`);
const { HomeScreen } = require(`../../../views/${LOCATION}/${VERSION}/home`);
const { styles } = require(`../../../theme`);
const {
  DRAWER_ITEMS,
  HAMBURGER_ICON,
  HEADER_LOGO,
  CLOSE_ICON,
  ROUTES,
  HEADER_PROFILE_ITEMS
} = require(`../../../shared/constants`);
const {
  setAuthorization,
  stopLoader,
  logout
} = require(`../../../redux/actions`);

const AuthenticatedRouter = (props) => {
  const { classes, setAuthorization, userToken, logout } = props;
  const [popupVisible, setPopVisible] = useState(false);
  let history = useHistory();
  return (
    <div>
      <ScreenHOC
        containerStyle={classes.screenHocContainer}
        childrenStyle={classes.screenContentContainer}
        drawerItems={DRAWER_ITEMS}
        headerMenuItem={HEADER_PROFILE_ITEMS}
        onClickAction={(changedUrl) => {
          if (changedUrl === ROUTES.LOGOUT) {
            setPopVisible(true);
          }
          else {
            history.push(changedUrl);
          }
        }}
        hamburgerIcon={HAMBURGER_ICON}
        headerLogo={HEADER_LOGO}
        headerLogoAction={() => {
          history.replace(ROUTES.DASHBOARD)
        }}
        backArrow={CLOSE_ICON}
        logout={() => {
          setPopVisible(true)
      }}
      >
        <DecisionPopup
          modalVisibility={popupVisible}
          dialogContent={STRINGS.LOGOUT_CONTENT}
          dialogTitle={STRINGS.LOGOUT}
          confirmButtonTitle={STRINGS.CONFIRM}
          rejectButtonTitle={STRINGS.CANCEL}
          toggleDialogModal={() => setPopVisible(!popupVisible)}
          onConfirmation={() => {
            logout(userToken, () => {
              setPopVisible(false)
              setAuthorization(null);
              return <Redirect to={ROUTES.ROOT} />
            });
          }}
          onRejection={() => setPopVisible(false)}
        />
        <Switch>
          <Route exact path={`${ROUTES.DASHBOARD}`} component={HomeScreen} />
          <Redirect to={ROUTES.DASHBOARD} />
        </Switch>
      </ScreenHOC>
    </div>
  );
}

const mapStateToProps = (state) => {
  return ({
    userToken: state.CommonReducer.userToken,
  });
}
const mapDispatchToProps = (dispatch) => {
  return {
    setAuthorization: (userData) => dispatch(setAuthorization(userData)),
    stopLoader: () => dispatch(stopLoader()),
    logout: (token, success,failure) => dispatch(logout(token, success,failure))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuthenticatedRouter));
