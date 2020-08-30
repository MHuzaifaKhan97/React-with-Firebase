import React from 'react';
import { Link } from 'react-router-dom';
import SignOut from './SignOut';
import * as routes from '../constants/routes';
import { connect } from 'react-redux';

const Navigation = ({ authUser }) => {
    return (
        <div>
            {authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </div>
    )
}
const NavigationAuth = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand text-white" href="#">React Firebase</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link to={routes.HOME} style={{color:'white',fontWeight:'bold',padding:'0px 10px'}}>Home </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to={routes.ACCOUNT}  style={{color:'white',fontWeight:'bold',padding:'0px 10px'}} >Account </Link>
                    </li>
                    <li className="nav-item active">
                        <Link to={routes.LANDING}  style={{color:'white',fontWeight:'bold',padding:'0px 10px'}} >Landing </Link>
                    </li>
                    <li><SignOut /></li>
                </ul>
            </div>
        </nav>
    )
}
const NavigationNonAuth = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">React Firebase</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link to={routes.SIGN_IN} style={{color:'white',fontWeight:'bold',padding:'0px 10px'}} >Sign In</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to={routes.LANDING} style={{color:'white',fontWeight:'bold',padding:'0px 10px'}}>Landing</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});
export default connect(mapStateToProps)(Navigation);


