import { put, call, select } from 'redux-saga/effects';
import MyProfileActions, { MyProfileSelectors } from './MyProfileRedux';
import isEmpty from 'lodash/isEmpty';
import AuthActions, { AuthSelectors } from './AuthRedux';
import { func } from 'prop-types';

const getErrorMessage = (response) =>
  !isEmpty(response.data) && !isEmpty(response.data.errors)
    ? response.data.errors.message
    : 'Something went wrong.';

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
    ...restData,
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
    confirmPassword: confirmNewPassword,
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
    feedback,
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

export function* getProfileCards(api, action, ...rest) {
  console.log(action);
  const { _id: userId } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.getCards, { userId });
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(MyProfileActions.getProfileCardsSuccess(response.data));
      break;
    case 400:
    default:
      yield put(
        MyProfileActions.getProfileCardsFailed(getErrorMessage(response))
      );
  }
}

export function* updateProfileCardStatus(api, action) {
  const { cardId: userCardId, status: isActive } = action;
  const response = yield call(api.updateCardStatus, { userCardId, isActive });
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(
        MyProfileActions.updateProfileCardStatusSuccess(response.data.message)
      );
      yield put(MyProfileActions.getProfileCardsRequest());
      break;
    case 400:
    default:
      yield put(
        MyProfileActions.updateProfileCardStatusFailed(response.data.message)
      );
  }
}

export function* updateProfileCardDetails(api, action) {
  console.log('SAGA FIRED', api, action);
  const { cardId: editCardId, expiryDate, nameOnCard } = action.data;
  /* {
    editCardId,
    expiryDate,
    nameOnCard,
  } */
  const response = yield call(api.updateCard, {
    editCardId,
    expiryDate,
    nameOnCard,
  });
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(
        MyProfileActions.updateProfileCardDetailsSuccess(response.data.message)
      );
      break;
    default:
      yield put(
        MyProfileActions.updateProfileCardDetailsFailed(response.data.message)
      );
  }
}

export function* deleteProfileCard(api, action) {
  const { cardId, stripeCardId, stripeCustomerId } = action.data;
  const response = yield call(api.deleteCard, {
    cardId,
    stripeCardId,
    stripeCustomerId,
  });
  console.log(response);

  switch (response.status) {
    case 200:
      yield put(
        MyProfileActions.deleteProfileCardSuccess(response.data.message)
      );
      break;
    default:
      yield put(
        MyProfileActions.deleteProfileCardFailed(response.data.message)
      );
  }
}

export function* addProfileCard(api, action) {
  const { _id: userId, stripeCustomerId } = yield select(
    AuthSelectors.selectCurrentUser
  );

  const response = yield call(api.addCardDetails, {
    ...action.data,
    userId,
    stripeCustomerId,
  });
  console.log(response);

  switch (response.status) {
    case 200:
      yield put(MyProfileActions.addProfileCardSuccess(response.data.message));
      break;
    default:
      yield put(MyProfileActions.addProfileCardFailed(response.data.message));
  }
}
