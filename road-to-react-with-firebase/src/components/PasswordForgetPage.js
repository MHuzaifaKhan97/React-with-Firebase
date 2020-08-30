import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';

const PasswordForgetPage = () => {
    return (
        <div>
            <h1>Password Forget</h1>
            <PasswordForgetForm />
        </div>
    )
}
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});
const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetForm extends Component {
    state = { ...INITIAL_STATE };

    onSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;

        auth.doPasswordReset(email)
            .then(() => this.setState({ ...INITIAL_STATE }))
            .catch((error) => this.setState(byPropKey('error', error)));
    }
    render() {
        const { email, error } = this.state;
        const isInvalid = email === '';
        return (
            <div className="container">
                <h1 className="my-3 text-center">Reset Password</h1>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <input
                    value={this.state.email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                    className="form-control"
                />
                </div>
                <button disabled={isInvalid} className="btn btn-block btn-warning" type="submit">
                    Reset My Password
            </button>
                {error && <p>{error.message}</p>}
            </form>
            </div>
        )
    }
}
const PasswordForgetLink = () =>
    <p>
        <Link to="/pw-forget">Forgot Password?</Link>
    </p>
export default PasswordForgetPage;
export {
    PasswordForgetForm,
    PasswordForgetLink,
};