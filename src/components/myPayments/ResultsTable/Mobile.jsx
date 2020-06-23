import React from 'react';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
const ResultsTableMobile = ({
  filteredData,
  setPaymentDescriptionModalVisibility,
  setModalData,
}) => {
  console.log(filteredData);
  /* 
  "_id":"5ecd30c827935e57d372513d",
  "paymentType":"mobileTopup",
  "payee":"KENA MOBILE 50 EURO",
  "date":"26/05/2020",
  "amount":50,
  "cardNo":"1111",
  "cardType":"visa"
}
  */
  return (
    <div className="results-table--mobile">
      {filteredData.map((row) => (
        <div
          className="results-table--mobile__row"
          onClick={() => {
            setModalData({
              tipologia: row['paymentTypeItaly'],
              beneficiario: row['payee'],
              data: row['date'],
              importo: row['amount'],
              cardNo: row['cardNo'],
              cardType: row['cardType'],
              timestamp: row['timeStamp'],
              description: row['description'],
              mobileNo: row['mobileNo'],
              productType: row['productType'],
            }) || setPaymentDescriptionModalVisibility(true);
          }}
        >
          <div className="results-table--mobile__row__header">
            <span className="results-table--mobile__row__date">
              {format(
                parse(row.date, 'dd/MM/yyyy', new Date()),
                'do MMMM yyyy'
              )}
            </span>
          </div>
          <div className="results-table--mobile__row__body">
            <div>
              <span className="results-table--mobile__row__label">
                Topologia
              </span>
              <span className="results-table--mobile__row__payee">
                {row.payee}
              </span>
            </div>
            <div>
              <span className="results-table--mobile__row__label">Importo</span>
              <span className="results-table--mobile__row__amount">
                {row.amount} €
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsTableMobile;
