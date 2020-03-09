import React, {Fragment, useContext, useEffect} from 'react';

import AuthContext from "./context/auth/AuthContext";


const AppInit = props => {

    const authContext = useContext(AuthContext);

    const {loadUser} = authContext;

    useEffect(() => {
        loadUser();
        console.log("AppInit : loadUser()")
        //eslint-disable-next-line
    }, []);

    return (
        <Fragment>
        </Fragment>
    );
};


export default AppInit;


