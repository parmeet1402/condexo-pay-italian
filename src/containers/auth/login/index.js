import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AuthActions, { AuthSelectors } from '../../../redux/AuthRedux';
import { MyProfileSelectors } from '../../../redux/MyProfileRedux';
import UIActions from '../../../redux/UIRedux';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';
import { Loader } from '../../../components/Loader';
import { Formik } from 'formik';
import validationSchema from './schema';
import LoginForm from './form';
import { loginSidebar } from '../../../assets/images';
import history from '../../../utils/history';

import './style.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      username: props.isRedirectToPaymentsRequested
        ? props.emailUsedForPurchasing
        : '',
      password: '',
    };
    this.state = {};
  }

  componentDidMount() {
    this.props.hideNavbar();
    window.scrollTo(0, 0);
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    /* if (nextProps.currentUser) {
      if (Object.keys(nextProps.currentUser).length > 0 && !nextProps.error) {
        console.log('SUCCESS');
      }
    }
    return null; */
    if (nextProps.currentUser && nextProps.currentUser.token) history.push('/');

    return {};
  }

  handleSubmit = async (values, actions, error) => {
    const { setSubmitting, setErrors } = actions;
    setSubmitting(true);
    const { username, password } = values;
    await this.props.loginRequest(username, password);
    setSubmitting(false);
  };
  render() {
    const { error } = this.props;
    return (
      <Page>
        <PageContent className="login">
          {this.props.isLoading && <Loader />}

          <Formik
            render={(props) => <LoginForm {...props} />}
            initialValues={this.initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={true}
            onSubmit={(values, actions) =>
              this.handleSubmit(values, actions, error)
            }
          />

          <div className="login-sidebar">
            <h2 className="login-sidebar__text">
              Con CONDEXO PAY potrai pagare tutte le bollette comodamente da
              casa!
            </h2>
            <img
              src={loginSidebar}
              className="login-sidebar__img"
              alt="login-sidebar"
            />
          </div>
        </PageContent>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: AuthSelectors.selectIsLoading(state),
  error: AuthSelectors.selectError(state),
  currentUser: AuthSelectors.selectCurrentUser(state),
  isRedirectToPaymentsRequested: MyProfileSelectors.selectIsRedirectToPaymentsRequested(
    state
  ),
  emailUsedForPurchasing: MyProfileSelectors.selectEmailUsedForPurchasing(
    state
  ),
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (username, password) =>
    dispatch(AuthActions.loginRequest(username, password)),
  hideNavbar: () => dispatch(UIActions.hideNavbar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
