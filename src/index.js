import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StripeProvider } from 'react-stripe-elements';
import { Provider } from 'react-redux';
import store from './redux/store';
// import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/muiTheme';

ReactDOM.render(
  <StripeProvider
    apiKey={
      process.env.NODE_ENV === 'production'
        ? 'pk_live_HqVakBAKo5gmEENKKy3IdZIl00guHOBbHm'
        : 'pk_test_IZfLmixZf5X90R2kryZV21oa00h72hoBwC'
    }
  >
    <Provider store={store().store}>
      <PersistGate loading={null} persistor={store().persistor}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StripeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
