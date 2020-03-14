import React, {Fragment} from 'react';

import './App.css';

import PrivateRoute from "./components/routing/PrivateRoute";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alerts";
import PrivateHome1 from "./components/pages/PrivateHome1";
import PrivateHome2 from "./components/pages/PrivateHome2";
import About from "./components/pages/About";
import AppInit from "./components/routing/AppInit";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

const App = () => {
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
                  <PrivateRoute exact path='/privatehome' component={PrivateHome1} />
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/about' component={About} />
                  <PrivateRoute exact path='/home1' component={PrivateHome1} />
                  <PrivateRoute exact path='/home2' component={PrivateHome2} />
                  <PrivateRoute path='/' component={PrivateHome1} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AuthState>
      </AlertState>
  );
};

export default App;

