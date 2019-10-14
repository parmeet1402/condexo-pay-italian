import { combineReducers } from 'redux';
import { reducer as auth } from './AuthRedux';
import { reducer as register } from './RegisterRedux';
import { reducer as forgotPassword } from './ForgotPasswordRedux';
const reducers = combineReducers({
  auth,
  register,
  forgotPassword
});

export default reducers;
