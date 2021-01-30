import React, { useEffect, useState } from 'react';
import { api } from './../../api';
import Preloader from './../Preloader/Preloader';
import ErrorMessage from './../Error/ErrorMessage';
import { useLocation, useParams } from 'react-router-dom';

import './Albums.css';
import Axios from 'axios';

import Albums from './Albums';

function AlbumsContainer(props) {
  const { userId } = useParams();
  let location = useLocation();
  const currentUser = location.state && location.state.user;
  const isAuth = props.isAuth;

  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState(currentUser);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getAlbums = api
      .getAlbums(userId, isAuth)
      .then((result) => {
        setAlbums(result);
      })
      .catch((error) => {
        setError(error);
      });
    const getUser =
      currentUser ||
      api
        .getUser(userId, isAuth, userId)
        .then((result) => {
          // debugger;
          setUser(result);
        })
        .catch((error) => {
          setError(error);
        });
    Axios.all([getAlbums, getUser])
      .then((result) => {
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  const onSubmitHandler = (title) => {
    const addAlbum = api
      .addAlbum(title)
      .then(() => {
        return api
          .getAlbums(userId, isAuth)
          .then((result) => {
            setAlbums(result);
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };
  const onRemoveClick = (id) => {
    setIsLoaded(false);
    api.removeAlbum(id).then(() =>
      {return api
        .getAlbums(userId, isAuth)
        .then((result) => {
          setAlbums(result);
          setIsLoaded(true);
        })
        .catch((error) => {
          setError(error);
          setIsLoaded(true);
        });}
    );
  };

  if (!isLoaded) {
    return <Preloader />;
  } else if (error) {
    return <ErrorMessage message={error.message} />;
  } else if (!albums || !user) {
    return <Preloader />;
  } else if (isLoaded) {
    return <Albums albums={albums} isAuth={isAuth} submit={onSubmitHandler} user={user} onRemoveClick={onRemoveClick} />;
  }
}

export default AlbumsContainer;
