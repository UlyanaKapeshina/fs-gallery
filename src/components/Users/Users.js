import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Users.css';

function Users(props) {
  const { users, isAuth } = props;

  const usersList = users.map((it) => {
    return (
      <li className='users_item' key={it.id}>
        <NavLink
          className='users_link'
          to={{
            pathname: `/users/${it.id}/albums`,
            state: {
              user: it,
            },
          }}
          aria-label="open user's albums"
        >
          <p className='users_name'>{it.name}</p>
        </NavLink>
      </li>
    );
  });
  return (
    <section className='users'>
      <h2 className='users_title'>Users</h2>
      <div className='users_item'>
        <NavLink
          className='users_link'
          to={{
            pathname: `/users/00/albums`,
          }}
          aria-label='open my albums'
        >
          <p className='users_name'>{isAuth ? 'My albums' : 'User'}</p>
        </NavLink>
      </div>
      {<ul className='users_list'>{usersList}</ul>}
    </section>
  );
}

export default Users;

Users.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};
