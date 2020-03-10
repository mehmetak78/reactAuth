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
import PrivateHome2 from "./components/pages/PrivateHome2";
import Alerts from "./components/layout/Alerts";
import AppInit from "./AppInit";

function App() {
  return (
      <AlertState>
          <AuthState>
              <Router>
                  <Fragment>
                      <AppInit/>
                      <Navbar/>
                      <div className="container">
                          <Alerts/>
                          <Switch>
                              <Route exact path='/about' component={About} />
                              <Route exact path='/register' component={Register} />
                              <Route exact path='/login' component={Login} />
                              <PrivateRoute exact path='/home2' component={PrivateHome2} />
                              <PrivateRoute path='/' component={PrivateHome} />
                          </Switch>
                      </div>
                  </Fragment>
              </Router>
          </AuthState>
      </AlertState>
  );
}

export default App;
