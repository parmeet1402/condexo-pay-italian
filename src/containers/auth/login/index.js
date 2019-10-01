import React, { Component } from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';
import { Formik } from 'formik';
import validationSchema from './schema';
import LoginForm from './form';
import { WhySignUp } from '../../../components/WhySignUp';
import './style.scss';
class Login extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      username: '',
      password: ''
    };
  }
  render() {
    return (
      <Page>
        <PageContent className="login">
          <div>
            <div className="login-content__container">
              <Logo />
              <div className="login-form__container">
                <Formik
                  render={props => <LoginForm {...props} />}
                  initialValues={this.initialValues}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnBlur={true}
                />
              </div>
            </div>
            <WhySignUp />
          </div>
        </PageContent>
      </Page>
    );
  }
}

export default Login;
