import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import ForgotPasswordActions, {
  ForgotPasswordSelectors
} from '../../../../redux/ForgotPasswordRedux';
import ResetNewPasswordForm from './form';
import validationSchema from './schema';
import FlashMessage from '../../../../components/common/FlashMessage';
const PasswordRecovery = props => {
  const values = {
    password: '',
    confirmPassword: ''
  };

  useEffect(() => {
    const { forgotPwdToken, username } = props.match.params;
    props.verifyTokenRequest(username, forgotPwdToken);
  }, []);
  useEffect(() => {
    if (Boolean(props.successMessage)) props.setActiveStep(3);
  }, [props]);

  const { setActiveStep } = props;
  const forgotPwdToken = props.match.params.token;
  const handleSubmit = (values, actions) => {
    const { password, confirmPassword } = values;
    const { setSubmitting } = actions;
    setSubmitting(true);
    props.updatePasswordRequest(password, confirmPassword, forgotPwdToken);
    setSubmitting(false);
  };
  return (
    <>
      <Formik
        render={props => (
          <ResetNewPasswordForm
            {...props}
            setActiveStep={setActiveStep}
            forgotPwdToken={forgotPwdToken}
          />
        )}
        initialValues={values}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
        onSubmit={handleSubmit}
      />
      {(props.successMessage || props.errorMessage) && (
        <FlashMessage
          message={props.successMessage || props.errorMessage}
          hideFlashMessage={props.clearMessages}
          variant={props.errorMessage.length === 0 ? 'success' : 'warning'}
        />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  successMessage: ForgotPasswordSelectors.selectSuccessMessage(state),
  errorMessage: ForgotPasswordSelectors.selectErrorMessage(state)
});
const mapDispatchToProps = dispatch => ({
  updatePasswordRequest: (password, confirmPassword, forgotPwdToken) =>
    dispatch(
      ForgotPasswordActions.updatePasswordRequest(
        password,
        confirmPassword,
        forgotPwdToken
      )
    ),
  verifyTokenRequest: (username, forgotPwdToken) =>
    dispatch(
      ForgotPasswordActions.verifyTokenRequest(username, forgotPwdToken)
    ),
  clearMessages: () => dispatch(ForgotPasswordActions.clearMessages())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordRecovery);
