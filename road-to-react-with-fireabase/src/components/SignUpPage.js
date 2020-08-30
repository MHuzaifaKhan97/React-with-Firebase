import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) => {
    return (
        <div>
            <h1>Sign Up</h1>
            <SignUpForm history={history} />
        </div>

    )
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE }
    }
    onSubmit = (event) => {

        event.preventDefault();
        const { username, passwordOne, email } = this.state;
        const { history } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your own accessible Firebase Database too
                console.log("AuthUser : "+authUser)
                db.doCreateUser(authUser.user.uid, username, email)
                    .then(() => {
                        this.setState(() => ({ ...INITIAL_STATE }));
                        history.push(routes.HOME);
                        console.log(this.state.INITIAL_STATE)
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });
            })
            .catch(error => {
                this.setState(byPropKey('error', console.error));
            })
    }

    render() {
        const { username, email, passwordOne, passwordTwo, error } = this.state;
        const isInvalid = passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === '';
        return (
            <form onSubmit={this.onSubmit}>
                <input
                    value={username}
                    placeholder="Full Name"
                    type="text"
                    onChange={(e) => this.setState(byPropKey('username', e.target.value))}
                />
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                />
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button type="submit" disabled={isInvalid}>
                    Sign Up
                </button>
                {error && <p>{error.message}</p>}
            </form>
        )
    }

}
const SignUpLink = () => {
    return (
        <p>Don't Have an account?
            {''}
            <Link to={routes.SIGN_UP}>Sign Up</Link>
        </p>
    )
}

export default withRouter(SignUpPage);
export {
    SignUpForm,
    SignUpLink,
};