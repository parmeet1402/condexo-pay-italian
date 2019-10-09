import { put, call } from 'redux-saga/effects';
import RegisterActions from './RegisterRedux';

export function* uploadDocument(api, action) {
  const { document } = action;
  const response = yield call(api.upload, document, 10);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(RegisterActions.uploadDocumentSuccess(response.data));
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
}
