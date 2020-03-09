import React, {useContext} from 'react';
import AlertContext from "../../context/alert/AlertContext"

const Alerts = () => {

    const alertContext = useContext(AlertContext);

    console.log("Alerts");
    console.log(alertContext.alerts);

    return (
        alertContext.alerts.length > 0 &&
        alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"> {alert.msg} </i>
            </div>
        ))
    );
};

export default Alerts;
