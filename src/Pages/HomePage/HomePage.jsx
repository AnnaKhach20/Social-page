import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './HomePage.css';

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
        <div className="home-container">
            <h1>Welcome to our Social Network</h1> 
            <img className='welcome-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlS6rSm_1TBsHslnwpOEZkt57vWs9EgN_MIg&s" alt="Welcome" />
        </div>
    );
};

export default HomePage;