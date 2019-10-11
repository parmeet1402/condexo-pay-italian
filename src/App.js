import React, { Fragment } from 'react';
import Logo from './components/Logo';
import Button from './components/common/Button';
/* Material Theme */
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/muiTheme';

import Login from './containers/auth/login';
import ForgotPassword from './containers/auth/forgotPassword';
import Register from './containers/auth/register';
// import Dashboard from './containers/dashboard';
import { Footer } from './containers/layout';

import configureStore from './redux/store';
import { Provider } from 'react-redux';

import { Router } from 'react-router-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import history from './utils/history';

const store = configureStore();
/* const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = rest;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}; */

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <div className="App">
            <h1>Sadf</h1>
            <Router history={history}>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPassword}
                />
                <Route exact path="/register" component={Register} />
                {/* 
                  <PrivateRoute
                    exact
                    path="/"
                    component={Dashboard}
                    isAuthenticated={!!isLoggedIn}/>
              */}
                <Route render={() => <Redirect to="/login" />} />
              </Switch>
            </Router>
            <Footer />
          </div>
        </Fragment>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
