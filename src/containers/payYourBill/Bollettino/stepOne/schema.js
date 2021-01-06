import * as Yup from 'yup';

export default Yup.object({
  type: Yup.string('Type is required'),
  // amountToLeftOfDecimal: Yup.string('amount is required'),
  // amountToRightOfDecimal: Yup.string('amount  is required'),
  amount: Yup.string(''),
  accountNo: Yup.string('Account No is required'),
  code: Yup.string('Code is required'),
  desc: Yup.string('Description is required'),
});
