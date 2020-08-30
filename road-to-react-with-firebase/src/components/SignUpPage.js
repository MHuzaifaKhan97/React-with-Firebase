import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth, db } from '../firebase';
import * as routes from '../constants/routes';
import '../App.css';

const SignUpPage = ({ history }) => {
    return (
        <div className="signup-container">
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
            <div className="container">
                <div className="col-md-6 offset-md-3">
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <input
                    value={username}
                    placeholder="Full Name"
                    type="text"
                    onChange={(e) => this.setState(byPropKey('username', e.target.value))}
                    className="form-control"
                />
                </div>
                <div className="form-group">
                <input
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                    className="form-control"
                />
                </div>
                <div className="form-group">
                <input
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    type="password"
                    placeholder="Password"
                    className="form-control"
                />
                </div>
                <div className="form-group">
                <input
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                />
                </div>
                <div className="form-group">
                <button type="submit" disabled={isInvalid} className="btn btn-outline-primary btn-block">
                    Sign Up
                </button>
                </div>
                <small style={{color:'red'}}>{error && <p>{error.message}</p>}</small>
            </form>
                </div>
            </div>
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