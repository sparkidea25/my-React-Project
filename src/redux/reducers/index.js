import { combineReducers } from "redux";
import CommonReducer from './common';
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    CommonReducer,
    form: formReducer,
});

export default rootReducer;
