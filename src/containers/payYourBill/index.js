import React, { useState, useEffect } from 'react';
import UIActions from '../../redux/UIRedux';
import { AuthSelectors } from '../../redux/AuthRedux';
import PayYourBillActions, {
  PayYourBillSelectors,
} from '../../redux/PayYourBillRedux';
import MyProfileActions, {
  MyProfileSelectors,
} from '../../redux/MyProfileRedux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { Page, PageContent } from '../layout';
// import history from '../../utils/history';
import { ProgressBar } from '../../components/ProgressBar';

import Header from './Header.jsx';
import Bollettino from './Bollettino';
import MavRav from './MavRav';
import Rata from './Rata';
import ScanCode from './ScanCode';
import FlashMessage from '../../components/common/FlashMessage';

import './PayYourBill.scss';

const PayYourBill = ({
  showNavbar,
  history,
  user,
  reserveBillRequest,
  getProfileDetailsRequest,
  setBollettinoKey,
  setMavRavKey,
  myProfile,
  activeVariant,
  setActiveVariant,
  clearMessages,
  errorMessage,
  successMessage,
  resetState,
}) => {
  // const [activeVariant, setActiveVariant] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [showScanCode, setShowScanCode] = useState(false);

  // Alert
  const [alert, setAlert] = useState({ show: false, variant: '', error: '' });
  const [isRun, setIsRun] = useState(false);

  const setAndHideAlert = (message, hasErrors) => {
    setAlert({
      ...alert,
      show: true,
      variant: hasErrors ? 'danger' : 'success',
      error: message,
    });
    hideAlert();
  };
  const hideAlert = () => {
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 5000);
  };

  useEffect(() => {
    if (!isRun) {
      setIsRun(true);
      return;
    }
    if (errorMessage) {
      setAndHideAlert(errorMessage, true);
    }
  }, [errorMessage, isRun, setAndHideAlert]);

  /*   useEffect(() => {
    // console.log(history);
    console.log('histroy updated', history);
    if (history) {
      setActiveVariant(history.location.pathname.substring(1));
    } 
  }, [history]);*/
  useEffect(() => {
    showNavbar();
  }, [showNavbar]);

  useEffect(() => {
    if (history) {
      console.log(
        '🚀 ~ file: index.js ~ line 38 ~ useEffect ~ history',
        history.location
      );
    }
    if (history && history.location && history.location.pathname) {
      console.log('SET ACTIVE VARIANT FROM ROOT FIRED');
      setActiveVariant(history.location.pathname.substring(1));
    }
  }, []);

  const exitFlow = () => {
    history.push('/dashboard');
  };

  useEffect(() => {
    console.log('MOUNTED!');
    console.log(user);

    if (user && user._id && !isEmpty(myProfile)) {
      if (activeVariant === 'mav-rav' || activeVariant === 'rata__mav-rav') {
        setMavRavKey('stepTwo', 'name', myProfile.name);
        setMavRavKey('stepTwo', 'surname', myProfile.surname);
        setMavRavKey('stepTwo', 'mobileNo', myProfile.phoneNumber);
        setMavRavKey('stepTwo', 'email', myProfile.email);
      }
      if (
        activeVariant === 'bollettini' ||
        activeVariant === 'rata__bollettini'
      ) {
        setBollettinoKey('stepTwo', 'name', myProfile.name);
        setBollettinoKey('stepTwo', 'surname', myProfile.surname);
        setBollettinoKey('stepTwo', 'email', myProfile.email);
        setBollettinoKey('stepTwo', 'address', myProfile.address);
        setBollettinoKey('stepTwo', 'city', myProfile.city);
        setBollettinoKey('stepTwo', 'district', myProfile.district);
        setBollettinoKey('stepTwo', 'postalCode', myProfile.postalCode);
      }
    }
  }, [activeVariant, user, myProfile]);

  useEffect(() => {
    if (user && user._id) {
      getProfileDetailsRequest();
    }
  }, [user]);

  useEffect(
    () => () => {
      console.log('PAY YOUR BILL UNMOUNTING...');
      resetState();
    },
    []
  );

  const BannerForGuest = () => {
    const redirectToLogin = () => {
      history.push('/login');
    };
    return (
      <div
        style={{
          textAlign: 'center',
          background: 'white',
          padding: '24px',
          color: '#224670',
        }}
      >
        <p onClick={redirectToLogin} style={{ cursor: 'pointer' }}>
          <b style={{ fontWeight: '500' }}>Risparmia tempo! </b>
          Fai login per procedere velocemente e trovare i tuoi dati salvati al
          prossimo accesso!
        </p>
      </div>
    );
  };

  const showBanner = activeStep === 0 && !(user && user._id);
  const hideScanCode = () => {
    setShowScanCode(false);
  };

  const makeScanCodeVisible = () => {
    setShowScanCode(true);
  };
  return (
    <Page>
      <PageContent className="pay-your-bill__page">
        {showScanCode && (
          <ScanCode hideModal={hideScanCode} updateKeys={setBollettinoKey} />
        )}
        {!showScanCode && (
          <>
            <Header exitFlow={exitFlow} activeVariant={activeVariant} />
            {showBanner && BannerForGuest()}
            {activeVariant !== 'rata' && (
              <ProgressBar totalSteps={4} activeStep={activeStep} />
            )}

            {(activeVariant === 'bollettini' ||
              activeVariant === 'rata__bollettini') && (
              <Bollettino
                activeVariant={activeVariant}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                reserveBillRequest={reserveBillRequest}
                makeScanCodeVisible={makeScanCodeVisible}
              />
            )}
            {activeVariant === 'rata' && (
              <Rata
                activeVariant={activeVariant}
                setActiveVariant={setActiveVariant}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                reserveBillRequest={reserveBillRequest}
              />
            )}
            {(activeVariant === 'mav-rav' ||
              activeVariant === 'rata__mav-rav') && (
              <MavRav
                activeVariant={activeVariant}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                reserveBillRequest={reserveBillRequest}
              />
            )}
          </>
        )}
      </PageContent>

      {alert.show && (
        <FlashMessage
          message={alert.error}
          hideFlashMessage={() => {
            clearMessages();
            setAlert({ show: false, variant: '', error: '' });
          }}
          variant={alert.variant}
        />
      )}
    </Page>
  );
};

const mapStateToProps = (state) => ({
  user: AuthSelectors.selectCurrentUser(state),
  myProfile: MyProfileSelectors.selectProfile(state),
  activeVariant: PayYourBillSelectors.selectActiveVariant(state),
  errorMessage: PayYourBillSelectors.selectErrorMessage(state),
  successMessage: PayYourBillSelectors.selectSuccessMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  showNavbar: () => dispatch(UIActions.showNavbar()),
  reserveBillRequest: () => dispatch(PayYourBillActions.reserveBillRequest()),
  getProfileDetailsRequest: () =>
    dispatch(MyProfileActions.getProfileDetailsRequest()),
  setMavRavKey: (stepCount, key, value) =>
    dispatch(PayYourBillActions.setMavRavKey(stepCount, key, value)),
  setBollettinoKey: (stepCount, key, value) =>
    dispatch(PayYourBillActions.setBollettinoKey(stepCount, key, value)),
  setActiveVariant: (variant) =>
    dispatch(PayYourBillActions.setActiveVariant(variant)),
  clearMessages: () => dispatch(PayYourBillActions.clearMessages()),
  resetState: () => dispatch(PayYourBillActions.resetState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PayYourBill);
