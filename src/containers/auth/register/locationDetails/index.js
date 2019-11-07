import React, { useState, useEffect } from 'react';
import LocationDetailsForm from './form';
import { Formik } from 'formik';
import validationSchema from './schema';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors
} from '../../../../redux/RegisterRedux';

import './style.scss';

const LocationDetails = props => {
  const { formData, setActiveStep } = props;
  const [isAccepted, setIsAccepted] = useState(false);
  const [showTooltip, setTooltipVisibility] = useState(false);
  const values = {
    address: formData.address || '',
    city: formData.city || '',
    district: formData.district || '',
    postalCode: formData.postalCode || ''
  };

  /*   useEffect(() => {
    if (!!props.formData.address && isAccepted)
      props.completeRegistrationRequest();
  }); */

  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      setSubmitting(false);
      if (isAccepted) {
        props.setFormData(values);
        if (!!formData.address) {
          props.completeRegistrationRequest();
          props.setActiveStep(3);
        }
      } else {
        setTooltipVisibility(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      render={props => (
        <LocationDetailsForm
          {...props}
          isAccepted={isAccepted}
          setIsAccepted={setIsAccepted}
          showTooltip={showTooltip}
          setTooltipVisibility={setTooltipVisibility}
          setActiveStep={setActiveStep}
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

const mapStateToProps = state => ({
  formData: RegisterSelectors.selectFormData(state),
  loading: RegisterSelectors.selectIsLoading(state)
});

const mapDispatchToProps = dispatch => ({
  setFormData: formData => dispatch(RegisterActions.setFormData(formData)),
  completeRegistrationRequest: () =>
    dispatch(RegisterActions.completeRegistrationRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetails);
