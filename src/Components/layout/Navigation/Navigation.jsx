import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/reducers/authReducer';
import styles from './Navigation.module.css';

const Navigation = () => {
    const {isAuth} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.navContainer}>
                <NavLink to="/" className={styles.logo}>Social Network</NavLink>
                <ul className={styles.navList}>
                    <li><NavLink to="/" exact="true" className={styles.navLink}>Home</NavLink></li>
                    <li><NavLink to="/users" className={styles.navLink}>Users</NavLink></li>
                    {isAuth 
                        ? <li><button onClick={handleLogout} className={styles.authButton}>Logout</button></li>
                        : <li><NavLink to="/login" className={styles.authButton}>Login</NavLink></li>
                    }
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;