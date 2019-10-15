import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthActions, { AuthSelectors } from '../../../redux/AuthRedux';
import { Page, PageContent } from '../../layout';
import { Logo } from '../../../components/Logo';
import { Loader } from '../../../components/Loader';
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
    this.state = {};
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.currentUser) {
      if (Object.keys(nextProps.currentUser).length > 0 && !nextProps.error) {
        console.log('SUCCESS');
      }
    }
    return null;
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
          <div>
            <div className="login-content__container">
              <Logo />
              <div className="login-form__container">
                {this.props.isLoading && <Loader />}
                <Formik
                  render={props => <LoginForm {...props} />}
                  initialValues={this.initialValues}
                  validationSchema={validationSchema}
                  validateOnChange={false}
                  validateOnBlur={true}
                  onSubmit={(values, actions) =>
                    this.handleSubmit(values, actions, error)
                  }
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

const mapStateToProps = state => ({
  isLoading: AuthSelectors.selectIsLoading(state),
  error: AuthSelectors.selectError(state),
  currentUser: AuthSelectors.selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
  loginRequest: (username, password) =>
    dispatch(AuthActions.loginRequest(username, password))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
