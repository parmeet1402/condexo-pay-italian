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

  // email validations =  Alphabet only, required field
  email: Yup.string('Enter your Email')
    .trim()
    .required('Email is required')
    .test('test-name', 'Please enter a valid email address', value => {
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
    .required('Country code is required'),
  phoneNumber: Yup.string('Enter your Cellulare')
    .trim()
    .required('Cellulare is required'),
  // password validations = length, required field, alphanumeric
  password: Yup.string()
    .trim()
    .required('Password is required')
    .test(
      'alpha-numeric-check',
      'You must use a mix of lower and upper case letters, numbers and symbols. 8 characters minimum.',
      value => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,50})$/;
        let isValidPassword = passwordRegex.test(value);
        if (!isValidPassword) {
          return false;
        }
        return true;
      }
    ),
  // confirm password validations = length, required field, alphanumeric and password-match
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm Password is required')
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Passwords do not match. Please try again.'
      )
    })
});
