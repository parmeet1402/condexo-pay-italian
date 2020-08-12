import * as Yup from 'yup';
export default Yup.object({
  // name validations =  Alphabet only, required field
  name: Yup.string()
    .trim()
    .matches(/^[A-Za-z ]+$/, {
      message: 'Il nome può contenere solo lettere.',
      excludeEmptyString: true,
    })
    .required('Campo obbligatorio'),
});
