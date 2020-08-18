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
const { ContentManagementScreen } = require(`../../../views/${LOCATION}/${VERSION}/content-management`);
const { WatchPartyScreen } = require(`../../../views/${LOCATION}/${VERSION}/watchPartyList`);
const { AddWatchPartyScreen } = require(`../../../views/${LOCATION}/${VERSION}/add-watch-party`);
const { ForgotScreen } = require(`../../../views/${LOCATION}/${VERSION}/forgot-password`);
const { UploadWatchPartyScreen } = require(`../../../views/${LOCATION}/${VERSION}/upload-watch-party`);
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
const { SnackbarWrapper } = require(`../../../components/molecules/snackbar-wrapper`);

const AuthenticatedRouter = (props) => {
  const { classes, setAuthorization, userToken, logout } = props;
  const [popupVisible, setPopVisible] = useState(false);
  let history = useHistory();
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [snackbarData, setSnackBarData] = useState({
    variant: '',
    message: ''
  });
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
        history={history}
      >
        <SnackbarWrapper
          visible={openSnackBar}
          onClose={() => setOpenSnackbar(false)}
          variant={snackbarData.variant}
          message={snackbarData.message}
        />
        <DecisionPopup
          modalVisibility={popupVisible}
          dialogContent={STRINGS.LOGOUT_CONTENT}
          dialogTitle={STRINGS.LOGOUT}
          confirmButtonTitle={STRINGS.CONFIRM}
          rejectButtonTitle={STRINGS.CANCEL}
          toggleDialogModal={() => setPopVisible(!popupVisible)}
          onConfirmation={() => {
            setPopVisible(false)
            logout(userToken, () => {

              setAuthorization(null);
              return <Redirect to={ROUTES.ROOT} />
            }, (error) => {
              setSnackBarData({
                variant: error.status ? 'success' : 'error',
                message: error.msg
              });
              setOpenSnackbar(true)
            });
          }}
          onRejection={() => setPopVisible(false)}
        />
        <Switch>
          <Route exact path={`${ROUTES.DASHBOARD}`} component={HomeScreen} />
          <Route exact path={`${ROUTES.CONTENT}`} component={ContentManagementScreen} />
          <Route exact path={`${ROUTES.WATCH_PARTY}`} component={WatchPartyScreen} />
          <Route exact path={`${ROUTES.ADD_WATCH_PARTY}`} component={AddWatchPartyScreen} />
          <Route exact path={`${ROUTES.UPLOAD_WATCH_PARTY}`} component={UploadWatchPartyScreen} />
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
    logout: (token, success, failure) => dispatch(logout(token, success, failure))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AuthenticatedRouter));
