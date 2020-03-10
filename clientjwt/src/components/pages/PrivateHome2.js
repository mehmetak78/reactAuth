import React, {useEffect, useState} from 'react';
import axios from "axios";


const PrivateHome2 = props => {

    const [message, setMessage] = useState("");
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get('/admin/adminHome');
                setMessage(res.data);
                console.log(res.data);
            }
            catch(err) {
                console.log(err.message);
            }

        }
        fetchData();

        //eslint-disable-next-line
    }, []);

    return (
        <div className="grid-1">

            <h1>Private Home Page 2</h1>
            <p>{message}</p>
        </div>
    );
};


export default PrivateHome2;
