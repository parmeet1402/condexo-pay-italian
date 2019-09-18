import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// redux
import { connect } from "react-redux";
import {
    createCompanyFailure,
    createCompanyPending,
    createCompanySuccess
} from "../../actions/companyActions";

const Form = props => {
    const {
        values: { name, address, revenue, phone },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setSubmitting,
        resetForm
    } = props;
    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };
    const handleSubmit = async e => {
        const {
            createCompanyFailure,
            createCompanySuccess,
            createCompanyPending
        } = props;
        e.preventDefault();
        setSubmitting(true);
        createCompanyPending();
        try {
            const companyData = {
                companyDetails: { name, address, revenue, phone },
                employees: []
            };
            createCompanySuccess(companyData);
            resetForm();
        } catch (err) {
            createCompanyFailure();
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className="create-new-company__form "
        >
            <TextField
                name="name"
                helperText={touched.name ? errors.name : ""}
                error={Boolean(errors.name)}
                label="Name"
                value={name}
                onChange={change.bind(null, "name")}
                fullWidth
            />
            <TextField
                name="address"
                helperText={touched.address ? errors.address : ""}
                error={Boolean(errors.address)}
                label="Address"
                value={address}
                onChange={change.bind(null, "address")}
                fullWidth
            />
            <TextField
                name="revenue"
                helperText={touched.revenue ? errors.revenue : ""}
                error={Boolean(errors.revenue)}
                label="Revenue"
                value={revenue}
                onChange={change.bind(null, "revenue")}
                fullWidth
            />
            <TextField
                name="phone"
                helperText={touched.phone ? errors.phone : ""}
                error={Boolean(errors.phone)}
                label="Phone"
                value={phone}
                onChange={change.bind(null, "phone")}
                fullWidth
            />
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!isValid}
            >
                Salva
            </Button>
        </form>
    );
};

const mapDispatchToProps = dispatch => ({
    createCompanyPending: () => dispatch(createCompanyPending()),
    createCompanySuccess: company => dispatch(createCompanySuccess(company)),
    createCompanyFailure: () => dispatch(createCompanyFailure())
});

export default connect(
    null,
    mapDispatchToProps
)(Form);
