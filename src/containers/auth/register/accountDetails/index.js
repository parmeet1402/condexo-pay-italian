import React, { useEffect } from 'react';
import AccountDetailsForm from './form';
import { Formik } from 'formik';
import validationSchema from './schema';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors
} from '../../../../redux/RegisterRedux';

import './style.scss';

const AccountDetails = props => {
  const { formData, countryCodes } = props;
  const values = {
    name: formData.name || '',
    surname: formData.surname || '',
    email: formData.email || '',
    countryCode: formData.countryCode || '+39',
    phoneNumber: formData.phoneNumber || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || ''
  };

  useEffect(() => {
    props.getCountryCodesRequest();
  }, []);

  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      setSubmitting(false);
      props.setFormData(values);
      props.setActiveStep(1);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      render={props => (
        <AccountDetailsForm {...props} countryCodes={countryCodes} />
      )}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    />
  );
};

const mapStateToProps = state => ({
  formData: RegisterSelectors.selectFormData(state),
  loading: RegisterSelectors.selectIsLoading(state),
  countryCodes: RegisterSelectors.selectCountryCodes(state)
});

const mapDispatchToProps = dispatch => ({
  setFormData: formData => dispatch(RegisterActions.setFormData(formData)),
  checkUsernameRequest: username =>
    dispatch(RegisterActions.checkUsernameRequest(username)),
  getCountryCodesRequest: () =>
    dispatch(RegisterActions.getCountryCodesRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetails);
