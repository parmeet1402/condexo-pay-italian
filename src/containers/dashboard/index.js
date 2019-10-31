import React from 'react';
import { Page, PageContent } from '../layout';
import Navbar from '../../components/Navbar';
import {
  ServiceCard,
  MyPaymentCard,
  LastPaymentsCarousel
} from '../../components/dashboard';
import images from '../../assets/icons';
import { faCreditCard, faEuroSign } from '@fortawesome/free-solid-svg-icons';

import './Dashboard.scss';
const Dashboard = () => {
  // --- service cards ---
  const serviceCardData = [
    { title: 'Bollettini', icon: images.dashboardBulletin },
    { title: 'Rate', icon: images.dashboardRate },
    { title: 'Mav / Rav', icon: images.dashboardMavRav },
    { title: 'Vantaggi Epay', icon: images.dashboardEPayBenefits }
  ];
  const showServiceCards = () => (
    <div className="dashboard-page-services">
      {serviceCardData.map(props => (
        <ServiceCard {...props} />
      ))}
    </div>
  );
  // --- my payment card ---
  const myPaymentCardData = [
    { title: 'I miei pagamenti', icon: faEuroSign },
    { title: 'Strumenti di pagamento', icon: faCreditCard }
  ];
  const showMyPaymentCards = () => (
    <div className="dashboard-page-my-payments">
      {myPaymentCardData.map(props => (
        <MyPaymentCard {...props} />
      ))}
    </div>
  );
  return (
    <Page>
      <PageContent className="dashboard-page">
        <div>
          <div className="dashboard-page-content">
            <Navbar />
            <h1>Dashboard</h1>
            {showServiceCards()}
            {showMyPaymentCards()}
            <div className="dashboard-page-last-payments">
              <h2>Ultimi pagamenti</h2>
              <LastPaymentsCarousel />
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Dashboard;
