import React from 'react';
import AuthUserContext from './AuthUserContext';
import { PasswordForgetForm } from './PasswordForgetPage';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';

const AccountPage = ({ sessionStore }) =>
    <AuthUserContext.Consumer>
        {authUser =>
            <div>
                <h1>Account: {sessionStore.authUser.email}</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        }
    </AuthUserContext.Consumer>

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    inject('sessionStore'),
    observer
)(AccountPage);