import React from 'react';
import TextInput from '../../common/form/TextInput';
import Button from '../../common/Button';
import './StayInTouch.scss';
const StayInTouch = () => {
  return (
    <div className="stay-in-touch">
      <div>
        <h3>Stay in touch! Join our Newsletter</h3>
        <div className="stay-in-touch--email-input__container">
          <TextInput
            type="email"
            label="Enter Email"
            margin="normal"
            className="stay-in-touch--email-input"
            variant="filled"
          />
          <Button
            size="large"
            rounded
            color="primary"
            style={{
              marginLeft: '-170px',
              marginTop: '16px',
              padding: '13px 50px'
            }}
            className="stay-in-touch--subscribe-button"
          >
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StayInTouch;
