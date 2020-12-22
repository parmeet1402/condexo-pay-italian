import * as Yup from 'yup';

export default Yup.object({
  name: Yup.string().trim().required('Campo obbligatorio'),
  surname: Yup.string().trim().required('Campo obbligatorio'),
  mobileNo: Yup.string().trim().required('Campo obbligatorio'),
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
});
