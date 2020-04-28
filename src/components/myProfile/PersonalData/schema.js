import * as Yup from 'yup';
export default Yup.object({
  // name validations =  Alphabet only, required field
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]+$/, {
      message: 'Nome Il nome può contenere solo lettere',
      excludeEmptyString: true
    })
    .required('Campo obbligatorio'),
  // surname validations = Alphabets only, required field
  surname: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]+$/, {
      message: 'Cognome Il nome può contenere solo lettere',
      excludeEmptyString: true
    })
    .required('Campo obbligatorio'),

  countryCode: Yup.string('Enter your country code')
    .trim()
    .required('Campo obbligatorio'),
  phoneNumber: Yup.string('Enter your Cellulare')
    .trim()
    .required('Campo obbligatorio'),
  address: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Indirizzo troppo lungo'),
  city: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Il nome della città è troppo lungo'),
  district: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Il nome della provincia è troppo lungo'),
  postalCode: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .test('test-name', 'Il codice postale può contenere solo numeri', value => {
      const regex = /^\d+$/;
      const isValidPostalCode = regex.test(value);
      return isValidPostalCode;
    })
    .max(6, 'CAP troppo lungo')
});
