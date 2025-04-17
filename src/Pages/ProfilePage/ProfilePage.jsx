import React, { useEffect } from 'react';
import './ProfilePage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileThunk } from '../../store/reducers/profileReducer';
import { SocialAPI } from '../../Api/api';

const ProfilePage = () => {
    const { id } = useParams();
    const { profile } = useSelector((state) => state.profilePage);
    const dispatch = useDispatch();

    const changeProfilePhoto = (e) => {
        const file = e.target.files[0];
        SocialAPI.changePhoto(file)
            .then((res) => console.log(res));
    };

    useEffect(() => {
        dispatch(getProfileThunk(id));
    }, [id, dispatch]);

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={profile?.photos?.large} alt="Profile" className="profile-photo" />
                <input type='file' onChange={changeProfilePhoto} id="photo-upload" />
                <label htmlFor="photo-upload" className="upload-button">Change Photo</label>
            </div>
            <div className="profile-info">
                <h2>{profile?.fullName}</h2>
                <p>{profile?.aboutMe}</p>
            </div>
        </div>
    );
};

export default ProfilePage;