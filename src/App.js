import React, { Fragment } from 'react';
import Logo from './components/Logo';
import Button from './components/common/Button';
/* Material Theme */
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/muiTheme';

import Login from './containers/auth/login';
import { Footer } from './containers/layout';
//import ForgotPassword from './containers/auth/forgotPassword';
import Register from './containers/auth/register';
import configureStore from './redux/store';
import { Provider } from 'react-redux';

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Fragment>
          <div className="App">
            <Register />
            <Footer />
          </div>
        </Fragment>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
