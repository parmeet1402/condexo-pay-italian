import * as Yup from 'yup';
export default Yup.object({
  // username validations =  Alphabet only, required field
  email: Yup.string('Enter your Email')
    .trim()
    .required('Campo obbligatorio')
    .test('test-name', 'Inserisci una email valida', value => {
      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      /* const phoneRegex = /^07[0-9]{1,9}$/; */

      let isValidEmail = emailRegex.test(value);
      /* let isValidPhone = phoneRegex.test(value); */

      if (!isValidEmail) {
        return false;
      }
      return true;
    })
});
