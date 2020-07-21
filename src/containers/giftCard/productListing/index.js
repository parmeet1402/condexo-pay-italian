import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import GiftCardActions, {
  GiftCardSelectors,
} from '../../../redux/GiftCardRedux';
import isEmpty from 'lodash/isEmpty';
import history from '../../../utils/history';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../../../components/common/Button';
import { getImageURL } from '../../../utils';
import './style.scss';

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
      color: '#fff',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
      color: '#fff',
    },
    '&:focus': {},
  },
})(Button);

const ProductCard = ({ data, supplier, logo, setIsRun, setActiveProduct }) => {
  const isVariable = data.faceValue === 0;
  // if (isVariable) return <></>;
  console.log(data, supplier);
  const redirectToPersonalDetails = () => {
    setIsRun(true);
    setActiveProduct(data);
    // history.push(`/gift-card/${data.supplier}`);
  };
  return (
    <div className={`product-card ${isVariable ? 'variable' : ''}`}>
      <div className="product-card__img__container">
        <img src={getImageURL(logo)} alt={supplier} />
      </div>
      <span className="product-card__name">
        {supplier.toLowerCase()} Giftcard
      </span>
      <span className="product-card__amount">
        {isVariable
          ? 'Scegli tu la cifra da 5,00 € a 500,00 €'
          : `${data.faceValue}€`}
      </span>
      <BlueButton
        size="small"
        style={{
          padding: '11px 37px',
          marginTop: '10px',
          borderRadius: 0,
          /*        width: '271px',
        height: '39px', */
        }}
        onClick={redirectToPersonalDetails}
      >
        Scegli
      </BlueButton>
    </div>
  );
};

const GiftCardProductListing = ({
  giftCardList,
  activeGiftCard,
  activeProduct,
  setActiveGiftCard,
  setActiveProduct,
}) => {
  useEffect(() => {
    // giftCardList.
  }, []);
  const [isRun, setIsRun] = useState(false);

  useEffect(() => {
    if (isEmpty(activeGiftCard)) {
      history.goBack();
    }
  }, [activeGiftCard]);

  useEffect(() => {
    if (!isRun) {
      setIsRun(true);
      return;
    }

    if (!isEmpty(activeProduct)) {
      console.log(activeProduct);
      history.push(
        `/gift-card/${activeGiftCard.supplier}/${activeProduct.faceValue}`
      );
    }
  }, [activeProduct]);
  console.log(activeGiftCard);

  const renderProductCards = () => {
    return activeGiftCard.products.map((card) => (
      <ProductCard
        data={card}
        supplier={activeGiftCard.supplier}
        logo={activeGiftCard.logo}
        setActiveProduct={setActiveProduct}
        setIsRun={setIsRun}
      />
    ));
  };
  if (!isEmpty(activeGiftCard)) {
    return (
      <div
        className={`product-card__container i${
          activeGiftCard.products.length > 4
            ? 4
            : activeGiftCard.products.length
        }`}
      >
        {renderProductCards()}
      </div>
    );
  } else {
    return <span></span>;
  }
};

const mapStateToProps = (state) => ({
  giftCardList: GiftCardSelectors.selectData(state),
  activeGiftCard: GiftCardSelectors.selectActiveGiftCard(state),
  activeProduct: GiftCardSelectors.selectActiveProduct(state),
  // isAccountClosed: MyProfileSelectors.selectIsAccountClosed(state)
});

const mapDispatchToProps = (dispatch) => ({
  setActiveGiftCard: (card) =>
    dispatch(GiftCardActions.setActiveGiftCard(card)),
  setActiveProduct: (product) =>
    dispatch(GiftCardActions.setActiveProduct(product)),
  // showNavbar: () => dispatch(UIActions.showNavbar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftCardProductListing);
