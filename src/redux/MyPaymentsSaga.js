import { put, call, select } from 'redux-saga/effects';
import { AuthSelectors } from './AuthRedux';
import MyPaymentActions, { MyPaymentSelectors } from './MyPaymentsRedux';
// todo isempty
// todo import date fnss

Date.prototype.getUnixTime = function () {
  return (this.getTime() / 1000) | 0;
};
if (!Date.now)
  Date.now = function () {
    return new Date();
  };
Date.time = function () {
  return Date.now().getUnixTime();
};

export function* getMyPayments(api, action) {
  console.log('SAGA', action);
  const { _id: userId } = yield select(AuthSelectors.selectCurrentUser);
  const { searchQuery, fromDate, toDate } = action.data;
  const response = yield call(api.listPayments, {
    userId,
    searchQuery,
    ...(fromDate && { fromDate: new Date(fromDate).getUnixTime() }),
    ...(toDate && { toDate: new Date(toDate).getUnixTime() }),
  });

  console.log(response);
  /* _id: "5eb3d68619818823c75198b4"
paymentType: "mobileTopup"
payee: "KENA MOBILE 50 EURO"
date: "07/05/2020"
amount: 50
cardNo: "1111"
cardType: "visa" */
  switch (response.status) {
    case 200:
      yield put(MyPaymentActions.getPaymentsSuccess(response.data));
      break;
    default:
      yield put(MyPaymentActions.getPaymentsFailed(response.data.message));
  }
}
