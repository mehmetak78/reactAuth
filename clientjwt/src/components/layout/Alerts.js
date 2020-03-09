import React, {Fragment, useContext} from 'react';
import AlertContext from "../../context/alert/AlertContext"

const Alerts = () => {

    const alertContext = useContext(AlertContext);

    const getAlerts = (
        alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"> {alert.msg} </i>
            </div>
        ))
    );

    return (
        <Fragment>
            {getAlerts}
        </Fragment>
    );
};

export default Alerts;
