import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';

import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';

import { connect } from 'react-redux';
import GiftCardActions, {
  GiftCardSelectors,
} from '../../../../redux/GiftCardRedux';

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

const dummyData = [
  { id: 2, brand: 'amazon' },
  { id: 21, brand: 'sky' },
  { id: 12, brand: 'netflix' },
  { id: 222, brand: 'amazon' },
  { id: 221, brand: 'amazon' },
];

const GiftCard = ({ data }) => (
  <div className="gift-card-search__card">
    <h1>Gift Card</h1>
    <img src="https://lh3.googleusercontent.com/proxy/i4SHkD4p0a8rHemjWBbPqHd1bovOv2pOxku5FWxlJEelNYEcyBkyW3DMrt0_BvYrogEkeybAQQHH89oUF8LlguaWQjeamyICCKCSHONixs0J2qQ" />
    {/* <h2>{data.brand}</h2> */}
    <BlueButton
      size="small"
      style={{
        padding: '11px 37px',

        borderRadius: 0,
        /*        width: '271px',
       height: '39px', */
      }}
      //  onClick={fetchAllGiftCardsList}
    >
      Scegli
    </BlueButton>
  </div>
);

const renderCards = (data) => {
  return data.map((card) => <GiftCard data={card} key={card.id} />);
};

const GiftCardSearch = ({ getGiftCardListRequest }) => {
  const [showRestCards, setShowRestCards] = useState(false);

  useEffect(() => {
    getGiftCardListRequest('');
  }, []);

  const fetchAllGiftCardsList = () => {
    getGiftCardListRequest('');
  };

  return (
    <div className="gift-card-search__container">
      <div className="gift-card-search__header">
        <form
          className="gift-card-search__header__search"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextInput
            label="Cerca"
            size="normal"
            value={''}
            false
            onChange={() => console.log('search change')}
            InputProps={{
              endAdornment: <FontAwesomeIcon icon={faSearch} />,
            }}
          />
        </form>
        <div className="gift-card-search__header__all-button">
          {/* <h2>Mostra tutti</h2> */}
          <BlueButton
            type="submit"
            size="small"
            style={{
              padding: '12px 10px',
              borderRadius: 0,
              //   margin: '17px auto',
              width: '271px',
              height: '39px',
            }}
            onClick={fetchAllGiftCardsList}
          >
            Mostra tutti
          </BlueButton>
        </div>
      </div>
      <div className="gift-card-search__content">{renderCards(dummyData)}</div>
    </div>
  );
};

// getGiftCardListRequest
const mapStateToProps = (state) => ({
  // isLoading: ForgotPasswordSelectors.selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  // showNavbar: () => dispatch(UIActions.showNavbar()),
  getGiftCardListRequest: (searchQuery) =>
    dispatch(GiftCardActions.getGiftCardListRequest(searchQuery)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GiftCardSearch);
