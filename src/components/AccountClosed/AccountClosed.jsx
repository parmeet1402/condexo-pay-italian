import React, { useEffect } from 'react';
import { Logo } from '../Logo';
import { Page, PageContent } from '../../containers/layout';
import { connect } from 'react-redux';
import UIActions from '../../redux/reducers/UIRedux';
import { withStyles } from '@material-ui/core/styles';
import Button from '../common/Button';
import history from '../../utils/history';
import './AccountClosed.scss';
const BlueButton = withStyles({
  root: {
    color: '#fff',
    backgroundColor: '#1a315b',
    border: '0',
    borderColor: '#1a315b',
    borderRadius: 0,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#fff',
      borderColor: '#1a315b',
      boxShadow: 'none',
      color: '#1a315b',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
      borderColor: '#1a315b',
    },
    '&:focus': {},
  },
})(Button);
const AccountClosed = (props) => {
  useEffect(() => {
    props.hideNavbar();
  }, []);
  const handleClick = () => {
    history.push('/');
  };
  return (
    <Page className="account-closed__container">
      <div className="account-closed__card">
        <Logo isDark />
        <p>Il tuo account è stato chiuso correttamente.</p>
        <BlueButton
          type="submit"
          // color="primary"
          size="small"
          style={{
            padding: '12px 10px',
            borderRadius: 0,
            margin: '17px auto',
            // color: '#1a315b',
            border: '1px solid #1a315b',
            width: '240px',
          }}
          onClick={handleClick}
        >
          Torna alla Home
        </BlueButton>
      </div>
    </Page>
  );
};

const mapDispatchToProps = (dispatch) => ({
  hideNavbar: () => dispatch(UIActions.hideNavbar()),
});

export default connect(null, mapDispatchToProps)(AccountClosed);
