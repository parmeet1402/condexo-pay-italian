import React, { Fragment, useRef } from 'react';
import Logo from './components/Logo';
import Button from './components/common/Button';
/* Material Theme this is test*/

import Login from './containers/auth/login';
import ForgotPassword from './containers/auth/forgotPassword';
import Register from './containers/auth/register';
import Landing from './containers/landing';
import Dashboard from './containers/dashboard';
import MyProfile from './containers/myProfile';
import AccountClosed from './components/AccountClosed';
import { Footer } from './containers/layout';

import { Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import history from './utils/history';

import { connect } from 'react-redux';
import { AuthSelectors } from './redux/AuthRedux';
import { setAuthHeaderSaga } from './redux/rootSaga';
import Navbar from './components/Navbar';
import { UISelectors } from './redux/UIRedux';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const App = props => {
  const { currentUser, isNavbarVisible } = props;
  const isLoggedIn = !!currentUser && !!currentUser.token;

  // set auth header
  if (isLoggedIn) {
    setAuthHeaderSaga(currentUser.token);
  }

  // landing page refs
  const featureCard4Ref = useRef(null);
  const featureCard1Ref = useRef(null);

  return (
    <div className="App">
      <Router history={history}>
        {isNavbarVisible && (
          <Navbar
            featureCard4Ref={featureCard4Ref}
            featureCard1Ref={featureCard1Ref}
          />
        )}
        <Switch>
          <PrivateRoute
            exact
            path="/profile"
            component={MyProfile}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            isAuthenticated={isLoggedIn}
          />
          <Route exact path="/account-closed" component={AccountClosed} />
          {isLoggedIn && <Route render={() => <Redirect to="/dashboard" />} />}
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/forgot-password/:username/:forgotPwdToken"
            component={ForgotPassword}
          />
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                featureCard1Ref={featureCard1Ref}
                featureCard4Ref={featureCard4Ref}
              />
            )}
          />
          {/* <Route exact path="/fast-payment" component={FastPayment} /> */}
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
          {/* <Route exact path="/profile" component={MyProfile} /> */}
          <Route
            render={() =>
              isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/" />
            }
          />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};
const mapStateToProps = state => ({
  currentUser: AuthSelectors.selectCurrentUser(state),
  isNavbarVisible: UISelectors.selectIsNavbarVisible(state)
});
export default connect(mapStateToProps)(App);
