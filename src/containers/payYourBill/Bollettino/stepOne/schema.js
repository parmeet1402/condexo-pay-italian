import * as Yup from 'yup';

export default Yup.object({
  type: Yup.string('Type is required'),
  amount: Yup.string('amount is required'),
  accountNo: Yup.string('Account No is required'),
  code: Yup.string('Code is required'),
  desc: Yup.string('Description is required'),
});
