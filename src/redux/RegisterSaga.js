import { put, call, select } from 'redux-saga/effects';
import RegisterActions, { RegisterSelectors } from './RegisterRedux';
/* import { findUsernameType } from '../utils'; */

export function* checkUsername(api, { username }) {
  const response = yield call(api.checkUsername, username, 10);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(RegisterActions.checkUsernameSuccess(response.data));
      break;
    case 400:
    case null:
    default:
      yield put(
        RegisterActions.checkUsernameFailed(
          response.data.errors.message ||
            'Please check your internet connection.'
        )
      );
  }
}

export function* uploadDocument(api, action) {
  const { document } = action;
  const response = yield call(api.upload, document, 10);
  console.log(response);
  switch (response.status) {
    case 200:
      const successResponse = {
        message: response.data.message,
        filename: response.data.fileResponse.document
      };
      console.log(successResponse);
      yield put(RegisterActions.uploadDocumentSuccess(successResponse));
      break;

    case 400:
      console.log(response.data.errors.message);
      yield put(RegisterActions.uploadDocumentFailed(response.data));
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
  const usernameType = 'email';
  //const usernameType = findUsernameType(username);
  let response;
  if (usernameType === 'email') {
    response = yield call(api.sendEmailOtp, { email: username });
  } else if (username === 'phone') {
    // TODO: send phone otp
    response = yield call(api.sendPhoneOtp, { phone: username });
  }
  if (!!response) {
    switch (response.status) {
      case 200:
        yield put(RegisterActions.sendOtpSuccess(response.data));
        break;

      // TODO: CASE 400
      case null:
      default:
        yield put(RegisterActions.sendOtpFailed(response.data));
        break;
    }
  }
}

export function* verifyOtp(api, action) {
  const { username } = yield select(RegisterSelectors.selectFormData);
  const { otp } = action;
  const usernameType = 'email';
  //const usernameType = findUsernameType(username);
  let response;
  if (usernameType === 'email') {
    response = yield call(api.verifyEmailOtp, {
      email: username,
      otp
    });
  } else if (username === 'phone') {
    // TODO: verify phone otp
    response = yield call(api.verifyPhoneOtp, { phone: username });
  }
  if (!!response) {
    switch (response.status) {
      case 200:
        yield put(RegisterActions.verifyOtpSuccess(response.data));
        yield put(RegisterActions.completeRegistrationRequest());
        break;
      case 404:
        yield put(RegisterActions.verifyOtpFailed(response.data.errors));
        break;
      // TODO: CASE 400
      case null:
      default:
        yield put(
          RegisterActions.verifyOtpFailed(response.data.errors.message)
        );
        break;
    }
  }
}

export function* completeRegistration(api, action) {
  const formData = yield select(RegisterSelectors.selectFormData);
  const response = yield call(api.completeRegistration, formData, 10);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(RegisterActions.completeRegistrationSuccess());
      break;
    case 400:
    case 422:
      console.log(response.data.errors.message);
      yield put(
        RegisterActions.completeRegistrationFailed(response.data.errors.message)
      );
      break;

    case null:
    default:
      yield put(
        RegisterActions.completeRegistrationFailed(
          'Please check your internet connection.'
        )
      );
      break;
  }
}
