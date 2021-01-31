import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from './../../contexts/user-context';
import './Header.css';

const Header = (props) => {
  const user = useContext(UserContext);
  const changeAuthHandler = () => {
    props.changeAuth();
  };

  return (
    <>
      <header className='header'>
        <NavLink to='/users' className='header_link'>
          <h2 className='header_title'>gallery app</h2>
        </NavLink>

        <button className="header_button" onClick={changeAuthHandler}>{user.isAuth ? 'Log out' : 'Log in'}</button>
      </header>
    </>
  );
};

export default Header;
