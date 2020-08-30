import React, { Component } from 'react';
import { auth } from '../firebase';
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});
const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};
class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = (event) => {
        const { passwordOne } = this.state;
        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        event.preventDefault();
    }
    render() {
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state;
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';
        return (
            <div className="container">
                <h1 className="my-3 text-center">Update Password</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            value={passwordOne}
                            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                            type="password"
                            placeholder="New Password"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            value={passwordTwo}
                            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                            type="password"
                            placeholder="Confirm New Password"
                            className="form-control"
                        />
                    </div>
                    <button className="btn btn-block btn-success" disabled={isInvalid} type="submit">
                        Update My Password
            </button>
                    {error && <p>{error.message}</p>}
                </form>
            </div>
        );
    }
}
export default PasswordChangeForm;