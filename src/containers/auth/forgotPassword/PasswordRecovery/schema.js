import * as Yup from 'yup';
export default Yup.object({
  // username validations =  Alphabet only, required field
  username: Yup.string('Enter your Email/Mobile Number')
    .trim()
    .required('Username is required')
    .test('test-name', 'Enter correct email address/mobile number', value => {
      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      const phoneRegex = /^07[0-9]{1,9}$/;

      let isValidEmail = emailRegex.test(value);
      let isValidPhone = phoneRegex.test(value);

      if (!isValidEmail && !isValidPhone) {
        return false;
      }
      return true;
    })
});
