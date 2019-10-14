import React from 'react';
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

  const handleSubmit = (values, actions) => {
    const { username } = values;
    const { setSubmitting, setErrors } = actions;

    setSubmitting(true);
    props.sendResetPasswordLinkRequest(username);
    console.log(props.status);
    if (props.status === 'success') props.setActiveStep(1);
    else {
      const errors = {};
      // TODO: Add errors
    }
    /* if (username === 'test@gmail.com') {
      props.setActiveStep(1);
    } else {
      const errors = {
        username:
          'This email address/mobile number has not been registered with us'
      };
      setErrors(errors);
    } */
    setSubmitting(false);
  };
  return (
    <Formik
      render={props => <ForgotPasswordForm {...props} />}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={handleSubmit}
      /*   onSubmit={(values, actions) => handleSubmit(values, actions)} */
    />
  );
};
const mapStateToProps = state => ({
  status: ForgotPasswordSelectors.selectStatus(state)
});
const mapDispatchToProps = dispatch => ({
  sendResetPasswordLinkRequest: username =>
    dispatch(ForgotPasswordActions.sendResetPasswordLinkRequest(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecovery);
