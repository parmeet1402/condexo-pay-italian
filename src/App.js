import React, { Fragment } from 'react';
import Logo from './components/Logo';
import Button from './components/common/Button';
/* Material Theme */
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme/muiTheme';

import Register from './containers/auth/register';
import { Footer } from './containers/layout';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <div className="App">
          <Register />
          <Footer />
        </div>
      </Fragment>
    </ThemeProvider>
  );
}

export default App;
