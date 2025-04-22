import React from 'react';
import styles from './PhotoUpload.module.css';

const PhotoUpload = ({ onChange }) => {
  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        id="photo-upload"
        accept="image/*"
        onChange={onChange}
        className={styles.fileInput}
      />
      <label htmlFor="photo-upload" className={styles.uploadButton}>
        Change Photo
      </label>
    </div>
  );
};

export default PhotoUpload;