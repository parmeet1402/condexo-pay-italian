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
  AccountManagement,
  EditPaymentDetails,
} from '../../components/myProfile';
import { connect } from 'react-redux';
import MyProfileActions, {
  MyProfileSelectors,
} from '../../redux/MyProfileRedux';
import UIActions from '../../redux/UIRedux';
import { Loader } from '../../components/Loader';
import FlashMessage from '../../components/common/FlashMessage';
import history from '../../utils/history';

import './style.scss';
const MyProfile = (props) => {
  const [currentTabIndex, setTabIndex] = useState(0);
  const { isLoading, successMessage, errorMessage } = props;
  useEffect(() => {
    props.showNavbar();
  }, []);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (props.history.location && props.history.location.tabNo) {
      setTabIndex(props.history.location.tabNo);
    }
  }, [props.history]);
  // generate accessibility props
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  const renderCurrentContent = (currentTabIndex) => {
    switch (currentTabIndex) {
      case 0:
        return <PersonalData />;
      case 1:
        return <ChangePassword />;
      case 2:
        return <EditPaymentDetails />;
      case 3:
        return <AccountManagement />;
      default:
    }
  };
  return (
    <Page>
      <PageContent className="my-profile">
        <div>
          {isLoading && <Loader belowNavbar />}
          <div className="my-profile-content__container">
            <div className="my-profile-header">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="my-profile-header--back">
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
                  {/* <FontAwesomeIcon icon={faArrowLeft} /> */}
                  <span>Dashboard</span>
                </div>
              </Link>

              <h1>Mio Profilo</h1>
            </div>
            <Tabs
              TabIndicatorProps={{
                style: { backgroundColor: '#1a315b', height: '3px' },
              }}
              value={currentTabIndex}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="off"
            >
              <Tab label="Dati personali" {...a11yProps(0)} />
              <Tab label="Cambia password" {...a11yProps(1)} />
              <Tab label="Metodi di pagamento" {...a11yProps(2)} />
              <Tab label="Gestione account" {...a11yProps(3)} />
            </Tabs>
            <div className="my-profile-tab-content">
              {renderCurrentContent(currentTabIndex)}
            </div>
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

const mapStateToProps = (state) => ({
  isLoading: MyProfileSelectors.selectIsLoading(state),
  errorMessage: MyProfileSelectors.selectErrorMessage(state),
  successMessage: MyProfileSelectors.selectSuccessMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  clearMyProfileMessages: () =>
    dispatch(MyProfileActions.clearMyProfileMessages()),
  showNavbar: () => dispatch(UIActions.showNavbar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
