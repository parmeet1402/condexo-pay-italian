import { combineReducers } from "redux";
// Import all reducers
import authReducer from "./authReducer";
import companyReducer from "./companyReducer";
export default combineReducers({
    auth: authReducer,
    companies: companyReducer
});
