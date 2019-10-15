import { put, call, select } from 'redux-saga/effects';
import ForgotPasswordActions, {
  ForgotPasswordSelectors
} from './ForgotPasswordRedux';

export function* verifyUsernameAndSendForgotPasswordOtp(api, { username }) {
  const response = yield call(api.verifyUsernameAndSendForgotPasswordOtp, {
    username
  });
  switch (response.status) {
    case 200:
      yield put(
        ForgotPasswordActions.verifyUsernameAndSendForgotPasswordOtpSuccess(
          response.data.message
        )
      );

      break;
    case 400:
    default:
      yield put(
        ForgotPasswordActions.verifyUsernameAndSendForgotPasswordOtpFailed(
          response.data.errors.message
        )
      );
  }
}

export function* verifyForgotPasswordOtp(api, { otp }) {
  const email = yield select(ForgotPasswordSelectors.selectUsername);
  const response = yield call(api.verifyEmailOtp, { email, otp });
  switch (response.status) {
    case 200:
      yield put(
        ForgotPasswordActions.verifyForgotPasswordOtpSuccess(
          response.data.message
        )
      );
      yield put(
        ForgotPasswordActions.sendResetPasswordLinkRequest({ username: email })
      );
      break;
    case 400:
    default:
      yield put(
        ForgotPasswordActions.verifyForgotPasswordOtpFailed(
          response.data.errors.message
        )
      );
  }
}

export function* sendForgotPasswordOtp(api, action) {
  const email = yield select(ForgotPasswordSelectors.selectUsername);
  const response = yield call(api.verifyEmailOtp, { email });

  switch (response.status) {
    case 200:
      yield put(
        ForgotPasswordActions.sendForgotPasswordOtpSuccess(
          response.data.message
        )
      );
      break;
    case 400:
    default:
      yield put(
        ForgotPasswordActions.sendForgotPasswordOtpFailed(
          response.data.errors.message
        )
      );
  }
}

export function* sendResetPasswordLink(api, action) {
  const username = yield select(ForgotPasswordSelectors.selectUsername);
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

export function* sendOtpFP(api, action) {
  const username = yield select(ForgotPasswordSelectors.selectUsername);
  const response = yield call(api.sendEmailOtp, { email: username });
  switch (response.status) {
    case 200:
      yield put(ForgotPasswordActions.sendOtpSuccessFP(response.data.message));
      break;

    // TODO: CASE 400
    case null:
    default:
      yield put(
        ForgotPasswordActions.sendOtpFailedFP(response.data.errors.message)
      );
      break;
  }
}

export function* updatePassword(
  api,
  { password, confirmPassword, forgotPwdToken }
) {
  const response = yield call(api.updatePassword, {
    password,
    confirmPassword,
    forgotPwdToken
  });

  switch (response.status) {
    case 200:
      yield put(
        ForgotPasswordActions.updatePasswordSuccess(response.data.message)
      );
      break;
    case null:
    default:
      yield put(
        ForgotPasswordActions.updatePasswordFailed(response.data.errors.message)
      );
      break;
  }
}

export function* verifyTokenRequest(api, { username, forgotPwdToken }) {
  const response = yield call(api.verifyToken, {
    email: username,
    forgotPwdToken,
    platform: 'uk'
  });
  switch (response.status) {
    case 200:
      yield put(
        ForgotPasswordActions.verifyTokenSuccess(response.data.message)
      );
      break;
    case null:
    default:
      yield put(
        ForgotPasswordActions.verifyTokenFailed(response.data.errors.message)
      );
      break;
  }
}
