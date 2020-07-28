import { all, fork } from 'redux-saga/effects';
import AuthSaga from './auth';

function* dataSaga() {
  yield all([
    fork(AuthSaga),
  ]);
}


export default dataSaga;
