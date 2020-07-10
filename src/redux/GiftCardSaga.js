import { put, call, select } from 'redux-saga/effects';
import GiftCardActions, { GiftCardSelectors } from './GiftCardRedux';
import isEmpty from 'lodash/isEmpty';
import AuthActions, { AuthSelectors } from './AuthRedux';

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
        GiftCardActions.getGiftCardListFailed(response.data.errors.message)
      );
  }
}
