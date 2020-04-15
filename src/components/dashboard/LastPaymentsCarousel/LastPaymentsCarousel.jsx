import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ItemsCarousel from 'react-items-carousel';
import { faEuroSign, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery, useTheme } from '@material-ui/core';

import './LastPaymentsCarousel.scss';

const LastPaymentsCarousel = ({ lastPaymentsData }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const findTypeOfServiceColor = typeOfService => {
    switch (typeOfService.toLowerCase()) {
      case 'bollettino':
        return '#e9d086';
      case 'mav':
        return '#e99e86';
      case 'ricarica telefonica':
        return '#b8e986';
      default:
    }
  };

  const getChevronWidth = () => (isSmallMobile ? 40 : isMobile ? 60 : 100);

  const getNumberOfCards = () => (isSmallMobile ? 1 : isMobile ? 2 : 3);

  const renderLastPaymentCards = () =>
    lastPaymentsData.map(
      ({ title, typeOfService, date, amount, beneficiary }, index) => {
        const typeOfServiceColor = findTypeOfServiceColor(typeOfService);
        return (
          <div className="last-payment-card" key={index}>
            <h6 className="last-payment-card--title">{title}</h6>
            <div className="last-payment-card--date-and-amount__container">
              <h6 className="last-payment-card--date">{date}</h6>
              <div>
                <h6 className="last-payment-card--amount">{amount}&nbsp;</h6>
                <FontAwesomeIcon
                  className="my-payment-card--icon"
                  icon={faEuroSign}
                />
              </div>
            </div>
            <h6 className="last-payment-card--beneficiary__heading">
              Beneficiario:
            </h6>
            <h6 className="last-payment-card--beneficiary__content">
              {beneficiary}
            </h6>
            <FontAwesomeIcon
              className="last-payment-card--right-arrow"
              icon={faArrowRight}
            />
            <h6
              style={{ backgroundColor: typeOfServiceColor }}
              className="last-payment-card--type-of-service"
            >
              {typeOfService}
            </h6>
          </div>
        );
      }
    );

  return (
    <div
      style={{
        padding: `0 ${getChevronWidth()}px`,
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={getNumberOfCards()}
        gutter={20}
        leftChevron={
          <span className="last-payment-carousel--arrows">{'<'}</span>
        }
        rightChevron={
          <span className="last-payment-carousel--arrows">{'>'}</span>
        }
        outsideChevron
        chevronWidth={getChevronWidth()}
      >
        {renderLastPaymentCards()}
      </ItemsCarousel>
    </div>
  );
};

LastPaymentsCarousel.propTypes = {
  lastPaymentsData: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      typeOfService: PropTypes.oneOf([
        'Bollettino',
        'Ricarica telefonica',
        'MAV'
      ]),
      date: PropTypes.string,
      amount: PropTypes.string,
      beneficiary: PropTypes.string
    })
  )
};

export default LastPaymentsCarousel;
