import { combineReducers } from 'redux';
import { reducer as auth } from './AuthRedux';
import { reducer as register } from './RegisterRedux';

const reducers = combineReducers({
  auth,
  register
});

export default reducers;
