import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import ForgotPasswordActions, {
  ForgotPasswordSelectors,
} from '../../../../redux/reducers/ForgotPasswordRedux';
import ResetNewPasswordForm from './form';
import validationSchema from './schema';
import FlashMessage from '../../../../components/common/FlashMessage';
import { Redirect } from 'react-router-dom';

const PasswordRecovery = (props) => {
  const values = {
    password: '',
    confirmPassword: '',
  };
  const { forgotPwdToken, username } = props.match.params;
  useEffect(() => {
    console.log(forgotPwdToken, username);
    props.verifyTokenRequest(username, forgotPwdToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forgotPwdToken, username]);
  useEffect(() => {
    if (Boolean(props.isUpdated)) props.setActiveStep(3);
  }, [props]);

  const { setActiveStep } = props;
  /* const forgotPwdToken = props.match.params.token; */
  const handleSubmit = (values, actions) => {
    const { password, confirmPassword } = values;
    const { setSubmitting } = actions;
    setSubmitting(true);
    props.updatePasswordRequest(password, confirmPassword, forgotPwdToken);
    setSubmitting(false);
  };
  return !props.isTokenValid ? (
    <Redirect to="/login" />
  ) : (
    <>
      <Formik
        render={(props) => (
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

const mapStateToProps = (state) => ({
  successMessage: ForgotPasswordSelectors.selectSuccessMessage(state),
  errorMessage: ForgotPasswordSelectors.selectErrorMessage(state),
  isUpdated: ForgotPasswordSelectors.selectIsUpdated(state),
  isTokenValid: ForgotPasswordSelectors.selectIsTokenValid(state),
});
const mapDispatchToProps = (dispatch) => ({
  updatePasswordRequest: (password, confirmPassword, forgotPwdToken) =>
    dispatch(
      ForgotPasswordActions.updatePasswordRequest(
        password,
        confirmPassword,
        forgotPwdToken
      )
    ),
  verifyTokenRequest: (forgotPwdToken, username) =>
    dispatch(
      ForgotPasswordActions.verifyTokenRequest(forgotPwdToken, username)
    ),
  clearMessages: () => dispatch(ForgotPasswordActions.clearMessages()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery);
