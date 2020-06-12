import React, { useEffect } from 'react';
import { Logo } from '../Logo';
import { Page, PageContent } from '../../containers/layout';
import { connect } from 'react-redux';
import UIActions from '../../redux/UIRedux';
import './AccountClosed.scss';
const AccountClosed = (props) => {
  useEffect(() => {
    props.hideNavbar();
  }, []);
  return (
    <Page className="account-closed__container">
      <div className="account-closed__card">
        <Logo isDark />
        <p>Il tuo account è stato chiuso correttamente.</p>
      </div>
    </Page>
  );
};

const mapDispatchToProps = (dispatch) => ({
  hideNavbar: () => dispatch(UIActions.hideNavbar()),
});

export default connect(null, mapDispatchToProps)(AccountClosed);
