import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
    const {userId} = useSelector((state) => state.auth);

    useEffect(() => {
        if(userId){
            localStorage.setItem('userId', userId);
        }
    }, [userId]);

    if(localStorage.getItem('userId')){
        return <Navigate to={`/profile/${localStorage.getItem('userId')}`} />;
    }

    return (
        <div className={styles.homeContainer}>
            <div className={styles.welcomeContent}>
                <h1 className={styles.welcomeTitle}>Welcome to our Social Network</h1>
                <p className={styles.welcomeText}>Connect with friends and the world around you.</p>
                <img 
                    className={styles.welcomeImage} 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlS6rSm_1TBsHslnwpOEZkt57vWs9EgN_MIg&s" 
                    alt="People connecting" 
                />
            </div>
        </div>
    );
};

export default HomePage;