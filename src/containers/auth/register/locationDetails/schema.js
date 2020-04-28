import * as Yup from 'yup';
export default Yup.object({
  // name validations =  Alphabet only, required field
  address: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Indirizzo troppo lungo'),
  city: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Città nome troppo lungo'),
  district: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .max(64, 'Provincia nome troppo lungo'),
  postalCode: Yup.string()
    .trim()
    .required('Campo obbligatorio')
    .test('test-name', 'Il codice postale può contenere solo numeri', value => {
      const regex = /^\d+$/;
      const isValidPostalCode = regex.test(value);
      return isValidPostalCode;
    })
    .max(6, 'CAP troppo lungo')
});
