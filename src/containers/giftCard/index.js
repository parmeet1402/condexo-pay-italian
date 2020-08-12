import React, { useState, useEffect } from 'react';
import GiftCardProductListing from './productListing';
import GiftCardActions, { GiftCardSelectors } from '../../redux/GiftCardRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import UIActions from '../../redux/UIRedux';
import { Page, PageContent } from '../layout';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { Loader } from '../../components/Loader';
import './style.scss';

const GiftCard = ({ showNavbar, isLoading }) => {
  const [screen, setScreen] = useState(1);

  useEffect(() => {
    showNavbar();
  }, []);

  const renderScreen = (screen) => {
    switch (screen) {
      case 1:
        return <GiftCardProductListing />;
      default:
        return <span />;
    }
  };

  const goBack = () =>
    screen === 1 ? history.push('/epay') : setScreen(screen - 1);

  return (
    <Page>
      <PageContent className="gift-card-page">
        <div className="gift-card-page__header">
          <button onClick={goBack}>
            {/* <span>&larr;</span> */}
            <FontAwesomeIcon icon={faArrowLeft} />

            <span>Torna alla Dashboard</span>
          </button>
          <h1>Ricariche & Buoni</h1>
        </div>
        <div className="gift-card-page__content">
          {isLoading && <Loader belowNavbar />}
          {renderScreen(screen)}
        </div>
      </PageContent>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  // isAccountClosed: MyProfileSelectors.selectIsAccountClosed(state)
  isLoading: GiftCardSelectors.selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  showNavbar: () => dispatch(UIActions.showNavbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GiftCard);
