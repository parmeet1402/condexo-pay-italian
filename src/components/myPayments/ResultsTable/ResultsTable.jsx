import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import HelpIcon from '@material-ui/icons/Help';
import { Tooltip } from '../../common/Tooltip';
import { Visibility } from '@material-ui/icons';
import format from 'date-fns/format';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { PaymentDescriptionModal } from '../../modals';
import history from '../../../utils/history';
import startCase from 'lodash/startCase';
import lodashOrderBy from 'lodash/orderBy';
import ResultsTableMobile from './Mobile.jsx';
import toLower from 'lodash/toLower';
import { stringToCurrency } from '../../../utils/currency';
import './ResultsTable.scss';
const ResultsTable = (props) => {
  const [modalData, setModalData] = useState({
    /* data: '',
    importu: '',
    tipologia: '',
    beneficiario: '', */
    data: '',
    importo: 0,
    tipologia: '',
    beneficiario: '',
    cardNo: '',
    cardType: '',

    timestamp: '',
    description: '',
  });

  const useStyles = makeStyles({
    root: {
      /* width: '80%', */
      margin: '26px auto 50px',
      width: '1172px',
      /* height: "608px", */
      borderRadius: '6px',
      boxShadow: '0 0 12px 0 #00000028',
      backgroundColor: '#ffffff',
      overflow: 'auto',
    },
    tableWrapper: {
      /* maxHeight: 440, */
      overflow: 'auto',
    },
  });

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('data');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const columns = [
    { id: 'paymentTypeItaly', label: 'Tipologia', minWidth: 170 },
    {
      id: 'payee',
      label: (
        <span className="thead-with-icon">
          Beneficiario
          <HelpIcon
            className="help-icon"
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              marginLeft: '12px',
            }}
          />
        </span>
      ),
      minWidth: 100,
    },
    {
      id: 'date',
      label: 'Data',
      minWidth: 120,
      /* align: 'right',
          format: value => value.toLocaleString(), */
    },
    {
      id: 'amount',
      label: 'Importo',
      minWidth: 120,
      align: 'right',
      /*
          format: value => value.toLocaleString(), */
    },
    {
      id: 'icon',
      label: '',
      minWidth: 170,
      align: 'center',
      /*
          format: value => value.toFixed(2), */
    },
  ];

  const rows = props.filteredData;
  console.log(rows);

  const classes = useStyles();
  // const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [
    isPaymentDescriptionModalVisible,
    setPaymentDescriptionModalVisibility,
  ] = useState(false);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    // setPage(0);
  };
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <>
      <ResultsTableMobile
        filteredData={props.filteredData}
        setPaymentDescriptionModalVisibility={
          setPaymentDescriptionModalVisibility
        }
        setModalData={setModalData}
      />
      <div className={`${classes.root} results-table`}>
        <div className={classes.tableWrapper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sortDirection={orderBy === column.id ? order : false}
                    style={{ overflow: 'visible' }}
                    title={
                      index === 1
                        ? 'Beneficiario: a chi è indirizzato il pagamento'
                        : ''
                    }
                  >
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={createSortHandler(column.id)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {lodashOrderBy(rows, [orderBy], [order])
                .slice(
                  props.page * rowsPerPage,
                  props.page * rowsPerPage + rowsPerPage
                )
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <>
                        {columns.map((column, index) => {
                          const value = row[column.id];
                          if (index === columns.length - 1) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <span
                                  className="open-modal-button"
                                  onClick={() => {
                                    console.log({ row });
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
                                      productType:
                                        row['productType'] ||
                                        row['paymentTypeItaly'],
                                      serialNo: row['serial'],
                                      pinNo: row['pin'],
                                      websiteURL: row['websiteURL'],
                                      ...(row['paymentType'] && {
                                        paymentType: row['paymentType'],
                                      }),
                                      ...(row['billType'] && {
                                        billType: row['billType'],
                                      }),
                                    }) ||
                                      setPaymentDescriptionModalVisibility(
                                        true
                                      );
                                  }}
                                >
                                  Vedi
                                </span>
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? value
                                  : typeof value === 'object'
                                  ? format(value, 'dd/MM/yyyy')
                                  : index === 0
                                  ? startCase(value)
                                  : index === 3
                                  ? stringToCurrency(value)
                                  : value}
                              </TableCell>
                            );
                          }
                        })}
                        {/* <TableCell>
                        <span
                        className="open-modal-button"
                        onClick={() =>
                          setPaymentDescriptionModalVisibility(true)
                        }
                        >
                        Vedi
                        </span>
                      </TableCell> */}
                      </>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>

      <PaymentDescriptionModal
        modalData={modalData}
        isPaymentDescriptionModalVisible={isPaymentDescriptionModalVisible}
        setPaymentDescriptionModalVisibility={
          setPaymentDescriptionModalVisibility
        }
      />
    </>
  );
};

export default ResultsTable;
