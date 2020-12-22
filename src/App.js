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
import MyPayments from './containers/myPayments';
import RechargeAndGiftCards from './containers/rechargeAndGiftCards';
import GiftCard from './containers/giftCard';
import GiftCardPurchase from './containers/giftCardPurchase';
import AccountClosed from './components/AccountClosed';
// import PrivacyPolicy from './containers/docs/PrivacyPolicy';
// import Terms from './containers/docs/Terms';
import { Footer } from './containers/layout';
import PrivacyPolicy from './containers/privacyPolicy';
import Terms from './containers/termsAndConditions';
import { Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import history from './utils/history';

import { connect } from 'react-redux';
import { AuthSelectors } from './redux/AuthRedux';
import { setAuthHeaderSaga } from './redux/rootSaga';
import Navbar from './components/Navbar';
import DiagonalNavbar from './components/common/DiagonalNavbar';
import { UISelectors } from './redux/UIRedux';
import PayYourBill from './containers/payYourBill';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = rest;
  const showComponent =
    isAuthenticated ||
    rest.path === '/ricariche' ||
    rest.path.startsWith('/gift-card') ||
    rest.path.startsWith('/bollettini') ||
    rest.path.startsWith('/rata') ||
    rest.path.startsWith('/mav-rav');

  return (
    <Route
      {...rest}
      render={(props) =>
        showComponent ? (
          <Component {...props} isNewUser={!isAuthenticated} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const App = (props) => {
  const { currentUser, isNavbarVisible } = props;
  const isLoggedIn = !!currentUser && !!currentUser.token;

  // set auth header
  if (isLoggedIn) {
    setAuthHeaderSaga(currentUser.token);
  }

  // landing page refs
  const featureCard4Ref = useRef(null);
  const featureCard1Ref = useRef(null);

  const isGCLink = (link) => {
    console.log('🚀 ~ file: App.js ~ line 63 ~ isGCLink ~ link', link);
    if (
      link === '/ricariche' ||
      link.startsWith('/gift-card') ||
      link.startsWith('/bollettini') ||
      link.startsWith('/rata') ||
      link.startsWith('/mav-rav')
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="App">
      <Router history={history}>
        {isNavbarVisible && (
          <Navbar
            hideLinks={isGCLink(history.location.pathname)}
            featureCard4Ref={featureCard4Ref}
            featureCard1Ref={featureCard1Ref}
          />
        )}
        {(history.location.pathname.startsWith('/login') ||
          history.location.pathname.startsWith('/registrazione') ||
          history.location.pathname.startsWith('/condizioni') ||
          history.location.pathname.startsWith('/privacy') ||
          history.location.pathname.startsWith('/recupera_password')) && (
          <DiagonalNavbar history={history} />
        )}

        <Switch>
          <Route exact path="/privacy" component={PrivacyPolicy} />
          <Route exact path="/condizioni" component={Terms} />
          <Route exact path="/bollettini" component={PayYourBill} />
          <Route exact path="/rata" component={PayYourBill} />
          <Route exact path="/mav-rav" component={PayYourBill} />
          <PrivateRoute
            exact
            path="/profilo"
            component={MyProfile}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/miei_pagamenti"
            component={MyPayments}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/ricariche"
            component={RechargeAndGiftCards}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/gift-card/:id/:amount"
            component={GiftCardPurchase}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoute
            exact
            path="/gift-card/:id"
            component={GiftCard}
            isAuthenticated={isLoggedIn}
          />
          <Route exact path="/account-closed" component={AccountClosed} />
          {isLoggedIn && <Route render={() => <Redirect to="/dashboard" />} />}
          <Route exact path="/login" component={Login} />
          <Route exact path="/registrazione" component={Register} />
          <Route exact path="/recupera_password" component={ForgotPassword} />
          <Route
            exact
            path="/recupera_password/:username/:forgotPwdToken"
            component={ForgotPassword}
          />

          <Route
            exact
            path="/"
            render={(props) => (
              <Landing
                featureCard1Ref={featureCard1Ref}
                featureCard4Ref={featureCard4Ref}
              />
            )}
          />

          {/* <Route exact path="/fast-payment" component={FastPayment} /> */}
          {/* <Route exact path="/dashboard" component={Dashboard} /> */}
          {/* <Route exact path="/profilo" component={MyProfile} /> */}
          <Route
            render={() =>
              isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/" />
            }
          />
        </Switch>
      </Router>

      <Footer currentPath={history.location.pathname} isGuest={!isLoggedIn} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentUser: AuthSelectors.selectCurrentUser(state),
  isNavbarVisible: UISelectors.selectIsNavbarVisible(state),
});
export default connect(mapStateToProps)(App);
