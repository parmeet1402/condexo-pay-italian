import { put, call, select } from 'redux-saga/effects';
import AuthActions, { AuthSelectors } from './AuthRedux';

export function* login(api, action) {
  const credentials = yield select(AuthSelectors.selectCredentials());
  console.log('RECIEVED CREDENTIALS :::>', credentials);
  const response = yield call(api.login, credentials, 10);

  switch (response.status) {
    case 200:
      yield put(AuthActions.loginSuccess(response.data));
    case 400:
    default:
      yield put(AuthActions.loginFailed(response.data));
  }
}
