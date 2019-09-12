import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Formik } from "formik";
import AddNewCompanyForm from "./Form";
import * as Yup from "yup";
import "./style.css";

const validationSchema = Yup.object({
    name: Yup.string("Enter company's name")
        .matches(/^[A-Za-z ]+$/, {
            message: "Company's name should only have alphabets",
            excludeEmptyString: true
        })
        .required("Company's name is required"),
    address: Yup.string("Enter company's address").required(
        "Company's address is required"
    ),
    revenue: Yup.string("Enter Company's revenue")
        .matches(/^[0-9 ]+$/, {
            message: "Company's revenue should only have numbers",
            excludeEmptyString: true
        })
        .required("Company's revenue is required"),
    phone: Yup.string("Enter Company's phone number")
        .matches(/^[0-9 +]+$/, {
            message: "Company's phone number should only have numbers",
            excludeEmptyString: true
        })
        .required("Company's phone number is required")
});

class CreateNewCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const values = {
            name: "",
            address: "",
            revenue: "",
            phone: ""
        };
        return (
            <Card className="create-new-company">
                <h3>Create New Company</h3>
                <CardContent>
                    <Formik
                        enableReinitialize
                        render={props => <AddNewCompanyForm {...props} />}
                        initialValues={values}
                        validationSchema={validationSchema}
                    />
                </CardContent>
            </Card>
        );
    }
}
export default CreateNewCompany;
