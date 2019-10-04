import { combineReducers } from 'redux';
import { reducer as auth } from './AuthRedux';

const reducers = combineReducers({
  auth
});

export default reducers;
