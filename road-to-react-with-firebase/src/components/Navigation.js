import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';
import * as routes from '../constants/routes';
import AuthUserContext from './AuthUserContext';
import { connect } from 'react-redux';
import { inject, observer } from 'mobx-react';
import {compose } from 'recompose';

const Navigation = ({ sessionStore }) =>
    <div>
        {sessionStore.authUser
            ? <NavigationAuth />
            : <NavigationNonAuth />
        }
    </div>

const NavigationAuth = () =>
    <ul>
        <li> <Link to={routes.LANDING} >Landing</Link> </li>
        <li> <Link to={routes.HOME} >Home</Link> </li>
        <li> <Link to={routes.ACCOUNT} >Account</Link> </li>
        <li><SignOut /></li>
    </ul>

const NavigationNonAuth = () =>
    <ul>
        <li> <Link to={routes.SIGN_IN} >Sign In</Link> </li>
        <li> <Link to={routes.LANDING} >Landing</Link> </li>
    </ul>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

export default compose(
    inject('sessionStore'),
    observer
)(Navigation);