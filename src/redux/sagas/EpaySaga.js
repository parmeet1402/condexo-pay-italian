import { put, call, select } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import EpayActions, { EpaySelectors } from '../reducers/EpayRedux';
import { AuthSelectors } from '../reducers/AuthRedux';
import { getTotalInclusiveOfCommissions } from '../../utils/commissions';
export function* getBrands(api, action) {
  const response = yield call(api.getBrands);
  switch (response.status) {
    case 200:
      yield put(EpayActions.getBrandsSuccess(response.data));
      break;
    case 400:
    default:
      yield put(EpayActions.getBrandsFailed(getErrorMessage(response)));
  }
}

export function* getCards(api, action) {
  const { _id: userId } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.getCards, { userId });
  switch (response.status) {
    case 200:
      yield put(EpayActions.getCardsSuccess(response.data));
      break;
    case 400:
    default:
      yield put(EpayActions.getCardsFailed(getErrorMessage(response)));
  }
}

export function* mobileTopup(api, action) {
  /* const { _id: userId, email } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.mobileTopup, {
    ...action.data,
    userId,
    email: action.data.email || email,
  }, false); */
  let userId = '';
  let email = '';
  const authResponse = yield select(AuthSelectors.selectCurrentUser);
  if (!isEmpty(authResponse)) {
    userId = authResponse._id;
    email = authResponse.email;
  }
  const isGuest = !(authResponse && authResponse._id);
  const response = yield call(
    api.mobileTopup,
    {
      ...action.data,
      ...(!isGuest && { userId }),
      email: action.data.email || email,
    },
    isGuest
  );

  switch (response.status) {
    case 200:
      yield put(EpayActions.mobileTopupSuccess(response.data.user));
      break;
    case 400:
    default:
      yield put(EpayActions.mobileTopupFailed(getErrorMessage(response)));
  }
}

export function* addCard(api, action) {
  const { stripeCustomerId, _id } = yield select(
    AuthSelectors.selectCurrentUser
  );
  const response = yield call(api.addCardDetails, {
    ...action.data,
    stripeCustomerId,
    userId: _id,
  });

  switch (response.status) {
    case 200:
      yield put(
        EpayActions.payRechargeRequest({
          ...action.recharge,
          paymentSource: action.data.cardId,
        })
      );
      break;
    case 400:
    default:
      yield put(EpayActions.addCardAndPayFailed(getErrorMessage(response)));
  }
}

export function* payRecharge(api, action) {
  let userId = '';
  let email = '';
  let stripeCustomerId = '';
  const authResponse = yield select(AuthSelectors.selectCurrentUser);

  if (!isEmpty(authResponse)) {
    userId = authResponse._id;
    email = authResponse.email;
    stripeCustomerId = authResponse.stripeCustomerId;
  }
  const isGuest = !(authResponse && authResponse._id);
  const reserveTransactionId = yield select(
    EpaySelectors.selectReserveTransactionId
  );
  const response = yield call(
    api.payRecharge,
    {
      ...action.data,
      email: action.data.email || email,
      reserveTransactionId,
      ...(!isGuest && { userId, stripeCustomerId }),
    },
    isGuest
  );

  switch (response.status) {
    case 200:
      yield put(EpayActions.payRechargeSuccess());
      break;
    case 400:
    default:
      yield put(EpayActions.payRechargeFailed(getErrorMessage(response)));
  }
}

export function* deleteCard(api, action) {
  const { stripeCustomerId } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.deleteCard, {
    ...action.data,
    stripeCustomerId,
  });

  switch (response.status) {
    case 200:
      yield put(EpayActions.getCardsRequest());
      break;
    case 400:
    default:
      yield put(EpayActions.deleteCardFailed(getErrorMessage(response)));
  }
}

const getErrorMessage = (response) =>
  !isEmpty(response.data) && !isEmpty(response.data.errors)
    ? response.data.errors.message
    : 'Something went wrong.';
