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
    screen === 1 ? history.push('/ricariche') : setScreen(screen - 1);

  return (
    <Page>
      <PageContent className="gift-card-page">
        <div className="gift-card-page__header">
          <button onClick={goBack}>
            {/* <span>&larr;</span> */}
            {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-arrow-left"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="#0357d3"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="5" y1="12" x2="19" y2="12" />
              <line x1="5" y1="12" x2="11" y2="18" />
              <line x1="5" y1="12" x2="11" y2="6" />
            </svg>
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
