import React, { useEffect } from 'react';
import { Page, PageContent } from '../layout';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import UIActions from '../../redux/UIRedux';
import { Loader } from '../../components/Loader';
import { FilterHeader, ResultsTable } from '../../components/myPayments';
import Pagination from '@material-ui/lab/Pagination';

import './style.scss';
const MyPayments = props => {
  useEffect(() => {
    props.showNavbar();
  }, []);
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
            <FilterHeader />
            <ResultsTable />
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
