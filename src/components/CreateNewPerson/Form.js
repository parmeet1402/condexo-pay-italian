import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// redux
import { connect } from "react-redux";
import {
    addEmployeePending,
    addEmployeeFailure,
    addEmployeeSuccess
} from "../../actions/companyActions";

const Form = props => {
    const {
        values: { name, address, employer },
        errors,
        touched,
        handleChange,
        isValid,
        setFieldTouched,
        setSubmitting,
        setFieldValue,
        resetForm,
        listOfCompanies
    } = props;

    const change = (name, e) => {
        e.persist();
        handleChange(e);
        setFieldTouched(name, true, false);
    };

    const handleSubmit = async e => {
        const {
            addEmployeeFailure,
            addEmployeePending,
            addEmployeeSuccess
        } = props;
        e.preventDefault();
        setSubmitting(true);
        addEmployeePending();
        try {
            const employee = {
                name,
                address
            };
            addEmployeeSuccess(employee, employer);
            resetForm();
        } catch (err) {
            addEmployeeFailure();
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            noValidate
            autoComplete="off"
            className="create-new-company__form "
            onSubmit={handleSubmit}
        >
            <TextField
                name="name"
                helperText={touched.name ? errors.name : ""}
                error={Boolean(errors.name)}
                label="Name"
                value={name}
                onChange={change.bind(null, "name")}
                fullWidth
                disabled={listOfCompanies.length <= 0}
            />
            <TextField
                name="address"
                helperText={touched.address ? errors.address : ""}
                error={Boolean(errors.address)}
                label="Address"
                value={address}
                onChange={change.bind(null, "address")}
                fullWidth
                disabled={listOfCompanies.length <= 0}
            />

            <Select
                onChange={e => setFieldValue("employer", e.target.value)}
                onBlur={() => setFieldTouched("employer", true)}
                value={employer}
                displayEmpty
                fullWidth
                disabled={listOfCompanies.length <= 0}
            >
                <MenuItem value="" disabled>
                    Select Employer
                </MenuItem>
                {listOfCompanies &&
                    listOfCompanies.map(name => (
                        <MenuItem value={name} key={name}>
                            {name}
                        </MenuItem>
                    ))}
            </Select>
            <Button
                type="submit"
                variant="outlined"
                color="primary"
                disabled={!isValid || listOfCompanies.length <= 0}
            >
                Salva
            </Button>
        </form>
    );
};

const mapDispatchToProps = dispatch => ({
    addEmployeePending: () => dispatch(addEmployeePending()),
    addEmployeeSuccess: (employee, company) =>
        dispatch(addEmployeeSuccess(employee, company)),
    addEmployeeFailure: () => dispatch(addEmployeeFailure)
});

const mapStateToProps = state => ({
    listOfCompanies: state.companies.companyList.map(
        company => company.companyDetails.name
    )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);
