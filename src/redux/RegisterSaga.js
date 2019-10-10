import { put, call, select } from 'redux-saga/effects';
import RegisterActions, { RegisterSelectors } from './RegisterRedux';
import { findUsernameType } from '../utils';
export function* uploadDocument(api, action) {
  const { document } = action;
  const response = yield call(api.upload, document, 10);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(RegisterActions.uploadDocumentSuccess(response.data));
      break;

    case null:
    default:
      yield put(
        RegisterActions.uploadDocumentFailed(
          'Please check your internet connection.'
        )
      );
      break;
  }
}

export function* sendOtp(api, action) {
  const { username } = yield select(RegisterSelectors.selectFormData);
  console.log(username);
  const usernameType = findUsernameType(username);
  let response;
  if (usernameType === 'email') {
    response = yield call(api.sendEmailOtp, { email: username });
  } else if (username === 'phone') {
    // TODO: send phone otp
    response = yield call(api.sendPhoneOtp, { phone: username });
  }
  switch (response.status) {
    case 200:
      yield put(RegisterActions.sendOtpSuccess(response.data));
      break;
    case null:
    default:
      yield put(RegisterActions.sendOtpFailed(response.data));
      break;
  }
}
