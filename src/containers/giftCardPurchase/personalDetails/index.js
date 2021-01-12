import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import PersonalDetailsForm from './form';
import validationSchema from './schema';
import GiftCardActions, {
  GiftCardSelectors,
} from '../../../redux/GiftCardRedux';
import './style.scss';
import { isEmpty } from 'lodash';

const PersonalDetails = ({
  supplier,
  activeProduct,
  appendTopUpGiftCardRequestObj,
  initialAmount,
  activeAmount,
  setActiveAmount,
  setScreen,
  topUpGiftCardRequestObj,
  isGuestUser,
  ...restProps
}) => {
  const values = {
    amount:
      activeProduct.faceValue === 0
        ? !isEmpty(topUpGiftCardRequestObj) &&
          topUpGiftCardRequestObj.amount !== 0
          ? topUpGiftCardRequestObj.amount
          : 5
        : parseFloat(initialAmount),
    email: topUpGiftCardRequestObj.email || '',
    desc: topUpGiftCardRequestObj.desc || '',
    supplier,
    amazonId: topUpGiftCardRequestObj.amazonId || '',
    isGuestUser,
  };
  console.log(activeProduct);

  const [isAccepted, setIsAccepted] = useState(false);
  const [showTooltip, setTooltipVisibility] = useState(false);

  useEffect(() => {
    if (isAccepted) {
      setTooltipVisibility(false);
    }
  }, [isAccepted]);

  const handleSubmit = async (values, actions) => {
    const { setSubmitting } = actions;
    setSubmitting(true);
    try {
      // props.setFormData(values)
      if (isAccepted) {
        console.log(values);
        appendTopUpGiftCardRequestObj(values);
        setScreen(2);
        setTooltipVisibility(false);
      } else {
        setTooltipVisibility(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      render={(props) => (
        <PersonalDetailsForm
          {...props}
          supplier={supplier}
          activeProduct={activeProduct}
          initialAmount={initialAmount}
          setActiveAmount={setActiveAmount}
          isAccepted={isAccepted}
          setIsAccepted={setIsAccepted}
          showTooltip={showTooltip}
          setTooltipVisibility={setTooltipVisibility}
        />
      )}
      initialValues={values}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    />
  );
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
