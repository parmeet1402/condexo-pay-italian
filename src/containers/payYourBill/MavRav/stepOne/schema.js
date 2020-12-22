import * as Yup from 'yup';

export default Yup.object({
  mavCode: Yup.string().trim().required('Campo obbligatorio'),
  ravCode: Yup.string().trim().required('Campo obbligatorio'),
  amount: Yup.string().trim().required('Campo obbligatorio'),

  /*   .min(5, 'Amount must be bigger than 5')
    .max(500, 'Amount must be smaller than or equal to 500'), */
});
