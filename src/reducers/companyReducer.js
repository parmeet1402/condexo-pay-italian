// import types
import {
    CREATE_COMPANY_REQUEST,
    CREATE_COMPANY_SUCCESS,
    CREATE_COMPANY_FAILURE,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    ADD_EMPLOYEE_FAILURE
} from "../actions/types";

const initialState = {
    companyList: [],
    isLoading: false,
    isLoaded: false
};
export default function(state = initialState, action) {
    switch (action.type) {
        case CREATE_COMPANY_REQUEST:
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };
        case CREATE_COMPANY_SUCCESS:
            return {
                isLoading: false,
                isLoaded: true,
                companyList: [...state.companyList, action.payload]
            };
        case CREATE_COMPANY_FAILURE:
            return {
                isLoading: false,
                isLoaded: false,
                companyList: []
            };
        case ADD_EMPLOYEE_REQUEST:
            return {
                ...state,
                isLoading: true,
                isLoaded: false
            };
        case ADD_EMPLOYEE_SUCCESS:
            let deletedItem, deletedIndex;
            const newCompanyList = state.companyList.filter(
                (value, index, arr) => {
                    if (value.companyDetails.name !== action.company) {
                        return value;
                    } else {
                        deletedItem = value;
                        deletedIndex = index;
                        return null;
                    }
                }
            );
            return {
                isLoading: false,
                isLoaded: true,
                companyList: [
                    ...newCompanyList.slice(0, deletedIndex),
                    {
                        ...deletedItem,
                        employees: [...deletedItem.employees, action.payload]
                    },
                    ...newCompanyList.slice(deletedIndex)
                ]
            };
        case ADD_EMPLOYEE_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLoaded: false
            };
        default:
            return state;
    }
}
