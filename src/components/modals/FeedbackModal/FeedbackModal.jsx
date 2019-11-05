import React from 'react';
import Modal from '@material-ui/core/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from '../../common/Button';
import TextInput from '../../common/form/TextInput';
import { Redirect } from 'react-router-dom';
import FilledInput from '@material-ui/core/FilledInput';
import { connect } from 'react-redux';
import MyProfileActions, {
  MyProfileSelectors
} from '../../../redux/MyProfileRedux';
import { Formik } from 'formik';

import './FeedbackModal.scss';
const FeedbackModal = props => {
  const { isFeedbackModalVisible, setFeedbackModalVisibility } = props;
  const renderForm = props => {
    const {
      values: { feedback },
      errors,
      handleChange,
      setFieldTouched
    } = props;
    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };
    return (
      <form
        className="feedback-modal"
        noValidate
        onSubmit={props.handleSubmit}
        autoComplete="off"
      >
        <div className="feedback-modal--header">
          <h2>Chiudi account</h2>
          <FontAwesomeIcon
            onClick={() => setFeedbackModalVisibility(false)}
            style={{ cursor: 'pointer' }}
            icon={faTimes}
            size="2x"
          />
        </div>
        <div className="feedback-modal--content">
          <p>
            Chiudi il tuo account CondexoPay.
            <br />
            Se desideri chiudere il tuo account, clicca su “Chiudi il mio
            account”.
          </p>
          <p>Ci piacerebbe ricevere il tuo feedback</p>
          <FilledInput
            multiline
            disableUnderline
            fullWidth
            rows={5}
            rowsMax={10}
            name="feedback"
            error={Boolean(errors.feedback)}
            value={feedback}
            onChange={change.bind(null, 'feedback')}
          />
          <div className="feedback-modal--button__container">
            <Button type="submit" size="large" fullWidth color="primary">
              Chiudi il mio account
            </Button>
          </div>
        </div>
      </form>
    );
  };
  const initialValues = {
    feedback: ''
  };
  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      props.deleteAccountRequest(values.feedback);
    } catch (err) {
      console.log(err);
    }
  };
  return !!props.isAccountClosed ? (
    <Redirect to="/account-closed" />
  ) : (
    <Modal
      aria-labelledby="feedback-modal"
      aria-describedby="Taking feedback before account deletion"
      open={isFeedbackModalVisible}
      onClose={() => setFeedbackModalVisibility(false)}
      disableBackdropClick={true}
      className="feedback-modal__container"
    >
      <Formik
        enableReinitialize={true}
        render={props => renderForm(props)}
        initialValues={initialValues}
        validateOnBlur={true}
        validateOnChange={false}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
};
const mapStateToProps = state => ({
  isAccountClosed: MyProfileSelectors.selectIsAccountClosed(state)
});
const mapDispatchToProps = dispatch => ({
  deleteAccountRequest: feedback =>
    dispatch(MyProfileActions.deleteAccountRequest(feedback))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedbackModal);
