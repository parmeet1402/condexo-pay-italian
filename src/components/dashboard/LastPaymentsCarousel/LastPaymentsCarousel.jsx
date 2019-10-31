import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { faEuroSign, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LastPaymentsCarousel.scss';

const LastPaymentsCarousel = props => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 100;

  const findTypeOfServiceColor = typeOfService => {
    switch (typeOfService.toLowerCase()) {
      case 'bollentino':
        return '#e9d086';
      case 'mav':
        return '#e99e86';
      case 'ricarica telefonica':
        return '#b8e986';
      default:
    }
  };
  const lastPaymentsData = [
    {
      title: 'Rata condiminio ',
      typeOfService: 'Bollentino',
      date: '22/10/2019',
      amount: '200,00',
      beneficiary: 'Condominio via Tasso 22/b 00000 ROMA'
    },
    {
      title: 'Super condominio ',
      typeOfService: 'MAV',
      date: '30/11/2019',
      amount: '750,89',
      beneficiary: 'Condominio via De Santis 22/b 00000 ROMA'
    },
    {
      title: 'Ricarica TIM ',
      typeOfService: 'Ricarica telefonica',
      date: '30/11/2019',
      amount: '20,00',
      beneficiary: 'Marzia Guerrazzi'
    },
    {
      title: 'condiminio ',
      typeOfService: 'Bollentino',
      date: '22/10/2017',
      amount: '2000,00',
      beneficiary: 'Condominio via Tasso 22/b 00000 ROMA'
    },
    {
      title: 'Super ',
      typeOfService: 'MAV',
      date: '30/12/2019',
      amount: '7500,89',
      beneficiary: 'Condominios via De Santis 22/b 00000 ROMA'
    },
    {
      title: 'Ricaricas TIM ',
      typeOfService: 'Ricarica telefonica',
      date: '30/11/2012',
      amount: '120,00',
      beneficiary: 'Mar Guerrazzi'
    }
  ];
  const renderLastPaymentCards = () =>
    lastPaymentsData.map(
      ({ title, typeOfService, date, amount, beneficiary }) => {
        const typeOfServiceColor = findTypeOfServiceColor(typeOfService);
        return (
          <div className="last-payment-card">
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
        padding: `0 ${chevronWidth}px`,
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        leftChevron={
          <span className="last-payment-carousel--arrows">{'<'}</span>
        }
        rightChevron={
          <span className="last-payment-carousel--arrows">{'>'}</span>
        }
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {renderLastPaymentCards()}
      </ItemsCarousel>
    </div>
  );
};

export default LastPaymentsCarousel;
