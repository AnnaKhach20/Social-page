import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../../store/reducers/profileReducer';
import { SocialAPI } from '../../api/api';
import styles from './ProfilePage.module.css';
import PhotoUpload from '../../components/profile/PhotoUpload/PhotoUpload';

const ProfilePage = () => {
    const { id } = useParams();
    const { profile } = useSelector((state) => state.profilePage);
    const dispatch = useDispatch();

    const changeProfilePhoto = (e) => {
        const file = e.target.files[0];
        SocialAPI.changePhoto(file)
            .then((res) => {
                console.log(res);
                dispatch(getProfileThunk(id));
            });
    };

    useEffect(() => {
        dispatch(getProfileThunk(id));
    }, [id, dispatch]);

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <img 
                    src={profile?.photos?.large || '/default-avatar.png'} 
                    alt="Profile" 
                    className={styles.profilePhoto} 
                />
                <PhotoUpload onChange={changeProfilePhoto} />
            </div>
            <div className={styles.profileInfo}>
                <h2>{profile?.fullName}</h2>
                <p>{profile?.aboutMe}</p>
                <div className={styles.profileStats}>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>120</span>
                        <span className={styles.statLabel}>Friends</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>45</span>
                        <span className={styles.statLabel}>Posts</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statNumber}>1.2K</span>
                        <span className={styles.statLabel}>Followers</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;