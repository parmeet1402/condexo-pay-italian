import React, { useEffect, useState } from 'react';
import { Page, PageContent } from '../layout';
import TablePagination from '@material-ui/core/TablePagination';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import UIActions from '../../redux/UIRedux';
import MyPaymentActions, {
  MyPaymentSelectors,
} from '../../redux/MyPaymentsRedux';
import { Loader } from '../../components/Loader';
import { FilterHeader, ResultsTable } from '../../components/myPayments';
import Pagination from '@material-ui/lab/Pagination';
import compareAsc from 'date-fns/compareAsc';
import { subDays } from 'date-fns';
import data from '../../components/myPayments/ResultsTable/data';

import './style.scss';
const MyPayments = (props) => {
  useEffect(() => {
    props.showNavbar();
    // setFilteredData(data);
    props.getPaymentsRequest({});
  }, []);

  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  // const [searchQuery, setSearchQuery] = useState({});

  /* const updateSearchQuery = () => {
    setSearchQuery({
      ...(fromDate && { fromDate }),
      ...(toDate && { toDate }),
      ...(searchText && { searchText })
    });
  }; */

  /*   const filterData = () => {
    const rawData = data;
    let searchTextTrimmed = searchText.trim();
    if (searchTextTrimmed) {
      let filteredData = [];
      filteredData = rawData.filter((item) => {
        const splitUpArr = item['tipologia'].split(' ');
        let containsWord = false;
        splitUpArr.forEach((word) => {
          if (word.toLowerCase().startsWith(searchTextTrimmed.toLowerCase())) {
            containsWord = true;
          }
        });
        if (containsWord) {
          if (fromDate && toDate) {
            return (
              compareAsc(item['data'], fromDate) > -1 &&
              compareAsc(toDate, item['data']) > -1
            );
          } else if (fromDate) {
            return compareAsc(item['data'], fromDate) > -1;
          } else if (toDate) {
            return compareAsc(toDate, item['data']) > -1;
          }
          return containsWord;
        }
        // return containsWord;
      });
      setFilteredData(filteredData);
    } else if (fromDate && toDate) {
      const filteredData = rawData.filter((item) => {
        return (
          compareAsc(item['data'], fromDate) > -1 &&
          compareAsc(toDate, item['data']) > -1
        );
      });
      setFilteredData(filteredData);
    } else if (fromDate) {
      const filteredData = rawData.filter((item) => {
        return compareAsc(item['data'], fromDate) > -1;
      });
      setFilteredData(filteredData);
    } else if (toDate) {
      const filteredData = rawData.filter((item) => {
        return compareAsc(toDate, item['data']) > -1;
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
  }; */
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [isMobileSearchModalVisible, setMobileSearchModalVisibility] = useState(
    false
  );
  return (
    <Page>
      <PageContent className="my-payments">
        <div>
          {props.isLoading && <Loader belowNavbar />}
          <div className="my-payments-content__container">
            <div className="my-payments-header">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="my-payments-header--back">
                  {/* <FontAwesomeIcon
                    icon={faArrowLeft}
                    style={{ fonWeight: '100' }}
                  /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-arrow-left"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="#0357d3"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <line x1="5" y1="12" x2="11" y2="18" />
                    <line x1="5" y1="12" x2="11" y2="6" />
                  </svg>
                  <span>Torna alla Dashboard</span>
                </div>
              </Link>
              <h1>I miei pagamenti</h1>
            </div>
            <div
              className="my-payments__mobile-filter-icon__container"
              onClick={() => setMobileSearchModalVisibility(true)}
            >
              <FontAwesomeIcon
                icon={faFilter}
                className="my-payments__mobile-filter-icon"
              />
            </div>
            <FilterHeader
              isMobileSearchModalVisible={isMobileSearchModalVisible}
              setMobileSearchModalVisibility={setMobileSearchModalVisibility}
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
              // updateSearchQuery={updateSearchQuery}
              setSearchText={setSearchText}
              searchText={searchText}
              filterData={() =>
                console.log('FILTER DATA') ||
                props.getPaymentsRequest({
                  fromDate,
                  toDate,
                  searchQuery: searchText,
                })
              }
            />
            <ResultsTable filteredData={props.data} page={page} />
            {!props.isLoading && (
              <div
                className="pagination-container"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '40px',
                }}
              >
                <TablePagination
                  count={props.data.length}
                  rowsPerPage={10}
                  page={page}
                  onChangePage={handleChangePage}
                  variant="outlined"
                  shape="rounded"
                  labelRowsPerPage=""
                />
                {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
              </div>
            )}
          </div>
        </div>
      </PageContent>
    </Page>
  );
};
const mapStateToProps = (state) => ({
  data: MyPaymentSelectors.selectData(state),
  isLoading: MyPaymentSelectors.selectLoading(state),
});
const mapDispatchToProps = (dispatch) => ({
  showNavbar: () => dispatch(UIActions.showNavbar()),
  getPaymentsRequest: (data) =>
    dispatch(MyPaymentActions.getPaymentsRequest(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyPayments);
