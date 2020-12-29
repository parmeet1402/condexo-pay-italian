export const decodeBarcode = (barcode) => {
  const lengthOfPostalCode = +barcode.substr(0, 2);
  const codiceBanco = barcode.substr(2, lengthOfPostalCode);
  const lengthOfBankAccount = +barcode.substr(2 + lengthOfPostalCode, 2);
  const bankAccount = `${+barcode.substr(
    2 + lengthOfPostalCode + 2,
    lengthOfBankAccount
  )}`;
  const amountLength = +barcode.substr(
    2 + lengthOfPostalCode + 2 + lengthOfBankAccount,
    2
  );
  const amountStr = `${+barcode.substr(
    2 + lengthOfPostalCode + 2 + lengthOfBankAccount + 2,
    amountLength
  )}`;
  const bollentinoType = barcode.substr(-3);

  return { codiceBanco, bankAccount, amountStr, bollentinoType };
};

export const updateData = (data, updateKey) => {
  const { codiceBanco, bankAccount, amountStr, bollentinoType } = data;
  updateKey('stepOne', 'type', bollentinoType);
  updateKey(
    'stepOne',
    'amountToLeftOfDecimal',
    amountStr.substr(0, amountStr.length - 2)
  );
  updateKey('stepOne', 'amountToRightOfDecimal', amountStr.substr(-2));
  updateKey('stepOne', 'accountNo', bankAccount);
  updateKey('stepOne', 'code', codiceBanco);
};
