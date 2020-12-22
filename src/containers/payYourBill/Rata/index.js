import React from 'react';
import history from '../../../utils/history';
import icons from '../../../assets/icons';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './style.scss';

const BlueButton = withStyles({
  root: {
    color: '#1a315b',
    backgroundColor: '#fff',
    border: '0',
    borderColor: '#fff',
    borderRadius: 0,
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#1a315b',
      borderColor: '#fff',
      boxShadow: 'none',
      color: '#fff',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1a315b',
      borderColor: '#fff',
    },
    '&:focus': {},
  },
})(Button);

const RataCard = ({ data: { variant, iconName, title }, setActiveVariant }) => {
  const handleClick = () => {
    console.log(`variant ---- ${variant}`);
    console.log('SET ACTIVE VARIANT FIRE');
    setActiveVariant(`rata__${variant}`);
    history.push(`/${variant}`);
  };
  return (
    <div
      className="rata-card"
      onClick={window.innerWidth > 600 ? null : handleClick}
    >
      <h3>{title}</h3>
      <div className="rata-card__icon-container">
        <img src={icons[iconName]} alt="" />
      </div>
      <BlueButton
        className="rata-card__button"
        onClick={handleClick}
        type="submit"
        // color="primary"
        size="small"
        style={{
          padding: '12px 10px',
          borderRadius: 0,
          margin: '17px auto',
          // color: '#1a315b',
          border: '1px solid #1a315b',
          width: '120px',
        }}
      >
        Procedi
      </BlueButton>
    </div>
  );
};

const Rata = ({
  activeVariant,
  setActiveVariant,
  activeStep,
  setActiveStep,
  // rataState,
  // setRataState,
}) => {
  return (
    <div className={`pay-your-bill__content ${activeVariant}`}>
      <RataCard
        data={{
          variant: 'bollettini',
          iconName: 'bollettini',
          title: 'Bollettino ',
        }}
        setActiveVariant={setActiveVariant}
      />
      <RataCard
        data={{
          variant: 'mav-rav',
          iconName: 'mavRav',
          title: 'MAV/RAV',
        }}
        setActiveVariant={setActiveVariant}
      />
    </div>
  );
};

export default Rata;
