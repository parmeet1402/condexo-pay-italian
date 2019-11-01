import React, { useState } from 'react';
import { Page, PageContent } from '../layout';
import Navbar from '../../components/Navbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  PersonalData,
  ChangePassword,
  AccountManagement
} from '../../components/myProfile';
import './style.scss';
const MyProfile = () => {
  const [currentTabIndex, setTabIndex] = useState(2);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };
  // generate accessibility props
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }
  const renderCurrentContent = currentTabIndex => {
    switch (currentTabIndex) {
      case 0:
        return <PersonalData />;
      case 1:
        return <ChangePassword />;
      case 2:
        return <AccountManagement />;
      default:
    }
  };
  return (
    <Page>
      <PageContent className="my-profile">
        <div>
          <Navbar />
          <div className="my-profile-content__container">
            <div className="my-profile-header">
              <div className="my-profile-header--back">
                <FontAwesomeIcon icon={faArrowLeft} />
                <span>Dashboard</span>
              </div>
              <h1>Mio Profilo</h1>
            </div>
            <Tabs
              value={currentTabIndex}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Dati personali" {...a11yProps(0)} />
              <Tab label="Cambia password" {...a11yProps(1)} />
              <Tab label="Gestione account" {...a11yProps(2)} />
            </Tabs>
            {renderCurrentContent(currentTabIndex)}
          </div>
        </div>
      </PageContent>
    </Page>
  );
};

export default MyProfile;
