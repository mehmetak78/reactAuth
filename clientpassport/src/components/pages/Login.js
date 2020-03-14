import React, {useState, useContext, useEffect} from 'react';

import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Login = props => {

    const [user, setUser] = useState({
                                         email: "",
                                         password: "",
                                     });
    const {email, password} = user;

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {setAlert} = alertContext;
    const {localLogin, error, clearErrors, isAuthenticated} = authContext;
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error === "Invalid Credentials") {
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]); // Dependency _> when the error isAuthenticated or props.history is changed

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    };

    const onSubmit = e => {
        e.preventDefault();
        localLogin(email,password);
    };

    return (
        <div className="form-container">
            <h1 className="text-primary">Account Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} autoComplete="email" required onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} autoComplete="password" required onChange={onChange}/>
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block"/>
            </form>

            <br/>
            <a href="/authpassport/google">
                <i style={{color: "blue"}} className="fab fa-google fa-2x"></i>
            </a>

        </div>
    );
};

export default Login;
