import React, { Component } from 'react';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';
import { Formik } from 'formik';
import validationSchema from './schema';
import LoginForm from './form';
import { loginSidebar } from '../../../assets/images';
import './style.scss';
class Login extends Component {
  constructor(props) {
    super(props);
    this.initialValues = {
      username: '',
      password: ''
    };
  }

  handleSubmit = (values, actions) => {
    const { setSubmitting, setErrors } = actions;
    setSubmitting(true);

    const { username, password } = values;
    if (username === 'test@gmail.com' && password === 'Admin123,') {
      console.log('Successfully logged in');
    } else {
      const errors = {
        password: 'Password is wrong'
      };
      setErrors(errors);
    }
    setSubmitting(false);
  };
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
                  onSubmit={this.handleSubmit}
                />
              </div>
            </div>
            <img src={loginSidebar} alt="sidebar" />
          </div>
        </PageContent>
      </Page>
    );
  }
}

export default Login;
