import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
} from "../types";

export default (state, action) => {
    switch (action.type) {
        case USER_LOAD_SUCCESS:
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case USER_LOAD_FAIL:
        case LOGOUT_SUCCESS:
        case LOGOUT_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };

        default:
            return state;
    }
};
