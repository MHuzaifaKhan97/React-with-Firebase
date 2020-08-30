import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) => {
   return db.ref(`users/${id}`).set({
        username,
        email
    });
}
export const onceGetUsers = () => {
    return db.ref('users').once('value');
}