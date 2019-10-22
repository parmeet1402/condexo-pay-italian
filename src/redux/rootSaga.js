import { all, takeLatest } from 'redux-saga/effects';
import API from '../services/api';
import { RegisterTypes } from './RegisterRedux';
import { AuthTypes } from './AuthRedux';
import { ForgotPasswordTypes } from './ForgotPasswordRedux';
import {
  checkUsername,
  uploadDocument,
  sendOtp,
  verifyOtp,
  completeRegistration,
  getCountryCodes
} from './RegisterSaga';
import { login } from './AuthSaga';
import {
  verifyUsernameAndSendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  sendResetPasswordLink,
  sendOtpFP,
  updatePassword,
  verifyToken
} from './ForgotPasswordSaga';
// APISauce object
const api = API.create();

export default function* root() {
  yield all([
    /* takeLatest(RegisterTypes.CHECK_USERNAME_REQUEST, checkUsername, api), */
    /* takeLatest(RegisterTypes.UPLOAD_DOCUMENT_REQUEST, uploadDocument, api), */
    takeLatest(RegisterTypes.GET_COUNTRY_CODES_REQUEST, getCountryCodes, api),
    takeLatest(RegisterTypes.SEND_OTP_REQUEST, sendOtp, api),
    takeLatest(RegisterTypes.VERIFY_OTP_REQUEST, verifyOtp, api),
    takeLatest(
      RegisterTypes.COMPLETE_REGISTRATION_REQUEST,
      completeRegistration,
      api
    ),
    takeLatest(AuthTypes.LOGIN_REQUEST, login, api),
    takeLatest(
      ForgotPasswordTypes.SEND_RESET_PASSWORD_LINK_REQUEST,
      sendResetPasswordLink,
      api
    ),
    takeLatest(
      ForgotPasswordTypes.VERIFY_USERNAME_AND_SEND_FORGOT_PASSWORD_OTP_REQUEST,
      verifyUsernameAndSendForgotPasswordOtp,
      api
    ),
    takeLatest(
      ForgotPasswordTypes.VERIFY_FORGOT_PASSWORD_OTP_REQUEST,
      verifyForgotPasswordOtp,
      api
    ),
    takeLatest(ForgotPasswordTypes.SEND_OTP_REQUEST_FP, sendOtpFP, api),
    takeLatest(
      ForgotPasswordTypes.UPDATE_PASSWORD_REQUEST,
      updatePassword,
      api
    ),
    takeLatest(ForgotPasswordTypes.VERIFY_TOKEN_REQUEST, verifyToken, api)
  ]);
}
