import * as Yup from 'yup';
export default Yup.object({
  // name validations =  Alphabet only, required field
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z]+$/, {
      message: 'Name should only have alphabets',
      excludeEmptyString: true
    })
    .required('Name is required')
});
