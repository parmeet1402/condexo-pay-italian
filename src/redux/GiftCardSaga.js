import { put, call, select } from 'redux-saga/effects';
import GiftCardActions, { GiftCardSelectors } from './GiftCardRedux';
import isEmpty from 'lodash/isEmpty';
import AuthActions, { AuthSelectors } from './AuthRedux';

const getErrorMessage = (response) =>
  !isEmpty(response.data) && !isEmpty(response.data.errors)
    ? response.data.errors.message
    : 'Something went wrong.';

export function* getGiftCardList(api, { searchQuery }) {
  console.log(searchQuery);
  const response = yield call(api.giftCardList, searchQuery);
  switch (response.status) {
    case 200:
      yield put(GiftCardActions.getGiftCardListSuccess(response.data));
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
  const { phoneNumber: mobile, _id: userId, stripeCustomerId } = yield select(
    AuthSelectors.selectCurrentUser
  );
  console.log('--- INSIDE SAGA', mobile, userId);

  // select giftcaredrequestobj
  // todo: fetch amount
  // todo: fetch email
  // todo: fetch desc
  const { email, amount, desc, amazonId } = yield select(
    GiftCardSelectors.selectTopUpGiftCardRequestObj
  );

  const { supplier } = yield select(GiftCardSelectors.selectActiveGiftCard);

  const { productType: type, product: productName, eanNo } = yield select(
    GiftCardSelectors.selectActiveProduct
  );
  console.log({
    mobile,
    userId,
    email,
    amount,
    desc,
    supplier,
    type,
    productName,
    eanNo,
    stripeCustomerId,
  });

  // select issue and development
  console.log(data);
  const response = yield call(api.topUpGiftCard, {
    mobile,
    userId,
    email,
    amount,
    desc,
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
