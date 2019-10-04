import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const enableMiddleware = (...middlewares) => {
  if (process.env.NODE_ENV === 'development') {
    return composeWithDevTools(applyMiddleware(...middlewares));
  }

  return compose(applyMiddleware(...middlewares));
};

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    enableMiddleware(sagaMiddleware)
  );
  let sagaManager = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);

      const newYieldedSagas = require('./rootSaga').default;
      sagaManager.cancel();
      sagaManager.done.then(() => {
        sagaManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return store;
};

export default configureStore;
