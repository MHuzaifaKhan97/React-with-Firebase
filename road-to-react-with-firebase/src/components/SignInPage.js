import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as routes from '../constants/routes';
import { SignUpLink } from './SignUpPage';
import { PasswordForgetLink } from './PasswordForgetPage';
import { auth } from '../firebase';
import '../App.css';


const SignInPage = ({ history }) => {
    return (
        <div className="signin-container">
            <h1>Sign In</h1>
            <SignInForm history={history} />
            <PasswordForgetLink />
            <SignUpLink />
        </div>
    );
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};


class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { history } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                history.push(routes.HOME);
            })
            .catch((error) => {
                this.setState(byPropKey('error', error));
            })
    }

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
           <div className="container">
                <div className="col-md-6 offset-md-3">
                <form onSubmit={this.onSubmit}>
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
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="Password"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <button disabled={isInvalid} className="btn btn-outline-primary btn-block" type="submit">
                        Sign In
                    </button>
                </div>
                <small style={{color:'red'}}>{error && <p>{error.message}</p>}</small>
            </form>
                </div>
           </div>
        );
    }
}
export default withRouter(SignInPage);