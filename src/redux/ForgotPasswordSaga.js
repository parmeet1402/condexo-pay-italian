import { put, call, select } from 'redux-saga/effects';
import ForgotPasswordActions, {
  ForgotPasswordSelectors
} from './ForgotPasswordRedux';

export function* sendResetPasswordLink(api, action) {
  const username = yield select(ForgotPasswordSelectors.selectUsername);
  console.log('ACTION IS =>', action);
  console.log('RECEIVED USERNAME FROM STATE IS => ', username);
  const response = yield call(api.sendResetPasswordLink, { username }, 10);

  switch (response.status) {
    case 200:
      yield put(
        ForgotPasswordActions.sendResetPasswordLinkSuccess(
          response.data.message
        )
      );
      break;
    case 400:
    default:
      yield put(
        ForgotPasswordActions.sendResetPasswordLinkFailed(
          response.data.errors.message
        )
      );
  }
}
