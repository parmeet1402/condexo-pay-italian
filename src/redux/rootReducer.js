import { combineReducers } from 'redux';
import { reducer as auth } from './AuthRedux';
import { reducer as register } from './RegisterRedux';
import { reducer as forgotPassword } from './ForgotPasswordRedux';
import { reducer as myProfile } from './MyProfileRedux';
import { reducer as ui } from './UIRedux';
import { reducer as epay } from './EpayRedux';
import { reducer as myPayments } from './MyPaymentsRedux';
import { reducer as dashboard } from './DashboardRedux';
import { reducer as giftCard } from './GiftCardRedux';
const reducers = combineReducers({
  auth,
  register,
  forgotPassword,
  myProfile,
  ui,
  epay,
  myPayments,
  dashboard,
  giftCard,
});

export default reducers;
