import { put, call, select } from 'redux-saga/effects';
import RegisterActions, { RegisterSelectors } from './RegisterRedux';
import AuthActions from './AuthRedux';
/* import { findUsernameType } from '../utils'; */

export function* getCountryCodes(api, action) {
  const response = yield call(api.getCountryCodes);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(RegisterActions.getCountryCodesSuccess(response.data));
      break;
    case 400:
    case null:
    default:
      yield put(
        RegisterActions.getCountryCodesFailed(
          response.data.errors.message ||
            'Please check your internet connection'
        )
      );
  }
}

export function* checkUsername(api, { username }) {
  const response = yield call(api.checkUsername, username, 10);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(RegisterActions.checkUsernameSuccess(response.data.message));
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
/* 
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
} */

export function* sendOtp(api, action) {
  console.log(action);
  const { phoneNumber, countryCode } = yield select(
    RegisterSelectors.selectFormData
  );

  /* const usernameType = 'phone'; */
  //const usernameType = findUsernameType(username);
  /* let response; */
  /* if (usernameType === 'email') { */
  //response = yield call(api.sendEmailOtp, { email: username });
  //} else if (username === 'phone') {

  //}
  const response = yield call(api.sendOtp, {
    phone: phoneNumber,
    countryCode,
    platform: 'it',
  });
  console.log(response);
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
  const { phoneNumber, countryCode } = yield select(
    RegisterSelectors.selectFormData
  );
  const { otp } = action;
  const response = yield call(api.verifyOtp, {
    phone: phoneNumber,
    countryCode,
    otp,
  });
  if (!!response) {
    switch (response.status) {
      case 200:
        yield put(RegisterActions.verifyOtpSuccess(response.data));
        /* yield put(RegisterActions.completeRegistrationRequest()); */
        break;
      case 404:
        yield put(RegisterActions.verifyOtpFailed(response.data.errors));
        break;
      case 500:
        yield put(RegisterActions.verifyOtpFailed(response.data));
      // TODO: CASE 400
      case null:
      default:
        console.log(response);
        yield put(
          RegisterActions.verifyOtpFailed(
            response.data.errors.message || response.data.message
          )
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
      yield put(AuthActions.loginSuccess(response.data));
      yield call(api.setAuthToken, response.data.token);
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
