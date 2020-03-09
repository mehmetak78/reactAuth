import React, {useState, useContext, useEffect} from 'react';


import AuthContext from "../../context/auth/AuthContext";

const Login = props => {

    const [user, setUser] = useState({
                                         email: "",
                                         password: "",
                                     });
    const {email, password} = user;

    const authContext = useContext(AuthContext);

    const {login, error,  isAuthenticated} = authContext;
    useEffect(() => {
        if (isAuthenticated) {
            props.history.push("/");
        }
    // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]); // Dependency _> when the error isAuthenticated or props.history is changed

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    };

    const onSubmit = e => {
        e.preventDefault();
        login({
                  username:email,
                  password
              });
    };

    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
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
        </div>
    );
};

export default Login;
