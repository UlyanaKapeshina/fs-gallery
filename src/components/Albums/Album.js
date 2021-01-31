import React, { useState, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from './../../contexts/user-context';
import './Albums.css';
function Album(props) {
  const { photos, albumId, title, onRemoveClick } = props;
  const { userId } = useParams();
  const isAuth = useContext(UserContext).isAuth;
  const isCurrentUser = Number(userId) === Number(useContext(UserContext).id);
  const [isFocus, setIsFocus] = useState(false);

  const onMouseOver = () => {
    setIsFocus(true);
  };
  const onMouseLeave = () => {
    setIsFocus(false);
  };

  const url = `albums/${albumId}/photos`;
  const shortTitle = title.length > 16 ? `${title.slice(0, 16)}...` : title;
  const fullTitle = isFocus ? title : shortTitle;
  let src = '';
  if (photos.length > 0) {
    src = photos[0] && photos[0].thumbnailUrl ? photos[0].thumbnailUrl : '';
  }

  return (
    <li key={albumId} className='albums_item'>
      <NavLink
        className='albums_link'
        to={{
          pathname: url,
          state: {
            currentPhotos: photos,
            currentTitle: title,
          },
        }}
      >
        {src && <img className='album_img' src={src} alt={title} />}
        <div className='album_info' onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
          <p className='album_name'>{fullTitle}</p>
          <p className='album_count'>{photos.length}</p>
        </div>
      </NavLink>
      {isAuth && isCurrentUser && (
        <button className='album_removeButton' onClick={() => onRemoveClick(albumId)}>
          х
        </button>
      )}
    </li>
  );
}

export default Album;

Album.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      albumId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  albumId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};
