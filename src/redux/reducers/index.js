import { combineReducers } from "redux";
import CommonReducer from './common';
import ContentReducer from './contentManagement';
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    CommonReducer,
    form: formReducer,
    ContentReducer
});

export default rootReducer;
