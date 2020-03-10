import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS
} from "../types";

export default (state, action) => {
    console.log("AuthReducer:action.type:"+action.type);
    switch (action.type) {
        case USER_LOAD_SUCCESS:
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload.user,
                loading: false
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case USER_LOAD_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            };
        default:
            return state;
    }
};
