import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import ForgotPasswordForm from './form';
import validationSchema from './schema';
import ForgotPasswordActions, {
  ForgotPasswordSelectors
} from '../../../../redux/ForgotPasswordRedux';
const PasswordRecovery = props => {
  const values = {
    username: ''
  };

  useEffect(() => {
    if (Boolean(props.successMessage)) props.setActiveStep(1);
  }, [props]);

  const handleSubmit = (values, actions) => {
    const { username } = values;
    const { setSubmitting } = actions;
    setSubmitting(true);
    props.verifyUsernameAndSendForgotPasswordOtpRequest(username);
    setSubmitting(false);
  };

  const { errorMessage } = props;

  return (
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
  );
};
const mapStateToProps = state => ({
  successMessage: ForgotPasswordSelectors.selectSuccessMessage(state),
  errorMessage: ForgotPasswordSelectors.selectErrorMessage(state)
});
const mapDispatchToProps = dispatch => ({
  verifyUsernameAndSendForgotPasswordOtpRequest: username =>
    dispatch(
      ForgotPasswordActions.verifyUsernameAndSendForgotPasswordOtpRequest(
        username
      )
    )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecovery);
