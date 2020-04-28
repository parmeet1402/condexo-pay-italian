import * as Yup from 'yup';
export default Yup.object({
  // username validations =  Alphabet only, required field
  username: Yup.string('Enter your Email/Mobile Number')
    .trim()
    .required('Campo obbligatorio')
    .test(
      'test-name',
      'Inserire un indirizzo email valido / numero telefonico',
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
    .required('Campo obbligatorio')
    .test('alpha-numeric-check', 'Password non corretta', value => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z])(.{8,50})$/;

      let isValidPassword = passwordRegex.test(value);

      if (!isValidPassword) {
        return false;
      }
      return true;
    })
});
