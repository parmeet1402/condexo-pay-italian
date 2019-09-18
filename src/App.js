<<<<<<< HEAD
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
=======
import React from "react";

// router
import { Router, Route, Switch, Redirect } from "react-router-dom";
import history from "./utils/history";
// redux
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

// containers
import Login from "./containers/Login";
import Home from "./containers/Home";
import CompanyOverview from "./containers/CompanyOverview";

// Private Route
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <div className="App">
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/:company" component={CompanyOverview} />
              <Route render={() => <Redirect to="/" />} />
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
>>>>>>> 2c5bd9dd967e42d195111e243b4c944344c08b8f
  );
}

export default App;
