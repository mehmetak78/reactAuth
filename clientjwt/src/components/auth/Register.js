import React, {useState, useContext, useEffect} from 'react';

import AlertContext from "../../context/alert/AlertContext";
import AuthContext from "../../context/auth/AuthContext";

const Register = props => {

    const [user, setUser] = useState({
                                         name: "",
                                         email: "",
                                         password: "",
                                         password2: ""
                                     });
    const {name, email, password, password2} = user;

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {setAlert} = alertContext;
    const {register, error, clearErrors, isAuthenticated} = authContext;
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
        if (error === "User Already Exists") {
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

        if (password !== password2) {
            setAlert("Password do not match", "danger")
        } else {
            register({
                         name,
                         username:email,
                         password
                     });
        }
    };

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} autoComplete="username" required onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email} autoComplete="email" required onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} autoComplete="password" required minLength="2" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" value={password2} autoComplete="password" onChange={onChange}/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block"/>
            </form>
        </div>
    );
};

export default Register;
