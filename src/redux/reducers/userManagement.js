import { SET_ADMINS_LIST, SET_USERS_LIST } from "../actions";

const initialState = {
    adminsList: [],
    usersList:[],
};

const userManagementReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ADMINS_LIST:
            return{
                ...state,
                adminsList: action.payload,
            };
        case SET_USERS_LIST:
            return{
                ...state,
                usersList: action.payload,
            }
        default:
            return state;
    }
}

export default userManagementReducer;