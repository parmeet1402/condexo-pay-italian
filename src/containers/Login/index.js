import React, { Component } from "react";
import { Formik } from "formik";
import LoginForm from "./Form";
import * as Yup from "yup";

const validationSchema = Yup.object({
    userName: Yup.string("Enter your username").required(
        "Username is required"
    ),
    password: Yup.string("")
        .min(8, "Password must contain atleast 8 characters")
        .required("Enter your password")
});
class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const values = {
            userName: "",
            password: ""
        };

        return (
            <div className="login-form__container">
                <Formik
                    render={props => <LoginForm {...props} />}
                    initialValues={values}
                    validationSchema={validationSchema}
                />
            </div>
        );
    }
}
export default LoginContainer;
