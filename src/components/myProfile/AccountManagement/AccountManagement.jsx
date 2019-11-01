import React, { useState } from 'react';
import Button from '../../common/Button';
import { FeedbackModal } from '../../modals';
import './AccountManagement.scss';
const AccountManagement = () => {
  const [isFeedbackModalVisible, setFeedbackModalVisibility] = useState(true);

  return (
    <div className="account-management">
      <div className="account-management--header">
        <h2>Gestione account</h2>
      </div>
      <div className="account-management--content">
        <span>Vorrei chiudere il mio account</span>
        <Button
          onClick={() => setFeedbackModalVisibility(true)}
          borderColor="#1a315b"
          variant="outlined"
          style={{ width: '97px' }}
        >
          <span style={{ color: '#1a315b', fontWeight: '500' }}>Chiudi</span>
        </Button>
      </div>
      <FeedbackModal
        isFeedbackModalVisible={isFeedbackModalVisible}
        setFeedbackModalVisibility={setFeedbackModalVisibility}
      />
    </div>
  );
};

export default AccountManagement;
