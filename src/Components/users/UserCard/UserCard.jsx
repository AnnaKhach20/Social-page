import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserCard.module.css';

const UserCard = ({ user, onFollow }) => {
  return (
    <div className={styles.card}>
      <NavLink to={`/profile/${user.id}`} className={styles.cardLink}>
        <div className={styles.avatarContainer}>
          <img 
            src={user.photos.large || '/default-avatar.png'} 
            alt={user.name}
            className={styles.avatar}
          />
          {user.online && <span className={styles.onlineBadge}></span>}
        </div>
        <h3 className={styles.name}>{user.name}</h3>
        <p className={styles.status}>{user.status || 'No status yet'}</p>
      </NavLink>
      <button 
        onClick={() => onFollow(user.id)} 
        className={`${styles.followButton} ${user.followed ? styles.following : ''}`}
      >
        {user.followed ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default UserCard;