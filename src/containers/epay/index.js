import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Grid, useMediaQuery, useTheme } from '@material-ui/core';

import { Page, PageContent } from '../layout';
import UIActions from '../../redux/UIRedux';
import { epayAmazon, epayGiftCards, epayOperators } from '../../assets/images';
import { EpayRecharge } from './EpayRecharge';
import { ViewButton } from './styles';
import './Epay.scss';

const Epay = props => {
  const [screen, setScreen] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    props.showNavbar();
  }, []);

  const goBack = () => props.history.push('/');

  const setHomeScreen = () => setScreen(0);

  // Cards data
  const cardsData = [
    {
      title: 'Ricariche telefoniche',
      image: epayOperators,
      onClick: () => setScreen(1)
    },
    { title: 'Gift Card', image: epayAmazon },
    { title: 'Gift Card', image: epayGiftCards },
    { title: 'Gift Card', image: epayGiftCards }
  ];

  const renderCards = () =>
    cardsData.map((card, index) => (
      <Grid item xs={12} sm={6} key={index}>
        <Box className="epay-page-card">
          <h2>{card.title}</h2>
          <img src={card.image} alt="card" />
          <ViewButton variant="outlined" onClick={card.onClick} extraPadding>
            Scegli
          </ViewButton>
        </Box>
      </Grid>
    ));

  const showHomeScreen = () => (
    <Page>
      <PageContent className="epay-page">
        <div className="epay-page-content">
          <div className="epay-page-header">
            <button onClick={goBack}>
              <span>&larr;</span>
              <span>Torna alla Dashboard</span>
            </button>
            <h1>Vantaggi Epay</h1>
          </div>
          <Box px={isMobile ? 2 : 16} py={isMobile ? 2 : 3}>
            <Grid container spacing={isMobile ? 3 : 4}>
              {renderCards()}
            </Grid>
          </Box>
        </div>
      </PageContent>
    </Page>
  );

  const showComponent = () => {
    switch (screen) {
      case 1:
        return <EpayRecharge goBack={setHomeScreen} />;
      case 0:
      default:
        return showHomeScreen();
    }
  };

  return showComponent();
};

Epay.propTypes = {
  showNavbar: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

const mapDispatchToProps = dispatch => ({
  showNavbar: () => dispatch(UIActions.showNavbar())
});

export default connect(
  null,
  mapDispatchToProps
)(Epay);
