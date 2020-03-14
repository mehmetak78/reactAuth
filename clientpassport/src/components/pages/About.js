import React from 'react';
import { NavLink } from 'react-router-dom'


const About = props => {
    return (
        <div>
            <h1>About This Page</h1>
            <p className="my-1">
                This is a React app sample using OAuth
            </p>
            <p className="bg-dark p">
                <strong>Version:</strong>1.0.0
            </p>


                <NavLink to="/home">Home</NavLink>

        </div>
    );
};

export default About;
