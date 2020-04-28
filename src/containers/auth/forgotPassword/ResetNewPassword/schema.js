import * as Yup from 'yup';
export default Yup.object({
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
