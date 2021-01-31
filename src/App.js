import React, { useState } from 'react';
import './App.css';
import PhotosContainer from './components/Photos/PhotosContainer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Switch, Redirect, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import AlbumsContainer from './components/Albums/AlbumsContainer';
import UserContext from './contexts/user-context.js';
const currentUserId = '1000';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const changeAuth = () => {
    setIsAuth(!isAuth);
  };

  return (
    <UserContext.Provider value={{isAuth, id: currentUserId}}>
    <div className='App'>
      <Header  changeAuth={changeAuth} />
      <section className='main'>
        <Switch>
          <Redirect exact from='/' to='/users' />
          <Route exact path='/users' component={() => <UsersContainer   />} />
          <Route exact path='/users/:userId/albums' component={() => <AlbumsContainer  />} />
          <Route
            exact
            path='/users/:userId/albums/:albumId/photos/:photoId?'
            component={(history) => <PhotosContainer  history={history} />}
          />
        </Switch>
      </section>
      <Footer />
    </div>
    </UserContext.Provider>
  );
};

export default App;
