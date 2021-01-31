import React, { useEffect, useState } from 'react';
import { api } from './../../api';
import Preloader from './../Preloader/Preloader';
import ErrorMessage from './../Error/ErrorMessage';
import Users from './Users';

function UsersContainer(props) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    api
      .getUsers()
      .then((result) => {
        setUsers(result);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  if (!isLoaded) {
    return <Preloader />;
  } else if (error) {
    return <ErrorMessage message={error.message} />;
  } else if (!users) {
    return <Preloader />;
  } else if (isLoaded) {
    return <Users users={users}  />;
  }
}

export default UsersContainer;
