import React, { useState, useEffect } from 'react';
import { List as MaterialUIList } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import images from '../../../../assets/icons';
import Switch from '@material-ui/core/Switch';
import Button from '../../Button';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { EditCardModal, DeleteConfirmModal } from '../../../modals';
import './RadioList.scss';

const OrangeSwitch = withStyles({
  root: {
    transform: 'rotate(180deg)',
  },
  switchBase: {
    color: '#000',
    '&$checked': {
      color: '#ff5f00',
    },
    '&$checked + $track': {
      backgroundColor: '#ff5f00',
    },
  },
  checked: {},
  track: {},
})(Switch);

const BlueButton = withStyles({
  root: {
    color: '#1a315b',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#1a315b',
    borderRadius: 0,
    padding: '13px 20px',
    fontWeight: 'normal',
    marginTop: '20px',

    '&:hover': {
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
      boxShadow: 'none',
      color: 'white',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#1a315b',
      borderColor: '#1a315b',
    },
    '&:focus': {},
  },
})(Button);
const CardTemplate = (props) => {
  let imageSrc = '';
  switch (props.cardType.toLowerCase()) {
    case 'mastercard':
      imageSrc = images.creditCardMaster;
      break;
    case 'visa':
      imageSrc = images.creditCardVisa;
      break;
    default:
      imageSrc = '';
  }
  return (
    <div className="exsisting-card">
      <div className="exsisting-card__content">
        <img src={imageSrc} alt={props.cardType} />
        <div>
          <h2>{props.name}</h2>
          <p>{`**** **** ***** ${props.last4CardDigits}`}</p>
          <p>Valid by {props.expiryDate}</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {window.innerWidth > 500 ? (
          <BlueButton
            disabled={!props.isActive}
            style={!props.isActive && { borderColor: '#a4abb5' }}
            onClick={() => {
              props.setEditModalVisibility(true);
              props.setDataForEditModal({
                nameOnCard: props.name,
                cardType: props.cardType,
                cardNumber: props.last4CardDigits,
                expiryDate: new Date(),
                _id: props.cardId,
              });
            }}
          >
            Modifica
          </BlueButton>
        ) : (
          <FontAwesomeIcon
            icon={faEdit}
            style={{
              color: '#1a315b',
              fontSize: '20px',
              marginBottom: '18px',
              cursor: 'pointer',
            }}
            onClick={() => {
              props.setEditModalVisibility(true);
              props.setDataForEditModal({
                nameOnCard: props.name,
                cardType: props.cardType,
                cardNumber: props.last4CardDigits,
                expiryDate: new Date(),
                _id: props.cardId,
              });
            }}
          />
        )}
        {window.innerWidth > 500 ? (
          <BlueButton
            disabled={!props.isActive}
            style={!props.isActive && { borderColor: '#a4abb5' }}
            onClick={(e) => {
              props.setDeleteModalVisibility(true);
              props.setDataForDeleteModal({
                cardId: props.cardId,
                stripeCustomerId: props.stripeCustomerId,
                stripeCardId: props.stripeCardId,
              });
            }}
          >
            Elimina
          </BlueButton>
        ) : (
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: '#1a315b', fontSize: '20px', cursor: 'pointer' }}
            onClick={(e) => {
              props.setDeleteModalVisibility(true);
              props.setDataForDeleteModal({
                cardId: props.cardId,
                stripeCustomerId: props.stripeCustomerId,
                stripeCardId: props.stripeCardId,
              });
            }}
          />
        )}
      </div>
      {/* <CloseIcon
        onClick={props.handleClick.bind(null, props.stripeCardId, props.cardId)}
      /> */}
    </div>
  );
};
const RadioList = (props) => {
  const [value, setValue] = useState('male');
  const [isActive, setIsActive] = useState({});
  const [isEditModalVisible, setEditModalVisibility] = useState(false);
  const [dataForEditModal, setDataForEditModal] = useState({});
  const [isDeleteModalVisible, setDeleteModalVisibility] = useState(false);
  const [dataForDeleteModal, setDataForDeleteModal] = useState({});
  useEffect(() => {
    const tempArr = props.cardData.map((item) => item.isActive);
    const tempObj = {};
    tempArr.forEach((item, index) => (tempObj[index] = item));
    // console.log(tempObj);
    setIsActive(tempObj);
  }, [props.cardData]);
  useEffect(() => {
    if (props.successMessage === 'Carta aggiornata con successo') {
      setEditModalVisibility(false);
      setDataForEditModal({});
    }
    if (props.successMessage === 'CARD_DELETE_SUCCESS') {
      setDeleteModalVisibility(false);
      setDataForDeleteModal({});
    }
  }, [props.successMessage]);
  return props.cardData.length === 0 ? (
    <span
      style={{
        textAlign: 'center',
        width: '100%',
        display: 'block',
        // fontSize: '20px',
        marginTop: '22px',
      }}
    >
      Nessuna carta trovata
    </span>
  ) : (
    <>
      <FormControl component="fieldset" className="radio-list">
        {/* <FormLabel component="legend">Gender</FormLabel> */}
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {props.cardData.map((card, index) => (
            <div
              style={{
                display: 'flex',
                borderBottom: '1px solid #bec7d1',
                padding: '20px',
              }}
            >
              <FormControlLabel
                control={
                  window.innerWidth > 500 ? (
                    <>
                      <OrangeSwitch
                        checked={card.isActive}
                        onChange={
                          () =>
                            props.updateProfileCardStatusRequest(
                              card._id,
                              !card.isActive
                            )
                          // setIsActive({ ...isActive, [index]: !isActive[index] })
                        }
                        name="checkbox"
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <OrangeSwitch
                        checked={card.isActive}
                        onChange={
                          () =>
                            props.updateProfileCardStatusRequest(
                              card._id,
                              !card.isActive
                            )
                          // setIsActive({ ...isActive, [index]: !isActive[index] })
                        }
                        name="checkbox"
                      />
                      <img
                        style={{ width: '100%' }}
                        src={
                          card.cardType.toLowerCase() === 'visa'
                            ? images.creditCardVisa
                            : images.creditCardMaster
                        }
                        alt={card.cardType}
                      />
                    </div>
                  )
                }
                value={card.stripeCardId || index}
                // control={<Radio />}
                // label={

                // }
              />
              <CardTemplate
                setEditModalVisibility={setEditModalVisibility}
                setDataForEditModal={setDataForEditModal}
                setDeleteModalVisibility={setDeleteModalVisibility}
                setDataForDeleteModal={setDataForDeleteModal}
                handleClick={props.handleClick}
                cardId={card._id}
                isActive={card.isActive}
                stripeCustomerId={card.stripeCustomerId}
                stripeCardId={card.stripeCardId}
                name={card.nameOnCard || 'Safeer Malik'}
                last4CardDigits={card.cardNumber || '5959'}
                cardType={card.cardType || 'visa'}
                expiryDate={
                  card.expiryMonth
                    ? `${card.expiryMonth}/${card.expiryYear}`
                    : '09/29'
                }
              />
            </div>
          ))}
          {/*             <FormControlLabel value="female" control={<Radio/>} label={<CardTemplate name="Safeer Malik" last4CardDigits="5959" cardType="visa" expiryDate="09/29"/>}/>
            <FormControlLabel value="male" control={<Radio/>} label={<CardTemplate name="Safeer Malik" last4CardDigits="6000"  cardType="mastercard" expiryDate="09/29"/>}/>
            <FormControlLabel value="other" control={<Radio/>} label={<CardTemplate name="Safeer Malik"  last4CardDigits="5001" cardType="mastercard" expiryDate="09/29"/>}/> */}
        </RadioGroup>
      </FormControl>
      {isEditModalVisible && (
        <EditCardModal
          data={dataForEditModal}
          setData={setDataForEditModal}
          isOpen={isEditModalVisible}
          hideModal={() => setEditModalVisibility(false)}
          handleSubmit={(data) => props.updateProfileCardDetailsRequest(data)}
        />
      )}
      {isDeleteModalVisible && (
        <DeleteConfirmModal
          data={dataForDeleteModal}
          isOpen={isDeleteModalVisible}
          hideModal={() => setDeleteModalVisibility(false)}
          handleSubmit={(data) => props.deleteProfileCardRequest(data)}
          setData={setDataForDeleteModal}
        />
      )}
    </>
  );

  //const {values} = props;
  /*  const values = [0,1,2,3]; 
    const handleToggle = (e) => console.log(e);
    return (
        <MaterialUIList className="list">
            {values.map(value => {
                const labelId=`checkbox-list-label-${value}`;
                return (
                    <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={false}
                                /* checked={checked.indexOf(value)!== -1} */
  /* tabIndex={-1}
                                disableRipple
                                inputProps={{'aria-labelledby': labelId}}
                            />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <CloseIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>    
                )
            })}
        </MaterialUIList> 
        )
       */
};

export default RadioList;
