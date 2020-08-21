import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth';
import ContentSaga from './contentManagement'
import userManagementSaga from './userManagement';

function* dataSaga() {
  yield all([
    fork(AuthSaga),
    fork(ContentSaga),
    fork(userManagementSaga),
  ]);
}


export default dataSaga;
