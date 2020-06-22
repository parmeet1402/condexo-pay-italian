import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../../common/form/TextInput';
import Button from '../../common/Button';
import RadioList from '../../common/form/RadioList';
import { Elements } from 'react-stripe-elements';
import { connect } from 'react-redux';
// import AddCardForm from './form';
import { AddCardModal } from '../../modals';
import MyProfileActions, {
  MyProfileSelectors,
} from '../../../redux/MyProfileRedux';
// TODO: add actions and selectors
import './EditPaymentDetails.scss';
const EditPaymentDetails = (props) => {
  const initialValues = {
    name: '',
  };

  const [isCreateCardModalVisible, setCreateCardModalVisibility] = useState(
    false
  );

  useEffect(() => {
    // TODO: add action for  fetching the cards
    props.getCardsRequest();
  }, []);

  useEffect(() => {
    if (props.successMessage === 'Carta aggiunta') {
      setCreateCardModalVisibility(false);
    }
    if (
      props.successMessage === 'Carta aggiunta' ||
      props.successMessage === 'CARD_DELETE_SUCCESS' ||
      props.successMessage === 'Carta aggiornata con successo'
    ) {
      props.getCardsRequest();
    }
  }, [props.successMessage]);

  const handleClick = (cardId, _id, e) => {
    //   props
    console.log('hadnle card');
  };
  return (
    <div className="edit-payment-details">
      {/*         <div className="edit-payment-details--header">
          <h2>Edit Payment details</h2>
          </div>
        */}
      <div
        className="edit-payment__plus__container"
        onClick={() => setCreateCardModalVisibility(true)}
      >
        <span className="edit-payment__plus">+</span>
      </div>
      <Elements>
        <div className="edit-payment-details__list-container">
          <RadioList
            cardData={props.cards || []}
            handleClick={handleClick}
            updateProfileCardStatusRequest={
              props.updateProfileCardStatusRequest
            }
            updateProfileCardDetailsRequest={
              props.updateProfileCardDetailsRequest
            }
            deleteProfileCardRequest={props.deleteProfileCardRequest}
            successMessage={props.successMessage}
          />
        </div>
      </Elements>
      {isCreateCardModalVisible && (
        <AddCardModal
          isOpen={isCreateCardModalVisible}
          hideModal={() => setCreateCardModalVisibility(false)}
          addProfileCardRequest={props.addProfileCardRequest}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cards: MyProfileSelectors.selectCards(state),
  successMessage: MyProfileSelectors.selectSuccessMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  getCardsRequest: () => dispatch(MyProfileActions.getProfileCardsRequest()),
  updateProfileCardStatusRequest: (userCardId, isActive) =>
    dispatch(
      MyProfileActions.updateProfileCardStatusRequest(userCardId, isActive)
    ),
  updateProfileCardDetailsRequest: (data) =>
    dispatch(MyProfileActions.updateProfileCardDetailsRequest(data)),
  deleteProfileCardRequest: (data) =>
    dispatch(MyProfileActions.deleteProfileCardRequest(data)),
  addProfileCardRequest: (data) =>
    dispatch(MyProfileActions.addProfileCardRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPaymentDetails);
