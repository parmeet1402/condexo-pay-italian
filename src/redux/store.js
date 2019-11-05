import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['authReducer', 'auth']
};
//const middlewares = [];
const persistedReducer = persistReducer(persistConfig, rootReducer);
const enableMiddleware = (...middlewares) => {
  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return compose(applyMiddleware(...middlewares));
};
/* const configureStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistedReducer,
    enableMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
};
export const persistor = persistStore(configureStore());
export default configureStore;
 */

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(persistedReducer, enableMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};
