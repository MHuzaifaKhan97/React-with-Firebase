import React, { Component } from 'react';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';


class HomePage extends Component {

    state = {
        users: null,
    }
    componentDidMount() {
        // const { onSetUsers } = this.props;
        // db.onceGetUsers().then(snapshot =>
        //     onSetUsers(snapshot.val())
        // );
        const { userStore } = this.props;
        db.onceGetUsers().then(snapshot =>
            userStore.setUsers(snapshot.val())
        );
    }
    render() {
        // const { users } = this.props;
        const { users } = this.props.userStore;
        return (
            <div>
                <h1>Home</h1>
                <p>The Home Page is accessible by every signed in user.</p>
                {!!users && <UserList users={users} />}
            </div>
        );
    }
}

const UserList = ({ users }) =>
    <div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>
        {Object.keys(users).map(key =>
            <div key={key}>{users[key].username}</div>
        )}
    </div>

const mapStateToProps = (state) => ({
    users: state.userState.users,
});
const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});


const authCondition = (authUser) => !!authUser;

export default compose(
    withAuthorization(authCondition),
    inject('userStore'),
    observer
)(HomePage);