import * as Yup from 'yup';
export default Yup.object({
  // name validations =  Alphabet only, required field
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]+$/, {
      message: 'Nome should only have alphabets',
      excludeEmptyString: true
    })
    .required('Nome is required'),
  // surname validations = Alphabets only, required field
  surname: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]+$/, {
      message: 'Cognome should only have alphabets',
      excludeEmptyString: true
    })
    .required('Cognome is required'),

  countryCode: Yup.string('Enter your country code')
    .trim()
    .required('Country code is required'),
  phoneNumber: Yup.string('Enter your Cellulare')
    .trim()
    .required('Cellulare is required'),
  address: Yup.string()
    .trim()
    .required('Indirizzo is required')
    .max(64, 'Indirizzo is too long')
});
