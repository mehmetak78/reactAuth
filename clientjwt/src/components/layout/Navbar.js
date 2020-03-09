import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";


const Navbar = props => {
    const {title, icon} = props;
    const authContext = useContext(AuthContext);
    const {isAuthenticated, logout, user} = authContext;

    const onLogout = () => {
        logout();
    };

    const authLinks = (
        <Fragment>
            <li> Hello {user && user.name} </li>
            <li>
                <a onClick={onLogout} href="#"> <i className="fas fa-sign-out-alt"/> <span className="hide-sm"> Logout</span></a>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </Fragment>
    );


    return (
        <div>
            <div className="navbar bg-primary">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/home2">Home2</Link></li>
                <h1>
                    <i className={icon}/> {title}
                </h1>
                <ul>
                    {isAuthenticated?authLinks:guestLinks}
                </ul>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
};

Navbar.defaultProps = {
    title: "JWT ReactAuth",
    icon : "fas fa-key"
};

export default Navbar;


