import { put, call, select } from 'redux-saga/effects';
import DashboardActions, { DashboardSelectors } from './DashboardRedux';
import { AuthSelectors } from './AuthRedux';

export function* getLatestPayment(api, action) {
  console.log('SAGA', action);
  const { _id: userId } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.listLatestPayments, { userId });
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(DashboardActions.getLatestPaymentSuccess(response.data));
      break;
    default:
      yield put(DashboardActions.getLatestPaymentFailed(response.data.message));
  }
}
