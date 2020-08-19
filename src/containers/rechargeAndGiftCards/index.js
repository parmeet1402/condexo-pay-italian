import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Grid, useMediaQuery, useTheme } from '@material-ui/core';
import { GiftCardSearch } from './giftcards';

import { Page, PageContent } from '../layout';
import UIActions from '../../redux/UIRedux';
import GiftCardActions from '../../redux/GiftCardRedux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { epayAmazon, epayGiftCards, epayOperators } from '../../assets/images';
import { EpayRecharge } from './epay/EpayRecharge';
import { ViewButton } from './epay/styles';
import './style.scss';

const RechargeAndGiftCards = (props) => {
  const [screen, setScreen] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    props.showNavbar();
    props.resetBackToInitialState();
  }, []);

  const goBack = () => props.history.push('/');

  const setHomeScreen = () => setScreen(0);

  // Cards data
  const cardsData = [
    {
      title: 'Ricariche telefoniche',
      image: epayOperators,
      onClick: () => setScreen(1),
    },
    // { title: 'Gift Card', image: epayAmazon },
  ];

  const renderCards = () => (
    <Grid alignItems="center" alignContent="center" item xs={12} sm={12}>
      <Box className="epay-page-card">
        <h2>{cardsData[0].title}</h2>
        <img src={cardsData[0].image} alt="card" />
        <ViewButton
          variant="outlined"
          onClick={cardsData[0].onClick}
          extraPadding
        >
          Scegli
        </ViewButton>
      </Box>
    </Grid>
  );

  const showHomeScreen = () => (
    <Page>
      <PageContent className="epay-page">
        <div className="epay-page-content">
          <div className="epay-page-header">
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
          <Box px={isMobile ? 2 : 16} py={isMobile ? 2 : 3}>
            <Grid container spacing={isMobile ? 3 : 4}>
              {renderCards()}
            </Grid>
          </Box>
        </div>
        <GiftCardSearch setScreen={setScreen} />
      </PageContent>
    </Page>
  );

  const showComponent = () => {
    switch (screen) {
      case 1:
        return <EpayRecharge goBack={setHomeScreen} history={props.history} />;
      case 0:
      default:
        return showHomeScreen();
    }
  };

  return showComponent();
};

RechargeAndGiftCards.propTypes = {
  showNavbar: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

const mapDispatchToProps = (dispatch) => ({
  showNavbar: () => dispatch(UIActions.showNavbar()),
  resetBackToInitialState: () =>
    dispatch(GiftCardActions.resetBackToInitialState()),
});

export default connect(null, mapDispatchToProps)(RechargeAndGiftCards);
