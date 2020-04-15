import { put, call, select } from 'redux-saga/effects';
import MyProfileActions from './MyProfileRedux';
import AuthActions, { AuthSelectors } from './AuthRedux';

export function* getProfileDetails(api, action) {
  const { _id } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.getProfileDetails, { userId: _id }, 10);

  switch (response.status) {
    case 200:
      yield put(MyProfileActions.getProfileDetailsSuccess(response.data.user));
      break;
    case 401:
      yield put(
        MyProfileActions.getProfileDetailsFailed(response.data.errors.message)
      );
      yield put(AuthActions.setLoggedOut());
      break;
    case 400:
    default:
      yield put(
        MyProfileActions.getProfileDetailsFailed(response.data.errors.message)
      );
  }
}

export function* updateProfileDetails(api, action) {
  const { _id } = yield select(AuthSelectors.selectCurrentUser);
  const { email, ...restData } = action.data;
  console.log(restData);
  const response = yield call(api.updateProfileDetails, {
    userId: _id,
    ...restData
  });

  switch (response.status) {
    case 200:
      yield put(
        MyProfileActions.updateProfileDetailsSuccess(response.data.message)
      );
      break;
    case 400:
    default:
      yield put(
        MyProfileActions.updateProfileDetailsFailed(
          response.data.errors.message
        )
      );
  }
}

export function* changePassword(api, action) {
  const { email } = yield select(AuthSelectors.selectCurrentUser);
  const { oldPassword, newPassword, confirmNewPassword } = action.data;
  const response = yield call(api.changePassword, {
    email,
    oldPassword,
    password: newPassword,
    confirmPassword: confirmNewPassword
  });
  switch (response.status) {
    case 200:
      yield put(MyProfileActions.changePasswordSuccess(response.data.message));
      break;
    case 401:
      yield put(
        MyProfileActions.changePasswordFailed(response.data.errors.message)
      );
      yield put(AuthActions.setLoggedOut());
      break;
    case 400:
    default:
      yield put(
        MyProfileActions.changePasswordFailed(response.data.errors.message)
      );
  }
}

export function* deleteAccount(api, action) {
  const { _id, name, surname } = yield select(AuthSelectors.selectCurrentUser);
  const { feedback } = action;
  const response = yield call(api.deleteUserAccount, {
    userId: _id,
    userName: `${name} ${surname}`,
    feedback
  });
  switch (response.status) {
    case 200:
      yield put(MyProfileActions.deleteAccountSuccess(response.data.message));
      yield call(api.removeAuthToken);
      yield put(AuthActions.setLoggedOut());
      break;
    case 401:
      yield put(
        MyProfileActions.deleteAccountFailed(response.data.errors.message)
      );
      yield put(AuthActions.setLoggedOut());
      break;
    case 400:
    default:
      yield put(MyProfileActions.deleteAccountFailed(response.data));
  }
}
