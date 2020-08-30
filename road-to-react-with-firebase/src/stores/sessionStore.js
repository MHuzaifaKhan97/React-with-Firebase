import { observable, action } from 'mobx';

class SessionStore {
    authUser = null;
    constructor(rootStore) {
        this.rootStore = rootStore;
    }
    setAuthUser = authUser => {
        this.authUser = authUser;
    }
}
export default SessionStore;