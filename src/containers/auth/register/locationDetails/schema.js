import * as Yup from 'yup';
export default Yup.object({
  // name validations =  Alphabet only, required field
  address: Yup.string()
    .trim()
    .required('Address is required')
    .max(64, 'Address is too long'),
  city: Yup.string()
    .trim()
    .required('City is required')
    .max(64, 'City is too long'),
  district: Yup.string()
    .trim()
    .required('District is required')
    .max(64, 'District is too long'),
  postalCode: Yup.string()
    .trim()
    .required('Postal Code is required')
    .test('test-name', 'Postal code could only have numbers', value => {
      const regex = /^\d+$/;
      const isValidPostalCode = regex.test(value);
      return isValidPostalCode;
    })
    .max(6, 'Postal Code is too long')
});
