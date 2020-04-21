import React, { useEffect } from 'react';
import { Grid, Box, useMediaQuery, useTheme } from '@material-ui/core';
import { connect } from 'react-redux';

import { Page, PageContent } from '../layout';
import {
  ServiceCard,
  MyPaymentCard,
  LastPaymentsCarousel
} from '../../components/dashboard';
import UIActions from '../../redux/UIRedux';
import images from '../../assets/icons';
import { dashboardCard, dashboardEuro } from '../../assets/images';
import './Dashboard.scss';

const Dashboard = props => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    props.showNavbar();
  }, []);
  // --- service cards ---
  const serviceCardData = [
    {
      title: 'Bollettini',
      icon: images.bollettini,
      onClick: () => navigateTo('/')
    },
    {
      title: 'Rate',
      icon: images.rate,
      onClick: () => navigateTo('/')
    },
    {
      title: 'Mav / Rav',
      icon: images.mavRav,
      onClick: () => navigateTo('/')
    },
    {
      title: 'Vantaggi Epay',
      icon: images.epay,
      onClick: () => navigateTo('/epay')
    }
  ];

  const showServiceCards = () =>
    serviceCardData.map(props => (
      <Grid item xs={6} md={3} key={props.title}>
        <ServiceCard {...props} />
      </Grid>
    ));

  // --- my payment card ---
  const myPaymentCardData = [
    {
      title: 'I miei pagamenti',
      icon: dashboardEuro,
      onClick: () => navigateTo('/my-payments')
    },
    {
      title: 'Strumenti di pagamento',
      icon: dashboardCard,
      onClick: () => navigateTo('/')
    }
  ];

  const showMyPaymentCards = () =>
    myPaymentCardData.map(props => (
      <Grid item xs={12} md={6} key={props.title}>
        <MyPaymentCard {...props} />
      </Grid>
    ));

  // --- last payments ---
  const lastPaymentsData = [
    {
      title: 'Rata condiminio ',
      typeOfService: 'Bollettino',
      date: '22/10/2019',
      amount: '200,00',
      beneficiary: 'Condominio via Tasso 22/b 00000 ROMA'
    },
    {
      title: 'Super condominio ',
      typeOfService: 'MAV',
      date: '30/11/2019',
      amount: '750,89',
      beneficiary: 'Condominio via De Santis 22/b 00000 ROMA'
    },
    {
      title: 'Ricarica TIM ',
      typeOfService: 'Ricarica telefonica',
      date: '30/11/2019',
      amount: '20,00',
      beneficiary: 'Marzia Guerrazzi'
    },
    {
      title: 'Ricarica TIM ',
      typeOfService: 'Ricarica telefonica',
      date: '30/11/2019',
      amount: '20,00',
      beneficiary: 'Marzia Guerrazzi'
    }
  ];

  const navigateTo = url => {
    props.history.push(url);
  };

  return (
    <Page>
      <PageContent className="dashboard-page">
        <div>
          <div className="dashboard-content__container">
            <div className="dashboard-page-content">
              <h1>Dashboard</h1>
              <Box m={isMobile ? 2 : 8}>
                <Grid container spacing={3}>
                  {showServiceCards()}
                </Grid>
              </Box>
              <Box mx={isMobile ? 2 : 16} mt={isMobile ? 4 : 0}>
                <Grid container spacing={3}>
                  {showMyPaymentCards()}
                </Grid>
              </Box>
              <div className="dashboard-page-last-payments">
                <h2>Ultimi pagamenti</h2>
                <LastPaymentsCarousel lastPaymentsData={lastPaymentsData} />
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  );
};
const mapDispatchToProps = dispatch => ({
  showNavbar: () => dispatch(UIActions.showNavbar())
});
export default connect(
  null,
  mapDispatchToProps
)(Dashboard);
