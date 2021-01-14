import React, { useState, useEffect } from 'react';
import LocationDetailsForm from './form';
import { Formik } from 'formik';
import validationSchema from './schema';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors,
} from '../../../../redux/reducers/RegisterRedux';

import './style.scss';

const LocationDetails = (props) => {
  const { formData, setActiveStep, resetIsVerified } = props;
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showTermsTooltip, setTermsTooltipVisibility] = useState(false);

  const [isDataProtectionAccepted, setIsDataProtectionAccepted] = useState(
    false
  );
  const [
    showDataProtectionTooltip,
    setDataProtectionTooltipVisibility,
  ] = useState(false);

  const values = {
    address: formData.address || '',
    city: formData.city || '',
    district: formData.district || '',
    postalCode: formData.postalCode || '',
  };

  /*   useEffect(() => {
    if (!!props.formData.address && isAccepted)
      props.completeRegistrationRequest();
  }); */

  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    console.log('HANDLE SUBMIT CALLED...', { values, actions });
    console.log('HANDLE SUBMIT - isDataProtected', isDataProtectionAccepted);
    console.log('HANDLE SUBMIT - isTermsAccepted', isTermsAccepted);
    console.log('formData.address', formData.address);
    try {
      setSubmitting(false);
      if (isTermsAccepted) {
        if (isDataProtectionAccepted) {
          props.setFormData(values);
          // if (!!formData.address) {
          props.completeRegistrationRequest();
          props.setActiveStep(3);
          // }
        } else {
          setDataProtectionTooltipVisibility(true);
        }
      } else {
        setTermsTooltipVisibility(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      render={(props) => (
        <LocationDetailsForm
          {...props}
          isTermsAccepted={isTermsAccepted}
          setIsTermsAccepted={setIsTermsAccepted}
          showTermsTooltip={showTermsTooltip}
          setTermsTooltipVisibility={setTermsTooltipVisibility}
          setActiveStep={setActiveStep}
          isDataProtectionAccepted={isDataProtectionAccepted}
          setIsDataProtectionAccepted={setIsDataProtectionAccepted}
          showDataProtectionTooltip={showDataProtectionTooltip}
          setDataProtectionTooltipVisibility={
            setDataProtectionTooltipVisibility
          }
          resetIsVerified={resetIsVerified}
        />
      )}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    />
  );
};

const mapStateToProps = (state) => ({
  formData: RegisterSelectors.selectFormData(state),
  loading: RegisterSelectors.selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  setFormData: (formData) => dispatch(RegisterActions.setFormData(formData)),
  completeRegistrationRequest: () =>
    dispatch(RegisterActions.completeRegistrationRequest()),
  resetIsVerified: () => dispatch(RegisterActions.resetIsVerified()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetails);
