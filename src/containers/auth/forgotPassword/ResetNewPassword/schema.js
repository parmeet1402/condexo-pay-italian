import * as Yup from 'yup';
export default Yup.object({
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
