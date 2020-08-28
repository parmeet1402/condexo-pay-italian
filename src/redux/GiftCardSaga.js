import { put, call, select } from 'redux-saga/effects';
import GiftCardActions, { GiftCardSelectors } from './GiftCardRedux';
import isEmpty from 'lodash/isEmpty';
import AuthActions, { AuthSelectors } from './AuthRedux';
import {
  getStripeCommissionAmount,
  getCondexoCommissionAmount,
  getTotalInclusiveOfCommissions,
} from '../utils/commissions';

const getErrorMessage = (response) =>
  !isEmpty(response.data) && !isEmpty(response.data.errors)
    ? response.data.errors.message
    : 'Something went wrong.';

export function* getGiftCardList(api, { searchQuery }) {
  console.log(searchQuery);
  const response = yield call(api.giftCardList, searchQuery);
  switch (response.status) {
    case 200:
      console.log(response.data);
      yield put(
        GiftCardActions.getGiftCardListSuccess(
          response.data.sort((a, b) => {
            if (a.supplier < b.supplier) {
              return -1;
            }
            if (a.supplier > b.supplier) {
              return 1;
            }
            return 0;
          })
        )
      );
      break;
    case 400:
    default:
      yield put(
        GiftCardActions.getGiftCardListFailed(getErrorMessage(response))
      );
  }
}

export function* topUpGiftCard(api, { data }) {
  console.log('Data--');
  const { paymentSource } = data;

  // select me user
  // todo: fetch phone number to mobile
  // todo: fetch user id
  const {
    phoneNumber: mobile,
    _id: userId,
    stripeCustomerId,
    email: ownEmail,
  } = yield select(AuthSelectors.selectCurrentUser);
  console.log('--- INSIDE SAGA', mobile, userId);

  // select giftcaredrequestobj
  // todo: fetch amount
  // todo: fetch email
  // todo: fetch desc
  const { email, amount, desc: description, amazonId } = yield select(
    GiftCardSelectors.selectTopUpGiftCardRequestObj
  );

  const { supplier } = yield select(GiftCardSelectors.selectActiveGiftCard);

  const { productType: type, product: productName, eanNo } = yield select(
    GiftCardSelectors.selectActiveProduct
  );

  // select issue and development
  console.log(data);
  const response = yield call(api.topUpGiftCard, {
    mobile,
    userId,
    email: email || ownEmail,
    amount: getTotalInclusiveOfCommissions(amount),
    topUpAmount: amount,
    condexoCommissionAmount: getCondexoCommissionAmount(),
    stripeCommissionAmount: getStripeCommissionAmount(amount),
    description,
    supplier,
    type,
    productName,
    eanNo,
    stripeCustomerId,
    paymentSource,
  });
  switch (response.status) {
    case 200:
      yield put(GiftCardActions.topUpGiftCardSuccess(response.data.message));
      break;
    case 400:
    default:
      yield put(GiftCardActions.topUpGiftCardFailed(getErrorMessage(response)));
  }
}
