import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const PublicRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated } = authContext;

    return (
        <div>
            <Route
                {...rest}
                render={props =>
                    isAuthenticated  ? (
                        <Redirect to='/privatehome' />
                    ) : (
                        <Component {...props} />
                    )
                }
            />
        </div>
    );
};

export default PublicRoute;
