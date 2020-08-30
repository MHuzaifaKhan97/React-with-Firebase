import { observable, action } from 'mobx';

class UserStore {
    users = [];
    constructor(rootStore) {
        this.rootStore = rootStore;
    }
    setUsers = users => {
        this.users = users;
    }
}
export default UserStore;