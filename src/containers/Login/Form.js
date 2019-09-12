import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import userCredentials from "../../data/userCredentials";
import "./style.css";
import {
    setLoginPending,
    setLoginFailure,
    setLoginSuccess
} from "../../actions/authActions";

import history from "../../utils/history";

const Form = props => {
    const {
        values: { userName, password },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setSubmitting,
        setErrors
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const handleSubmit = async e => {
        const { setLoginFailure, setLoginSuccess, setLoginPending } = props;
        e.preventDefault();
        setSubmitting(true);
        try {
            // check user
            if (userName.toLowerCase() !== userCredentials.userName) {
                const errors = {
                    userName: "Incorrect user name"
                };
                setErrors(errors);
            } else if (password.toLowerCase() !== userCredentials.password) {
                const errors = {
                    password: "Incorrect password"
                };
                setErrors(errors);
            } else {
                //  dispatch setLoginPending
                setLoginPending();
                try {
                    // make call to get user data
                    const userData = await userCredentials;
                    setSubmitting(false);
                    // If user gets logged in then dispatch setLoginSuccess
                    setLoginSuccess(userData);
                    // Redirect to Homepage
                    history.push("/");
                } catch (err) {
                    // setLoginFailure
                    const errors = {
                        password: "Password is wrong"
                    };
                    setErrors(errors);
                    setLoginFailure();
                }
            }
        } catch (err) {
            setErrors(err);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <form
            noValidate
            autoComplete="off"
            className="login-form"
            onSubmit={handleSubmit}
        >
            <TextField
                name="userName"
                required
                helperText={touched.userName ? errors.userName : ""}
                error={Boolean(errors.userName)}
                label="User Name"
                value={userName}
                onChange={change.bind(null, "userName")}
                fullWidth
            />
            <TextField
                name="password"
                required
                label="Password"
                type="password"
                fullWidth
                helperText={touched.password ? errors.password : ""}
                error={Boolean(errors.password)}
                value={password}
                onChange={change.bind(null, "password")}
            />
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!isValid}
            >
                Accedi
            </Button>
        </form>
    );
};

const mapDispatchToProps = dispatch => ({
    setLoginPending: () => dispatch(setLoginPending()),
    setLoginSuccess: userData => dispatch(setLoginSuccess(userData)),
    setLoginFailure: () => dispatch(setLoginFailure())
});

export default connect(
    null,
    mapDispatchToProps
)(Form);
