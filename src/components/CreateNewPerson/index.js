import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Formik } from "formik";
import AddNewCompanyForm from "./Form";
import * as Yup from "yup";
import "./style.css";
import { connect } from "react-redux";
const validationSchema = Yup.object({
    name: Yup.string("Enter name")
        .matches(/^[A-Za-z ]+$/, {
            message: "Name should only have alphabets",
            excludeEmptyString: true
        })
        .required("Name is required"),
    address: Yup.string("Enter address").required("Address is required"),
    employer: Yup.string("Select employer").required("Employer is required")
});

class CreateNewPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const values = {
            name: "",
            address: "",
            employer: ""
        };
        const { listOfCompanies } = this.props;
        return (
            <Card
                className="create-new-company"
                style={{ backgroundColor: listOfCompanies <= 0 && "#eee5" }}
            >
                <h3>Create New Person</h3>
                <CardContent>
                    <Formik
                        render={props => <AddNewCompanyForm {...props} />}
                        initialValues={values}
                        validationSchema={validationSchema}
                    />
                </CardContent>
            </Card>
        );
    }
}
const mapStateToProps = state => ({
    listOfCompanies: state.companies.companyList.map(
        company => company.companyDetails.name
    )
});
export default connect(mapStateToProps)(CreateNewPerson);
