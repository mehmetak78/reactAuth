import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';

import AuthContext from "../../context/auth/AuthContext";
import {NavLink, Link} from "react-router-dom";


const Navbar = props => {
    const {title, icon} = props;

    const authContext = useContext(AuthContext);

    const {isAuthenticated, logoutUser, user} = authContext;

    const onLogout = () => {
        logoutUser();
    };

    const authLinks = (
        <Fragment>
            <li> Hello  {user && user.name} </li>
            <li>
                <a onClick={onLogout} href="#"> <i className="fas fa-sign-out-alt"/> <span className="hide-sm"> Logout</span></a>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li>
                <NavLink to="/login"> <i className="fas fa-sign-in-alt"></i> <span className="hide-sm">Login</span></NavLink>
                <NavLink to="/register"> <i className="fas fa-user-plus"></i> <span className="hide-sm">Register</span></NavLink>
            </li>

        </Fragment>
    );

    return (
        <div>
            <div className="navbar bg-primary">
                <h1>
                    <i className={icon}/> {title}
                </h1>
                <Link to="/home1">Home1 </Link>
                <Link to="/home2">Home2</Link>
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
    title: "Passport ReactAuth",
    icon : "fas fa-key"
};

export default Navbar;


