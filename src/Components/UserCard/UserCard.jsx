import React from 'react';
import './UserCard.css';
import userImg from '../../assets/user.png';
import { NavLink } from 'react-router-dom';

const UserCard = ({user}) => {
    return (
        <div className='user'>
            <NavLink to={`/profile/${user?.id}`}>
                <h2>{user?.name}</h2>
            </NavLink>
            <img className="bari" src={user?.photos?.large || userImg} alt="User" />
            <button className="flw">Follow</button>
        </div>
    );
};

export default UserCard;