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

  // email validations =  Alphabet only, required field
  email: Yup.string('Enter your Email')
    .trim()
    .required('Campo obbligatorio')
    .test('test-name', 'Inserire un indirizzo email valido', value => {
      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      /* const phoneRegex = /^07[0-9]{1,9}$/; */

      let isValidEmail = emailRegex.test(value);
      /* let isValidPhone = phoneRegex.test(value); */

      if (!isValidEmail) {
        return false;
      }
      return true;
    }),
  countryCode: Yup.string('Enter your country code')
    .trim()
    .required('Campo obbligatorio'),
  phoneNumber: Yup.string('Enter your Cellulare')
    .trim()
    .required('Campo obbligatorio'),
  // password validations = length, required field, alphanumeric
  password: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .test('alpha-numeric-check', 'Password non corretta', value => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,50})$/;
      let isValidPassword = passwordRegex.test(value);
      if (!isValidPassword) {
        return false;
      }
      return true;
    }),
  // confirm password validations = length, required field, alphanumeric and password-match
  confirmPassword: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Le password non corrispondono. Inserire nuovamente.'
      )
    })
});
