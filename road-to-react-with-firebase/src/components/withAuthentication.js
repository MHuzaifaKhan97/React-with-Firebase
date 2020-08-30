import React from 'react';
import { firebase } from '../firebase';
// import AuthUserContext from './AuthUserContext';
import { connect } from 'react-redux';
import { inject } from 'mobx-react';

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        state = { authUser: null }

        componentDidMount() {
            const { sessionStore } = this.props;
            // const { onSetAuthUser } = this.props;
            firebase.auth.onAuthStateChanged((authUser) => {
                // authUser ? onSetAuthUser(authUser) : onSetAuthUser(null);
                authUser ? sessionStore.setAuthUser(authUser)
                : sessionStore.setAuthUser(null);
        })
    }
    render() {
        // const { authUser } = this.state;
        return inject('sessionStore')(WithAuthentication);
    }
}
const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch({ type: 'AUTH_USER_SET', authUser }),
});
return connect(null, mapDispatchToProps)(WithAuthentication);
}
export default withAuthentication;