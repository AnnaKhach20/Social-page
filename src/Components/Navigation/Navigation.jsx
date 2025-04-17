import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/reducers/authReducer';
import './Navigation.css';

const Navigation = () => {
    const {isAuth} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="main-nav">
            <div className="nav-logo">Social Network</div>
            <ul>
                <li><NavLink to="/" exact="true">Home</NavLink></li>
                <li><NavLink to="/users">Users</NavLink></li>
                {isAuth 
                    ? <li><button onClick={handleLogout}>Logout</button></li>
                    : <li><NavLink to="/login">Login</NavLink></li>
                }
            </ul>
        </nav>
    );
};

export default Navigation;