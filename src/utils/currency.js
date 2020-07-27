const combineCurrencyParts = (arr) => {
  let str = '';
  let currency = '';

  console.log(JSON.stringify(arr));
  arr.forEach((obj) => {
    if (obj.type === 'group') {
    } else if (obj.type !== 'currency') {
      str += obj.value;
    } else {
      currency = obj.value;
    }
  });
  console.log(`${str} ${currency}`);
  return `${str} ${currency}`;
};
/* export const stringToCurrency = (str) =>
  combineCurrencyParts(
    new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).formatToParts(str)
  ); */
export const stringToCurrency = (str) =>
  new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    // minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(str);
export const currencyToString = (currency) =>
  currency.replace('€', '').replace(/,/g, '.').replace(/\s/g, '');
