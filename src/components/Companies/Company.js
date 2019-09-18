import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import "./style.css";
const Company = props => {
    const { companyDetails: company } = { ...props.company };
    const companyName = company.name;
    const companyURL = companyName.toLowerCase().replace(/ /g, "-");
    /* delete company.name; */
    return (
        <Card className="company-table">
            <CardContent>
                <h2 className="company-name">{companyName}</h2>
                <div className="table">
                    {Object.keys(company).map((row, index) =>
                        index !== 0 ? (
                            <React.Fragment key={index}>
                                <span className="table-heading">{row}</span>
                                <span className="table-data">
                                    {company[row]}
                                </span>
                            </React.Fragment>
                        ) : null
                    )}
                </div>
                <Link to={`/${companyURL}`}>Company Overview</Link>
            </CardContent>
        </Card>
    );
};

export default Company;
