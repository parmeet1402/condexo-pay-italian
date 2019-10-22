import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import ForgotPasswordForm from './form';
import validationSchema from './schema';
import api from '../../../../services/api';
import ForgotPasswordActions, {
  ForgotPasswordSelectors
} from '../../../../redux/ForgotPasswordRedux';
const PasswordRecovery = props => {
  const values = {
    email: ''
  };

  useEffect(() => {
    if (Boolean(props.successMessage)) props.setActiveStep(1);
  }, [props]);

  let countryCode;
  useEffect(() => {}, []);

  const handleSubmit = (values, actions) => {
    console.log('HANDLE SUBMIT START');
    const { email } = values;
    const { setSubmitting } = actions;
    setSubmitting(true);
    console.log('USERNAME AND FORGOT PASSWORD OTP REQUEST START');
    props.verifyUsernameAndSendForgotPasswordOtpRequest(email);
    console.log('USERNAME AND FORGOT PASSWORD OTP REQUEST END');
    setSubmitting(false);
    console.log('HANDLE SUBMIT END');
  };

  const { errorMessage } = props;

  return (
    <>
      <p className="sub-heading">
        Tieni il telefono a portata di mano, ti invieremo un codice al numero
        inserito al primo accesso
      </p>
      <Formik
        render={props => (
          <ForgotPasswordForm {...props} errorMessage={errorMessage} />
        )}
        initialValues={values}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      />
    </>
  );
};
const mapStateToProps = state => ({
  successMessage: ForgotPasswordSelectors.selectSuccessMessage(state),
  errorMessage: ForgotPasswordSelectors.selectErrorMessage(state)
});
const mapDispatchToProps = dispatch => ({
  verifyUsernameAndSendForgotPasswordOtpRequest: email =>
    dispatch(
      ForgotPasswordActions.verifyUsernameAndSendForgotPasswordOtpRequest(email)
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecovery);
