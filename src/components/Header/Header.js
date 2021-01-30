import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = (props) => {
  const changeAuthHandler = () => {
    props.changeAuth();
  };
  return (
    <>
      <header className='header'>
        <NavLink to='/users' className='header_link'>
          <h2 className='header_title'>gallery app</h2>
        </NavLink>
        {<button onClick={changeAuthHandler}>{props.isAuth ? "Log out" : "Log in"}</button>}
      </header>
    </>
  );
};

export default Header;
