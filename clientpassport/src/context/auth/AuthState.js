import React, {useReducer, useContext} from "react";

import AuthContext from "../../context/auth/AuthContext";
import AlertContext from "../../context/alert/AlertContext";
import AuthReducer from "./AuthReducer";

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
        isAuthenticated: false,
        loading: false,
        user: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const alertContext = useContext(AlertContext);
    const {setAlert} = alertContext;

    // Login User Google
    const loadUser = async () => {
        try {
            const res = await axios.get("/authpassport/getuser");
            dispatch({type: USER_LOAD_SUCCESS, payload: res.data});
        } catch (err) {
            dispatch({type: USER_LOAD_FAIL, payload: err.response.data.message});
        }
    };

    // Local Login User
    const localLogin = async (username, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/authpassport/local/login', {
                username,
                password
            }, config);

            dispatch({type: LOGIN_SUCCESS, payload: res.data});

        }catch(err) {
            setAlert(err.response.data.message,"danger");
            dispatch({type:LOGIN_FAIL, payload: err.response.data.message});
        }
    };

    // Local Login User
    const localRegister = async (username, password, name) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const res = await axios.post('/authpassport/local/register', {
                username,
                password,
                name
            }, config);

            dispatch({type: REGISTER_SUCCESS, payload: res.data});
        } catch(err) {
            setAlert(err.response.data.message,"danger");
            dispatch({type:REGISTER_FAIL, payload: err.response.data.message});
        }
    };

    // Logout User
    const logoutUser = async () => {
        try {
            await axios.get("/authpassport/logout");
            dispatch({type:LOGOUT_SUCCESS});
        } catch(err) {
            setAlert(err.response.data.message,"danger");
            dispatch({type:LOGOUT_FAIL, payload: err.response.data.message});
        }
    };

    return <AuthContext.Provider
        value={
            {
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loadUser,
                localLogin,
                localRegister,
                logoutUser
            }
        }>
        {props.children}
    </AuthContext.Provider>
};

export default AuthState;
