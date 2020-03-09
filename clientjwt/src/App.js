import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/pages/About";

import './App.css';
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateHome from "./components/pages/PrivateHome";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
    setAuthToken(localStorage.token)
}

function App() {
  return (
      <AuthState>
          <AlertState>
              <Router>
                  <Fragment>
                      <Navbar/>
                      <div className="container">
                          <Alerts/>
                          <Switch>
                              <Route exact path='/about' component={About} />
                              <Route exact path='/register' component={Register} />
                              <Route exact path='/login' component={Login} />
                              <PrivateRoute path='/' component={PrivateHome} />
                          </Switch>
                      </div>
                  </Fragment>
              </Router>
          </AlertState>
      </AuthState>
  );
}

export default App;
