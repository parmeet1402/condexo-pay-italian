import React, { useState } from 'react';
import { Formik } from 'formik';
import TextInput from '../../common/form/TextInput';
import Button from '../../common/Button';
import './PersonalData.scss';
const PersonalData = () => {
  const [editMode, setEditMode] = useState(false);
  const renderForm = props => {
    const {
      values: { name, surname, phone, address, email },
      errors,
      handleChange,
      setFieldTouched
    } = props;
    const editModeBottomMargin = '26px';
    const change = (name, e) => {
      e.persist();
      handleChange(e);
      setFieldTouched(name, true, false);
    };

    return (
      <form
        className="personal-data--form"
        noValidate
        autoComplete="off"
        onSubmit={props.handleSubmit}
      >
        <div
          className="personal-data--form__row"
          style={{ marginBottom: editMode ? editModeBottomMargin : '43px' }}
        >
          <div className="personal-data--form__item">
            {editMode ? (
              <TextInput
                name="name"
                label="Nome"
                helperText={errors.name}
                error={Boolean(errors.name)}
                value={name}
                onChange={change.bind(null, 'name')}
                fullWidth
              />
            ) : (
              <>
                <label>Nome</label>
                <span>{name}</span>
              </>
            )}
          </div>
          <div className="personal-data--form__item">
            {editMode ? (
              <TextInput
                name="surname"
                label="Cognome"
                helperText={errors.surname}
                error={Boolean(errors.surname)}
                value={surname}
                onChange={change.bind(null, 'surname')}
                fullWidth
              />
            ) : (
              <>
                <label>Cognome</label>
                <span>{surname}</span>
              </>
            )}
          </div>
        </div>
        <div
          className="personal-data--form__row"
          style={{ marginBottom: editMode ? editModeBottomMargin : '43px' }}
        >
          <div className="personal-data--form__item">
            {editMode ? (
              <TextInput
                name="phone"
                label="Cellulare"
                helperText={errors.phone}
                error={Boolean(errors.phone)}
                value={phone}
                onChange={change.bind(null, 'phone')}
                fullWidth
              />
            ) : (
              <>
                <label>Cellulare</label>
                <span>{phone}</span>
              </>
            )}
          </div>
          <div className="personal-data--form__item">
            {editMode ? (
              <TextInput
                name="address"
                label="Indirizzo"
                helperText={errors.address}
                error={Boolean(errors.address)}
                value={address}
                onChange={change.bind(null, 'address')}
                fullWidth
              />
            ) : (
              <>
                <label>Indirizzo</label>
                <span>{address}</span>
              </>
            )}
          </div>
        </div>
        <div
          className="personal-data--form__row"
          style={{ marginBottom: '15px' }}
        >
          <div className="personal-data--form__item">
            <label>Email</label>
            <span>{email}</span>
          </div>
        </div>
        <Button
          onClick={() => setEditMode(!editMode)}
          borderColor="#1a315b"
          variant="outlined"
          style={{ width: '91px' }}
        >
          <span
            style={{ color: '#1a315b', fontWeight: '500', fontSize: '14px' }}
          >
            {editMode ? 'Salva' : 'Modifica'}
          </span>
        </Button>
      </form>
    );
  };
  const initialValues = {
    name: 'Maria',
    surname: 'Fermi',
    phone: '339 39393929',
    address: 'Via Gigliotti, 34 00100 Roma',
    email: 'MariaFermi@gmail.com'
  };
  return (
    <div className="personal-data">
      <div className="personal-data--header">
        <h2>Dati personali</h2>
      </div>
      <div className="personal-data--form__container">
        <Formik
          render={props => renderForm(props)}
          initialValues={initialValues}
          /* validationSchema={validationSchema} */
          validateOnChange={false}
          validateOnBlur={true}
          /* onSubmit={handleSubmit} */
        />
      </div>
    </div>
  );
};

export default PersonalData;
