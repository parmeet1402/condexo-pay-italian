import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import Skeleton from '@material-ui/lab/Skeleton';

import TextInput from '../../../../components/common/form/TextInput';
import Button from '../../../../components/common/Button';
import { Loader } from '../../../../components/Loader';
import initialData from './data';
import { connect } from 'react-redux';
import GiftCardActions, {
  GiftCardSelectors,
} from '../../../../redux/GiftCardRedux';
import history from '../../../../utils/history';
import { IMAGE_URL } from '../../../../config';
import isEmpty from 'lodash/isEmpty';
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

const GiftCard = ({ data, setActiveGiftCard, setIsRun }) => {
  const redirectToProductPage = () => {
    setIsRun(true);
    setActiveGiftCard(data);
    // history.push(`/gift-card/${data.supplier}`);
  };
  return (
    <div className="gift-card-search__card">
      <h1>Gift Card</h1>
      <div className="gift-card-search__card__img__container">
        <img src={`${IMAGE_URL}${data.logo}`} alt="" />
      </div>
      {/* <img src="https://cdn.iconscout.com/icon/free/png-256/amazon-29-226581.png" /> */}
      {/* <h2>{data.brand}</h2> */}
      <BlueButton
        size="small"
        style={{
          padding: '11px 37px',

          borderRadius: 0,
          /*        width: '271px',
        height: '39px', */
        }}
        onClick={redirectToProductPage}
      >
        Scegli
      </BlueButton>
    </div>
  );
};

const GiftCardSearch = ({
  getGiftCardListRequest,
  giftCardList,
  setActiveGiftCard,
  activeGiftCard,
  isLoading,
}) => {
  const [isRun, setIsRun] = useState(false);

  const [showRestCards, setShowRestCards] = useState(false);
  const state = {
    default: 'DEFAULT',
    search: 'SEARCH',
    all: 'ALL',
  };

  const [currentState, setCurrentState] = useState(state.default);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getGiftCardListRequest('');
  }, []);

  useEffect(() => {
    /* if (searchQuery) {
      getGiftCardListRequest(searchQuery);
    } else {
      getGiftCardListRequest('');
    } */
    if (currentState === state.search) {
      if (searchQuery) {
        setSearchResults(search(searchQuery));
      } else {
        setCurrentState(state.all);
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!isRun) {
      setIsRun(true);
      return;
    }
    if (!isEmpty(activeGiftCard)) {
      // setScreen(11);
      history.push(`/gift-card/${activeGiftCard.supplier}`);
    }
  }, [activeGiftCard]);

  const fetchAllGiftCardsList = () => {
    // if(searchQuery)
    // getGiftCardListRequest('');
    // setShowRestCards(true);
    setCurrentState(state.all);
  };

  const renderCards = (data, currentState) => {
    if (currentState === state.search) {
      return searchResults.length > 0 ? (
        searchResults.map((card) => (
          <GiftCard
            data={card}
            key={card._id}
            setIsRun={setIsRun}
            setActiveGiftCard={setActiveGiftCard}
          />
        ))
      ) : (
        <span
          style={{
            textAlign: 'center',
            display: 'block',
            marginTop: '20px',
          }}
        >
          No Results found
        </span>
      );
    } else if (data.length) {
      if (currentState === state.default) {
        return initialData
          .slice(0, window.innerWidth <= 960 && window.innerWidth > 600 ? 2 : 3)
          .map((card) => (
            <GiftCard
              data={card}
              key={card._id}
              setIsRun={setIsRun}
              setActiveGiftCard={setActiveGiftCard}
            />
          ));
      } else {
        return data.map((card) => (
          <GiftCard
            data={card}
            key={card._id}
            setIsRun={setIsRun}
            setActiveGiftCard={setActiveGiftCard}
          />
        ));
      }
    } else {
      return Array.from({ length: 3 }, (_, k) => (
        <Skeleton
          style={{
            borderRadius: '6px',
            marginRight: '20px',
            display: 'inline-block',
          }}
          variant="rect"
          width={376}
          height={308}
          animation="wave"
        />
      ));
    }
  };

  const mergeDedupe = (arr) => {
    return [...new Set([].concat(...arr))];
  };
  const search = (searchQuery) => {
    console.log('SEARCH', searchQuery);
    if (searchQuery) {
      const searchQueryLowerCased = searchQuery.toLowerCase();
      // const copyOfData = [...giftCardList];
      if (giftCardList.length) {
        const firstSearchImproved = giftCardList.filter(({ supplier }) => {
          const valueStringForSearchArr = searchQueryLowerCased
            .trim()
            .split(' ');

          let containsWord = false;
          valueStringForSearchArr.forEach((subStrOfStringForSearch) => {
            if (
              supplier
                .toLowerCase()
                .startsWith(subStrOfStringForSearch.toLowerCase())
            ) {
              containsWord = true;
            }
          });
          return containsWord;
        });

        const secondSearchImproved = giftCardList.filter(({ supplier }) => {
          const removeDashStr = supplier.replace('-', ' ');
          const splitUpArr = removeDashStr.split(' ');
          let containsWord = false;
          const valueStringForSearchArr = searchQueryLowerCased
            .trim()
            .split(' ');
          splitUpArr.forEach((word) => {
            valueStringForSearchArr.forEach((subStrOfStringForSearch) => {
              if (word.toLowerCase().startsWith(subStrOfStringForSearch))
                containsWord = true;
            });
          });
          return containsWord;
        });

        return mergeDedupe([...firstSearchImproved, ...secondSearchImproved]);
      }
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentState(state.search);
    // setSearchResults(search(e.target.value));
    // console.log(search(e.target.value));
  };

  return (
    <div className="gift-card-search__container">
      {isLoading && <Loader belowNavbar />}
      <div className="gift-card-search__header">
        <form
          className="gift-card-search__header__search"
          onSubmit={(e) => e.preventDefault()}
        >
          <TextInput
            label="Cerca"
            size="normal"
            value={searchQuery}
            false
            onChange={handleSearchTextChange}
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
      <div
        className="gift-card-search__content"
        style={{
          overflowY:
            currentState === state.all || currentState === state.search
              ? 'visible'
              : 'hidden',
        }}
      >
        {renderCards(giftCardList, currentState)}
      </div>
    </div>
  );
};

// getGiftCardListRequest
const mapStateToProps = (state) => ({
  giftCardList: GiftCardSelectors.selectData(state),
  activeGiftCard: GiftCardSelectors.selectActiveGiftCard(state),
  isLoading: GiftCardSelectors.selectIsLoading(state),
  // isLoading: ForgotPasswordSelectors.selectIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  // showNavbar: () => dispatch(UIActions.showNavbar()),
  getGiftCardListRequest: (searchQuery) =>
    dispatch(GiftCardActions.getGiftCardListRequest(searchQuery)),
  setActiveGiftCard: (card) =>
    dispatch(GiftCardActions.setActiveGiftCard(card)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GiftCardSearch);
