import React from "react";
import Company from "./Company";
import { connect } from "react-redux";

const Companies = props => {
    const { companies } = props;
    return (
        <div>
            {companies.length <= 0 ? (
                <h1>No Companies</h1>
            ) : (
                companies.map(company => (
                    <Company
                        company={company}
                        key={company.companyDetails.name}
                    />
                ))
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    companies: state.companies.companyList
});

export default connect(
    mapStateToProps,
    null
)(Companies);
