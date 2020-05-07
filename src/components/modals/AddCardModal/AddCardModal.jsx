import React from 'react';
import Modal from '@material-ui/core/Modal';
import { Elements } from 'react-stripe-elements';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import TextInput from '../../common/form/TextInput';
import Button from '../../common/Button';
import icons from '../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import PaymentDetailsForm from './form';
import validationSchema from './schema';
import './AddCardModal.scss';
const BlueButton = withStyles({
  root: {
    color: '#1a315b',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#1a315b',
    borderRadius: 0,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
      boxShadow: 'none',
      color: 'white',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
    },
    '&:focus': {},
  },
})(Button);
const AddCardModal = ({ isOpen, hideModal, addProfileCardRequest }) => {
  const values = {
    name: '',
  };
  return (
    <Modal
      aria-labelledby="add-card-modal"
      aria-describedby="Add card"
      open={isOpen}
      onClose={() => {
        // setData({});
        hideModal();
      }}
      disableBackdropClick={true}
      className="add-card-modal__container"
    >
      <Elements>
        <>
          <Formik
            render={(props) => (
              <PaymentDetailsForm
                {...props}
                hideModal={hideModal}
                addProfileCardRequest={addProfileCardRequest}
              />
            )}
            /* onSubmit={handleSubmit} */
            initialValues={values}
            validationSchema={validationSchema}
            //   validateOnChange={false}
            //   validateOnBlur={true}
            onSubmit={(values, actions) => {}}
            /* onSubmit={(values, actions) => handleSubmit(values, actions)} */
          />
        </>
      </Elements>
    </Modal>
  );
};

export default AddCardModal;
