import * as Yup from 'yup';
export default Yup.object({
  // name validations =  Alphabet only, required field
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]+$/, {
      message: 'Name should only have alphabets',
      excludeEmptyString: true
    })
    .required('Name is required'),

  // username validations =  Alphabet only, required field
  username: Yup.string('Enter your Email/Mobile Number')
    .trim()
    .required('Username is required')
    .test(
      'test-name',
      'Please enter a valid email address /mobile number',
      value => {
        const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const phoneRegex = /^07[0-9]{1,9}$/;

        let isValidEmail = emailRegex.test(value);
        let isValidPhone = phoneRegex.test(value);

        if (!isValidEmail && !isValidPhone) {
          return false;
        }
        return true;
      }
    ),
  // password validations = length, required field, alphanumeric
  password: Yup.string()
    .trim()
    .required('Password is required')
    .test('alpha-numeric-check', 'Password is in incorrect format', value => {
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
    .required('Confirm Password is required')
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Passwords do not match. Please try again.'
      )
    })
});
