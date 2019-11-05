import React, { useState, useEffect } from 'react';
import { Page, PageContent } from '../layout';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
  PersonalData,
  ChangePassword,
  AccountManagement
} from '../../components/myProfile';
import { connect } from 'react-redux';
import MyProfileActions, {
  MyProfileSelectors
} from '../../redux/MyProfileRedux';
import UIActions from '../../redux/UIRedux';
import { Loader } from '../../components/Loader';
import FlashMessage from '../../components/common/FlashMessage';

import './style.scss';
const MyProfile = props => {
  const [currentTabIndex, setTabIndex] = useState(0);
  const { isLoading, successMessage, errorMessage } = props;
  useEffect(() => {
    props.showNavbar();
  }, []);
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
          {isLoading && <Loader />}
          <div className="my-profile-content__container">
            <div className="my-profile-header">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="my-profile-header--back">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Dashboard</span>
                </div>
              </Link>

              <h1>Mio Profilo</h1>
            </div>
            <Tabs
              TabIndicatorProps={{
                style: { backgroundColor: '#1a315b', height: '3px' }
              }}
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
        {(successMessage || errorMessage) && (
          <FlashMessage
            message={successMessage || errorMessage}
            hideFlashMessage={props.clearMyProfileMessages}
            variant={props.successMessage ? 'success' : 'warning'}
          />
        )}
      </PageContent>
    </Page>
  );
};

const mapStateToProps = state => ({
  isLoading: MyProfileSelectors.selectIsLoading(state),
  errorMessage: MyProfileSelectors.selectErrorMessage(state),
  successMessage: MyProfileSelectors.selectSuccessMessage(state)
});

const mapDispatchToProps = dispatch => ({
  clearMyProfileMessages: () =>
    dispatch(MyProfileActions.clearMyProfileMessages()),
  showNavbar: () => dispatch(UIActions.showNavbar())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);
