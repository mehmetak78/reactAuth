import React, {useContext, useEffect} from 'react';


import AuthContext from "../../context/auth/AuthContext";

const PrivateHome = props => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, []);                         // Dependency _> when the component is loaded.

    return (
        <div className="grid-2">

            <h1>Private Home Page</h1>

        </div>
    );
};


export default PrivateHome;
