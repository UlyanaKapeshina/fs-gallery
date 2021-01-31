import React, { useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ReactComponent as Before } from './../Photos/navigate_before-24px.svg';
import AlbumContainer from './AlbumContainer';
import PropTypes from 'prop-types';
import UserContext from './../../contexts/user-context';
import './Albums.css';

function Albums(props) {
  const { albums, submit, user, onRemoveClick } = props;
  const { isAuth, id } = useContext(UserContext);
  const { userId } = useParams();

  const isCurrentUser = Number(userId) === id;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    submit(title);
  };

  const albumsList = albums.map((it) => {
    return <AlbumContainer albumId={it.id} title={it.title} key={it.id} onRemoveClick={onRemoveClick} />;
  });

  const clickHandler = () => {
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };

  const onChangeHandler = (evt) => {
    setTitle(evt.target.value);
  };

  return (
    <section className='albums'>
      <h2>{user.name}</h2>

      <NavLink
        className='albums_back-link'
        to={{
          pathname: `/users`,
        }}
      >
        <Before />
        go to users
      </NavLink>
      {isAuth && isCurrentUser && !isFormOpen && (
        <div>
          <button className='albums_add' onClick={clickHandler}>
            Create album
          </button>
        </div>
      )}
      {isFormOpen && (
        <form onSubmit={onSubmitHandler}>
          <label className='albums_label'>
            Set title
            <input className='albums_title-field' type='text' value={title} onChange={onChangeHandler} />
          </label>

          <button className='albums_submit' type='submit'>
            Create
          </button>
          <button className='albums_cancel' type='button' onClick={closeForm}>
            Cancel
          </button>
        </form>
      )}
      {albums.length > 0 && <ul className='albums_list'>{albumsList}</ul>}
      {albums.length < 1 && <p>Альбомов нет</p>}
    </section>
  );
}

export default Albums;

Albums.propTypes = {
  albums: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
