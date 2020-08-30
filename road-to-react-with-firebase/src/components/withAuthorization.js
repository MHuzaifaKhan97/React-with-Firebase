import React from 'react';
import { withRouter } from 'react-router-dom';
import AuthUserContext from './AuthUserContext';
import { firebase } from '../firebase';
import * as routes from '../constants/routes';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const withAuthorization = (authCondition) => (Component) => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                if (!authCondition(authUser)) {
                    this.props.history.push(routes.SIGN_IN);
                }
            });
        }
        render() {
            return this.props.authUser ? <Component /> : null;
        }
    }
    const mapStateToProps = (state) => ({
        authUser: state.sessionState.authUser,
    });
    return compose(
        withRouter,
        connect(mapStateToProps),
    )(WithAuthorization);
}
export default withAuthorization;