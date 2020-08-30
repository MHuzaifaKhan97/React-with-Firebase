import React from 'react';
import {auth} from '../firebase';

const SignOut = () => {
    return(
        <button type="button" className="btn btn-danger btn-small" onClick={auth.doSignOut} >Sign Out</button>
    )
}
export default SignOut;