import React, { useState } from 'react';
import './App.css';
import PhotosContainer from './components/Photos/PhotosContainer';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Switch, Redirect, Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import AlbumsContainer from './components/Albums/AlbumsContainer';

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const changeAuth = () => {
    setIsAuth(!isAuth);
  };
  return (
    <div className='App'>
      <Header changeAuth={changeAuth} isAuth={isAuth} />
      <section className='main'>
        <Switch>
          <Redirect exact from='/' to='/users' />
          <Route exact path='/users' component={() => <UsersContainer isAuth={isAuth} />} />
          <Route exact path='/users/:userId/albums' component={() => <AlbumsContainer isAuth={isAuth} />} />
          <Route
            exact
            path='/users/:userId/albums/:albumId/photos/:photoId?'
            component={(history) => <PhotosContainer isAuth={isAuth} history={history} />}
          />
        </Switch>
      </section>
      <Footer />
    </div>
  );
};

export default App;
