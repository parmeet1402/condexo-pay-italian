export const getCondexoCommissionAmount = () => {
  return 0.25;
};

export const getStripeCommissionAmount = (baseAmount) => {
  return baseAmount * 0.14 + 0.25;
};

export const getTotalInclusiveOfCommissions = (baseAmount) => {
  const condexoCommissionAmount = getCondexoCommissionAmount();
  const stripeCommissionAmount = getStripeCommissionAmount(
    typeof baseAmount === 'string' ? parseFloat(baseAmount) : baseAmount
  );

  return (
    (typeof baseAmount === 'string' ? parseFloat(baseAmount) : baseAmount) +
    condexoCommissionAmount +
    stripeCommissionAmount
  );
};
