import React, { useEffect, useState } from 'react';
import AccountDetailsForm from './form';
import { Formik } from 'formik';
import validationSchema from './schema';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors,
  clearMessages,
} from '../../../../redux/reducers/RegisterRedux';
import { MyProfileSelectors } from '../../../../redux/reducers/MyProfileRedux';
import FlashMessage from '../../../../components/common/FlashMessage';

import './style.scss';

const AccountDetails = (props) => {
  const {
    formData,
    countryCodes,
    checkUsernameRequest,
    successMessage,
    errorMessage,
    clearMessages,
    isRedirectToPaymentsRequested,
    emailUsedForPurchasing,
  } = props;
  const values = {
    name: formData.name || '',
    surname: formData.surname || '',
    email:
      formData.email || isRedirectToPaymentsRequested
        ? emailUsedForPurchasing
        : '',
    countryCode: formData.countryCode || '+39',
    phoneNumber: formData.phoneNumber || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
  };

  useEffect(() => {
    props.getCountryCodesRequest();
  }, []);

  const [valuesCopy, setValuesCopy] = React.useState(values);

  useEffect(() => {
    if (successMessage === 'Email può essere utilizzata') {
      console.log('THIS SUCCES ONE IS RUN');
      props.setFormData(valuesCopy);
      props.setActiveStep(1);
    }
  }, [successMessage]);

  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      setSubmitting(false);
      setValuesCopy(values);
      checkUsernameRequest(values.email);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Formik
        render={(props) => (
          <AccountDetailsForm {...props} countryCodes={countryCodes} />
        )}
        initialValues={values}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      />
      {errorMessage && (
        <FlashMessage
          message={errorMessage}
          hideFlashMessage={clearMessages}
          variant={'warning'}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  formData: RegisterSelectors.selectFormData(state),
  loading: RegisterSelectors.selectIsLoading(state),
  countryCodes: RegisterSelectors.selectCountryCodes(state),
  successMessage: RegisterSelectors.selectSuccessMessage(state),
  errorMessage: RegisterSelectors.selectErrorMessage(state),
  isRedirectToPaymentsRequested: MyProfileSelectors.selectIsRedirectToPaymentsRequested(
    state
  ),
  emailUsedForPurchasing: MyProfileSelectors.selectEmailUsedForPurchasing(
    state
  ),
});

const mapDispatchToProps = (dispatch) => ({
  setFormData: (formData) => dispatch(RegisterActions.setFormData(formData)),
  checkUsernameRequest: (username) =>
    dispatch(RegisterActions.checkUsernameRequest(username)),
  getCountryCodesRequest: () =>
    dispatch(RegisterActions.getCountryCodesRequest()),
  clearMessages: () => dispatch(RegisterActions.clearMessages()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
