import * as Yup from 'yup';
export default Yup.object({
  oldPassword: Yup.string()
    .trim()
    .required('Vecchia Password is required')
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
  newPassword: Yup.string()
    .trim()
    .required('Nuova Password is required')
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
  confirmNewPassword: Yup.string()
    .trim()
    .required('Conferma nuova password is required')
    .when('password', {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('newPassword')],
        'Passwords do not match. Please try again.'
      )
    })
});
