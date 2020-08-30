import React from 'react';
import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForgetPage';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const AccountPage = ({ authUser }) =>
    <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </div>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    connect(mapStateToProps)
)(AccountPage);