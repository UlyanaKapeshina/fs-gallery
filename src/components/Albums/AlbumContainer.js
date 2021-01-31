import React, { useState, useEffect, useContext } from 'react';
import { api } from './../../api';
import Preloader from './../Preloader/Preloader';
import ErrorMessage from './../Error/ErrorMessage';
import { NavLink, useParams } from 'react-router-dom';
import Album from './Album';
import UserContext from './../../contexts/user-context';
import './Albums.css';

function AlbumContainer(props) {
  const { albumId, title, onRemoveClick } = props;
  const { userId } = useParams();
  const { isAuth } = useContext(UserContext);

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
          <img className='album_img'  alt='image not load' />
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
    return <Album photos={photos} albumId={albumId} title={title} onRemoveClick={onRemoveClick} />;
  }
}

export default AlbumContainer;
