import React, { useState, useEffect } from 'react';
import { api } from './../../api';
import Preloader from './../Preloader/Preloader';
import ErrorMessage from './../Error/ErrorMessage';
import { NavLink, useParams } from 'react-router-dom';
import Album from './Album';
import './Albums.css';

function AlbumContainer(props) {
  const { albumId, title, isAuth, onRemoveClick } = props;
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    api
      .getPhotos(albumId, userId, isAuth)
      .then((photos) => {
        setPhotos(photos);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded || !photos) {
    return (
      <li key={albumId} className='albums_item'>
        <NavLink
          to={{
            pathname: `albums/${albumId}/photos`,
          }}
          aria-label='open photos'
        >
          <img className='album_img' src='' />
          <div className='album_info'>
            <p className='album_name'>{title}</p>
            <Preloader className='album_preloader' />
          </div>
        </NavLink>
      </li>
    );
  } else if (error) {
    return (
      <div className='error_container'>
        <ErrorMessage message={error.message} />
      </div>
    );
  } else if (isLoaded) {
    return <Album photos={photos} albumId={albumId} title={title} isAuth={isAuth} onRemoveClick={onRemoveClick} />;
  }
}

export default AlbumContainer;
