import React, {useReducer} from "react";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import setAuthToken from "../../utils/setAuthToken";

import axios from "axios";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from "../types";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get("/api/auth/currentuser");
            dispatch({type: USER_LOADED, payload: res.data});
        } catch (e) {
            dispatch({type: AUTH_ERROR})
        }
    };

    // Register User
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/auth/register', formData, config);
            dispatch({type:REGISTER_SUCCESS, payload: res.data});
            await loadUser();
        }catch(err) {
            dispatch({type:REGISTER_FAIL, payload: err.response.data.msg});
        }
    };

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        console.log("Login");
        try {
            const res = await axios.post('/api/auth/login', formData, config);
            console.log(res.data);
            dispatch({type:LOGIN_SUCCESS, payload: res.data});
            await loadUser();
        }catch(err) {
            dispatch({type:LOGIN_FAIL, payload: err.response.data.msg});
        }
    };
    // Logout User
    const logout = () => {
        dispatch({type:LOGOUT});
    };
    // clear Errors
    const clearErrors = () => {
        dispatch({type:CLEAR_ERRORS});
    };
    return <AuthContext.Provider
        value={
            {
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors
            }
        }>
        {props.children}
    </AuthContext.Provider>
};

export default AuthState;
