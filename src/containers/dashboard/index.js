import React from 'react';
import { Page, PageContent } from '../layout';
import Navbar from '../../components/Navbar';
import './Dashboard.scss';
const Dashboard = () => {
  return (
    <Page>
      <PageContent className="dashboard-page">
        <div>
          <div className="dashboard-content__container">
            <Navbar />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default Dashboard;
