import React, { useRef, useState, useEffect } from 'react';
import Landing from './containers/landing';
// import PrivacyPolicy from './containers/docs/PrivacyPolicy';
// import Terms from './containers/docs/Terms';
import { Footer } from './containers/layout';

import { Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import history from './utils/history';

import { connect } from 'react-redux';
import { AuthSelectors } from './redux/reducers/AuthRedux';
import { setAuthHeaderSaga } from './redux/sagas/rootSaga';
import Navbar from './components/Navbar';
import DiagonalNavbar from './components/common/DiagonalNavbar';
import UIActions, { UISelectors } from './redux/reducers/UIRedux';
import routes from './utils/routes';

const isGiftCardLink = (link) => {
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

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = rest;
  const showComponent = isAuthenticated || isGiftCardLink(rest.path);

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
  const {
    currentUser,
    isNavbarVisible,
    isNavbarLinksVisible,
    showNavbarLinks,
    hideNavbarLinks,
  } = props;
  // const [isNavbarLinksVisible, setNavbarLinksVisibility] = useState(false);

  const isLoggedIn = !!currentUser && !!currentUser.token;

  // set auth header
  if (isLoggedIn) {
    setAuthHeaderSaga(currentUser.token);
  }

  history.listen((location, action) => {
    if (isGiftCardLink(location.pathname)) {
      hideNavbarLinks();
    } else {
      showNavbarLinks();
    }
  });

  useEffect(() => {
    if (isGiftCardLink(history.location.pathname)) {
      hideNavbarLinks();
    } else {
      showNavbarLinks();
    }
    // setNavbarLinksVisibility(isGiftCardLink(history.location.pathname));
  }, []);

  // landing page refs
  const featureCard4Ref = useRef(null);
  const featureCard1Ref = useRef(null);

  const showDiagonalBar =
    history.location.pathname.startsWith('/login') ||
    history.location.pathname.startsWith('/registrazione') ||
    history.location.pathname.startsWith('/condizioni') ||
    history.location.pathname.startsWith('/privacy') ||
    history.location.pathname.startsWith('/recupera_password');

  return (
    <div className="App">
      <Router history={history}>
        {isNavbarVisible && (
          <Navbar
            hideLinks={!isNavbarLinksVisible}
            featureCard4Ref={featureCard4Ref}
            featureCard1Ref={featureCard1Ref}
          />
        )}

        {showDiagonalBar && <DiagonalNavbar history={history} />}

        <Switch>
          {routes.map((route) =>
            route.isPrivate ? (
              <PrivateRoute
                exact={route.exact}
                path={route.path}
                component={route.component}
                isAuthenticated={isLoggedIn}
              />
            ) : (
              <Route
                exact={route.exact}
                path={route.path}
                component={route.component}
              />
            )
          )}
          {isLoggedIn && <Route render={() => <Redirect to="/dashboard" />} />}
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
  isNavbarLinksVisible: UISelectors.selectIsNavbarLinksVisible(state),
});

const mapDispatchToProps = (dispatch) => ({
  hideNavbarLinks: () => dispatch(UIActions.hideNavbarLinks()),
  showNavbarLinks: () => dispatch(UIActions.showNavbarLinks()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
