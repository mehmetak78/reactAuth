import React, { useEffect} from 'react';


const PrivateHome2 = props => {


    useEffect(() => {
        //authContext.loadUser();
        //eslint-disable-next-line
    }, []);                         // Dependency _> when the component is loaded.

    return (
        <div className="grid-2">

            <h1>Private Home Page 2</h1>

        </div>
    );
};


export default PrivateHome2;
