import React, { Component } from "react";
import Card from "../../components/Card";
import { connect } from "react-redux";
import history from "../../utils/history";
import Navbar from "../../components/Navbar";
import "./style.css";
class CompanyOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: {}
        };
    }
    componentDidMount() {
        const { company: companyNameFromEndpoint } = this.props.match.params;
        const companyName = companyNameFromEndpoint.replace(/-/g, " ");
        if (this.props.companies.length > 0) {
            const company = this.props.companies.find(
                company =>
                    company.companyDetails.name.toLowerCase() === companyName
            );

            if (!!company) {
                this.setState({
                    company
                });
            } else {
                history.push("/");
            }
        } else {
            history.push("/");
        }
    }
    render() {
        return (
            <div>
                <Navbar
                    title={this.props.match.params.company.replace(/-/, " ")}
                />
                <div className="company-overview">
                    <Card title="Profile Overview">
                        {this.state.company && this.state.company.companyDetails
                            ? Object.keys(
                                  this.state.company.companyDetails
                              ).map(key => {
                                  if (key === "address") {
                                      return (
                                          <React.Fragment key="address">
                                              <span className="table-heading-multi">
                                                  <span>{key}:</span>
                                                  <span>Total Employees:</span>
                                              </span>
                                              <span className="table-data-multi">
                                                  <span>
                                                      {
                                                          this.state.company
                                                              .companyDetails[
                                                              key
                                                          ]
                                                      }
                                                  </span>
                                                  <span>
                                                      {
                                                          this.state.company
                                                              .employees.length
                                                      }
                                                  </span>
                                              </span>
                                          </React.Fragment>
                                      );
                                  } else if (key !== "name") {
                                      return (
                                          <React.Fragment key={key}>
                                              <span className="table-heading">
                                                  {key}:
                                              </span>
                                              <span className="table-data">
                                                  {
                                                      this.state.company
                                                          .companyDetails[key]
                                                  }
                                              </span>
                                          </React.Fragment>
                                      );
                                  } else {
                                      return null;
                                  }
                              })
                            : null}
                    </Card>
                    <Card title="Employees">
                        {this.state.company &&
                        this.state.company.employees &&
                        this.state.company.employees.length > 0 ? (
                            this.state.company.employees.map(employee => (
                                <Card
                                    type="employee"
                                    title={employee.name}
                                    key={employee.name}
                                >
                                    <React.Fragment>
                                        <span className="table-heading">
                                            Address:
                                        </span>
                                        <span className="table-data">
                                            {employee["address"]}
                                        </span>
                                    </React.Fragment>
                                </Card>
                            ))
                        ) : (
                            <h4>No Employess :(</h4>
                        )}
                    </Card>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    companies: state.companies.companyList
});

export default connect(
    mapStateToProps,
    null
)(CompanyOverview);
