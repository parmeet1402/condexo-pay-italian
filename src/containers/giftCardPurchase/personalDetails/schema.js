import * as Yup from 'yup';
export default Yup.object({
  // isGuestUser: Yup.boolean(),
  email: Yup.string('Enter your Email')
    .trim()
    // .required('Campo obbligatorio')
    .test('test-name', 'Inserire un indirizzo email valido', function (value) {
      const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      /* const phoneRegex = /^07[0-9]{1,9}$/; */

      let isValidEmail = emailRegex.test(value);
      /* let isValidPhone = phoneRegex.test(value); */

      if (!this.parent.isGuestUser) {
        if (!value) {
          return true;
        }
      }

      if (!isValidEmail) {
        return false;
      }
      return true;
    }),
  amount: Yup.number('Enter amount')
    .min(5, 'Amount must be bigger than 5')
    .max(500, 'Amount must be smaller than or equal to 500'),
  supplier: Yup.string(),
  amazonId: Yup.string()
    .trim()
    .when('supplier', {
      is: (val) => val === 'Amazon',
      then: Yup.string().required('Amazon id is required'),
    }),
});
