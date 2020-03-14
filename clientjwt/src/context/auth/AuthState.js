import React, {useReducer, useContext} from "react";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import AlertContext from "../alert/AlertContext";

import axios from "axios";

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

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: false,
        user: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    // Load User
    const loadUser = async () => {
        if (localStorage.token) {
            axios.defaults.headers.common["x-auth-token"] = localStorage.token;
            try {
                const res = await axios.get("/authjwt/getuser");
                dispatch({type: USER_LOAD_SUCCESS, payload: {...res.data, token: localStorage.token}});
            } catch (err) {
                dispatch({type: USER_LOAD_FAIL, payload: err.response.data.message});
            }
        }
    };

    // Register User
    const register = async (formData) => {
        try {
            const res = await axios.post('/authjwt/register', formData);
            axios.defaults.headers.common["x-auth-token"] = res.data.token;
            dispatch({type:REGISTER_SUCCESS, payload: res.data});
        }catch(err) {
            setAlert(err.response.data.message,"danger");
            dispatch({type:REGISTER_FAIL, payload: err.response.data.message});
        }
    };

    // Login User
    const login = async (formData) => {
        try {
            const res = await axios.post('/authjwt/login', formData);
            axios.defaults.headers.common["x-auth-token"] = res.data.token;
            dispatch({type:LOGIN_SUCCESS, payload: res.data});
        }catch(err) {
            setAlert(err.response.data.message,"danger");
            dispatch({type:LOGIN_FAIL, payload: err.response.data.message});
        }
    };
    // Logout User
    const logout = () => {
        try {
            delete axios.defaults.headers.common["x-auth-token"];
            dispatch({type: LOGOUT_SUCCESS});
        }catch(err) {
            setAlert(err.response.data.message,"danger");
            dispatch({type:LOGOUT_FAIL, payload: err.response.data.message});
        }
    };

    return <AuthContext.Provider
        value={
            {
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                register,
                loadUser,
                login,
                logout
            }
        }>
        {props.children}
    </AuthContext.Provider>
};

export default AuthState;
