import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {firebase} from './firebase';

import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import PasswordForgetPage from './components/PasswordForgetPage';
import HomePage from './components/HomePage';
import AccountPage from './components/AccountPage';
import * as routes from './constants/routes';
import withAuthentication from './components/withAuthentication';

const App = () => {
    return (
      <Router>
        <div>
          <Navigation />
          <hr />
          <Route exact path={routes.LANDING} component={() => <LandingPage />} />
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
          <Route exact path={routes.PASSWORD_FORGOT} component={() => <PasswordForgetPage />} />
          <Route exact path={routes.HOME} component={() => <HomePage />} />
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
        </div>
      </Router>
    );
  }


export default withAuthentication(App);
