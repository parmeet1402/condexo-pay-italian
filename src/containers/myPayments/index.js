import React, { useEffect, useState } from 'react';
import { Page, PageContent } from '../layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import UIActions from '../../redux/UIRedux';
import { Loader } from '../../components/Loader';
import { FilterHeader, ResultsTable } from '../../components/myPayments';
import Pagination from '@material-ui/lab/Pagination';
import compareAsc from 'date-fns/compareAsc';
import { subDays } from 'date-fns';
import data from '../../components/myPayments/ResultsTable/data';

import './style.scss';
const MyPayments = props => {
  useEffect(() => {
    props.showNavbar();
    setFilteredData(data);
  }, []);

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

  const filterData = () => {
    const rawData = data;
    let searchTextTrimmed = searchText.trim();
    if (searchTextTrimmed) {
      let filteredData = [];
      filteredData = rawData.filter(item => {
        const splitUpArr = item['tipologia'].split(' ');
        let containsWord = false;
        splitUpArr.forEach(word => {
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
      const filteredData = rawData.filter(item => {
        return (
          compareAsc(item['data'], fromDate) > -1 &&
          compareAsc(toDate, item['data']) > -1
        );
      });
      setFilteredData(filteredData);
    } else if (fromDate) {
      const filteredData = rawData.filter(item => {
        return compareAsc(item['data'], fromDate) > -1;
      });
      setFilteredData(filteredData);
    } else if (toDate) {
      const filteredData = rawData.filter(item => {
        return compareAsc(toDate, item['data']) > -1;
      });
      setFilteredData(filteredData);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <Page>
      <PageContent className="my-payments">
        <div>
          {/* TODO: ADD LOADER */}
          <div className="my-payments-content__container">
            <div className="my-payments-header">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <div className="my-payments-header--back">
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>Torna alla Dashboard</span>
                </div>
              </Link>
              <h1>I miei pagamenti</h1>
            </div>
            <FilterHeader
              fromDate={fromDate}
              setFromDate={setFromDate}
              toDate={toDate}
              setToDate={setToDate}
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
              // updateSearchQuery={updateSearchQuery}
              setSearchText={setSearchText}
              searchText={searchText}
              filterData={filterData}
            />
            <ResultsTable filteredData={filteredData} />
            <div
              className="pagination-container"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '40px'
              }}
            >
              <Pagination count={10} variant="outlined" shape="rounded" />
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  );
};
const mapDispatchToProps = dispatch => ({
  showNavbar: () => dispatch(UIActions.showNavbar())
});
export default connect(null, mapDispatchToProps)(MyPayments);
