import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth';
import ContentSaga from './contentManagement'

function* dataSaga() {
  yield all([
    fork(AuthSaga),
    fork(ContentSaga),
  ]);
}


export default dataSaga;
