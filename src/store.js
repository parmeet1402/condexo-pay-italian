/* REDUX CONFIG */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";

// Middleware: Redux Persist Config
const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["auth", "companies"]
    // Blacklist (Don't Save Specific Reducers)
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeSetup =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
const middleware = [thunk];
const store = createStore(
    persistedReducer,
    composeSetup(applyMiddleware(...middleware))
);

// Middleware: Redux Persist Persister
export const persistor = persistStore(store);

export default store;
