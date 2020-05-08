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
import toLower from 'lodash/toLower';
import './ResultsTable.scss';
const ResultsTable = (props) => {
  const [modalData, setModalData] = useState({
    data: '',
    importu: '',
    tipologia: '',
    beneficiario: '',
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

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };
  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const columns = [
    { id: 'paymentType', label: 'Tipologia', minWidth: 170 },
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
                  style={{ minWidth: column.minWidth, overflow: 'visible' }}
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
            {stableSort(rows, getComparator(order, orderBy))
              .slice(
                props.page * rowsPerPage,
                props.page * rowsPerPage + rowsPerPage
              )
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <>
                      {columns.map((column, index) => {
                        const value = row[column.id];
                        if (index === columns.length - 1) {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span
                                className="open-modal-button"
                                onClick={
                                  () =>
                                    history.push({
                                      pathname: '/profile',
                                      tabNo: 2,
                                    })
                                  /* */
                                }
                              >
                                Vedi
                              </span>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              onClick={() => {
                                setModalData({
                                  tipologia: row['paymentType'],
                                  beneficiario: row['payee'],
                                  data: row['date'],
                                  importo: row['amount'],
                                  cardNo: row['cardNo'],
                                  cardType: row['cardType'],
                                }) ||
                                  setPaymentDescriptionModalVisibility(true);
                              }}
                            >
                              {column.format && typeof value === 'number'
                                ? value
                                : typeof value === 'object'
                                ? format(value, 'dd/MM/yyyy')
                                : index === 0
                                ? startCase(value)
                                : index === 3
                                ? value + '€'
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
      <PaymentDescriptionModal
        modalData={modalData}
        isPaymentDescriptionModalVisible={isPaymentDescriptionModalVisible}
        setPaymentDescriptionModalVisibility={
          setPaymentDescriptionModalVisibility
        }
      />
    </div>
  );
};

export default ResultsTable;
