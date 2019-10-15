import React from 'react';
import AccountDetailsForm from './form';
import { Formik } from 'formik';
import validationSchema from './schema';
import { connect } from 'react-redux';
import RegisterActions, {
  RegisterSelectors
} from '../../../../redux/RegisterRedux';

import './style.scss';

const AccountDetails = props => {
  const { formData } = props;
  const values = {
    name: formData.name || '',
    username: formData.username || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || ''
  };

  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      setSubmitting(false);
      /* props.checkUsernameRequest(values.username); */
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
      render={props => <AccountDetailsForm {...props} />}
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
  checkUsernameRequest: username =>
    dispatch(RegisterActions.checkUsernameRequest(username))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountDetails);
