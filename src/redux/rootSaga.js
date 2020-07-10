import { all, takeLatest, debounce } from 'redux-saga/effects';
import API from '../services/api';
import { RegisterTypes } from './RegisterRedux';
import { AuthTypes } from './AuthRedux';
import { ForgotPasswordTypes } from './ForgotPasswordRedux';
import { MyProfileTypes } from './MyProfileRedux';
import { EpayTypes } from './EpayRedux';
import { GiftCardTypes } from './GiftCardRedux';
import {
  checkUsername,
  uploadDocument,
  sendOtp,
  verifyOtp,
  completeRegistration,
  getCountryCodes,
} from './RegisterSaga';
import { login } from './AuthSaga';
import {
  verifyUsernameAndSendForgotPasswordOtp,
  verifyForgotPasswordOtp,
  sendResetPasswordLink,
  sendOtpFP,
  updatePassword,
  verifyToken,
} from './ForgotPasswordSaga';
import {
  getProfileDetails,
  updateProfileDetails,
  changePassword,
  deleteAccount,
  getProfileCards,
  updateProfileCardStatus,
  updateProfileCardDetails,
  deleteProfileCard,
  addProfileCard,
} from './MyProfileSaga';
import {
  getBrands,
  getCards,
  mobileTopup,
  addCard,
  payRecharge,
  deleteCard,
} from './EpaySaga';
import { getMyPayments } from './MyPaymentsSaga';
import { MyPaymentTypes } from './MyPaymentsRedux';
import { DashboardTypes } from './DashboardRedux';
import { getLatestPayment } from './DashboardSaga';
import { getGiftCardList } from './GiftCardSaga';
// APISauce object
const api = API.create();

export const setAuthHeaderSaga = (token) => {
  api.setAuthToken(token);
};

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
    takeLatest(ForgotPasswordTypes.VERIFY_TOKEN_REQUEST, verifyToken, api),
    takeLatest(
      MyProfileTypes.GET_PROFILE_DETAILS_REQUEST,
      getProfileDetails,
      api
    ),
    takeLatest(
      MyProfileTypes.UPDATE_PROFILE_DETAILS_REQUEST,
      updateProfileDetails,
      api
    ),
    takeLatest(
      MyProfileTypes.UPDATE_PROFILE_CARD_STATUS_REQUEST,
      updateProfileCardStatus,
      api
    ),
    takeLatest(
      MyProfileTypes.UPDATE_PROFILE_CARD_DETAILS_REQUEST,
      updateProfileCardDetails,
      api
    ),
    takeLatest(
      MyProfileTypes.DELETE_PROFILE_CARD_REQUEST,
      deleteProfileCard,
      api
    ),
    takeLatest(MyProfileTypes.ADD_PROFILE_CARD_REQUEST, addProfileCard, api),
    takeLatest(MyProfileTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(MyProfileTypes.DELETE_ACCOUNT_REQUEST, deleteAccount, api),
    takeLatest(MyProfileTypes.GET_PROFILE_CARDS_REQUEST, getProfileCards, api),
    takeLatest(EpayTypes.GET_BRANDS_REQUEST, getBrands, api),
    takeLatest(EpayTypes.GET_CARDS_REQUEST, getCards, api),
    takeLatest(EpayTypes.MOBILE_TOPUP_REQUEST, mobileTopup, api),
    takeLatest(EpayTypes.ADD_CARD_AND_PAY_REQUEST, addCard, api),
    takeLatest(EpayTypes.PAY_RECHARGE_REQUEST, payRecharge, api),
    takeLatest(EpayTypes.DELETE_CARD_REQUEST, deleteCard, api),
    debounce(1000, MyPaymentTypes.GET_PAYMENTS_REQUEST, getMyPayments, api),
    takeLatest(
      DashboardTypes.GET_LATEST_PAYMENT_REQUEST,
      getLatestPayment,
      api
    ),
    takeLatest(GiftCardTypes.GET_GIFT_CARD_LIST_REQUEST, getGiftCardList, api),
  ]);
}
