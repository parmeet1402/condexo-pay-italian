import {
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    CREATE_COMPANY_FAILURE,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILURE
} from "./types";

export const createCompanyPending = () => ({
    type: CREATE_COMPANY_REQUEST
});

export const createCompanySuccess = company => ({
    type: CREATE_COMPANY_SUCCESS,
    payload: company
});

export const createCompanyFailure = () => ({
    type: CREATE_COMPANY_FAILURE
});

export const addEmployeePending = () => ({
    type: ADD_EMPLOYEE_REQUEST
});

export const addEmployeeSuccess = (employee, company) => ({
    type: ADD_EMPLOYEE_SUCCESS,
    payload: employee,
    company
});

export const addEmployeeFailure = () => ({
    type: ADD_EMPLOYEE_FAILURE
});
