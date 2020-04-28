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

import { PaymentDescriptionModal } from '../../modals';

import './ResultsTable.scss';

const ResultsTable = props => {
  const [modalData, setModalData] = useState({
    data: '',
    importu: '',
    tipologia: '',
    beneficiario: ''
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
      overflow: 'auto'
    },
    tableWrapper: {
      /* maxHeight: 440, */
      overflow: 'auto'
    }
  });

  const columns = [
    { id: 'tipologia', label: 'Tipologia', minWidth: 170 },
    {
      id: 'beneficiario',
      label: (
        <span className="thead-with-icon">
          Beneficiario
          <HelpIcon
            className="help-icon"
            style={{
              cursor: 'pointer',
              fontSize: '20px',
              marginLeft: '12px'
            }}
          />
        </span>
      ),
      minWidth: 100
    },
    {
      id: 'data',
      label: 'Data',
      minWidth: 120
      /* align: 'right',
          format: value => value.toLocaleString(), */
    },
    {
      id: 'importo',
      label: 'Importo',
      minWidth: 120,
      align: 'right'
      /*
          format: value => value.toLocaleString(), */
    },
    {
      id: 'icon',
      label: '',
      minWidth: 170,
      align: 'center'
      /*
          format: value => value.toFixed(2), */
    }
  ];

  const rows = props.filteredData;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [
    isPaymentDescriptionModalVisible,
    setPaymentDescriptionModalVisibility
  ] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
                  style={{ minWidth: column.minWidth, overflow: 'visible' }}
                  title={
                    index === 1
                      ? 'Beneficiario: a chi è indirizzato il pagamento'
                      : ''
                  }
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
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
                                onClick={() =>
                                  setModalData({
                                    tipologia: row['tipologia'],
                                    beneficiario: row['beneficiario'],
                                    data: format(row['data'], 'dd/MM/yyyy'),
                                    importo: row['importo']
                                  }) ||
                                  setPaymentDescriptionModalVisibility(true)
                                }
                              >
                                Vedi
                              </span>
                            </TableCell>
                          );
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number'
                                ? column.format(value)
                                : typeof value === 'object'
                                ? format(value, 'dd/MM/yyyy')
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
