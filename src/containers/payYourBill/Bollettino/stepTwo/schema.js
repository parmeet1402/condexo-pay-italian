import * as Yup from 'yup';

export default Yup.object({
  // name validations =  Alphabet only, required field
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]+$/, {
      message: 'Nome Il nome può contenere solo lettere',
      excludeEmptyString: true,
    })
    .required('Campo obbligatorio'),
  // surname validations = Alphabets only, required field
  surname: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]+$/, {
      message: 'Cognome Il nome può contenere solo lettere',
      excludeEmptyString: true,
    })
    .required('Campo obbligatorio'),

  // email validations =  Alphabet only, required field
  email: Yup.string('Enter your Email')
    .trim()
    .required('Campo obbligatorio')
    .test('test-name', 'Inserire un indirizzo email valido', (value) => {
      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      /* const phoneRegex = /^07[0-9]{1,9}$/; */

      let isValidEmail = emailRegex.test(value);
      /* let isValidPhone = phoneRegex.test(value); */

      if (!isValidEmail) {
        return false;
      }
      return true;
    }),
  address: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Indirizzo troppo lungo'),
  city: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Città nome troppo lungo'),
  district: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Provincia nome troppo lungo'),
  postalCode: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .test(
      'test-name',
      'Il codice postale può contenere solo numeri',
      (value) => {
        const regex = /^\d+$/;
        const isValidPostalCode = regex.test(value);
        return isValidPostalCode;
      }
    )
    .max(6, 'CAP troppo lungo'),
});
