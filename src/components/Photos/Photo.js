import React, {useState, useEffect} from 'react';
import {ReactComponent as Next} from './navigate_next-24px.svg';
import {ReactComponent as Before} from './navigate_before-24px.svg';
import PropTypes from 'prop-types';
import './Photos.css';
function Photo(props) {
  const {photo, photos, closePhotoHandler, changeUrl} = props;
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const isFirst = photos[0].id === currentPhoto.id;
  const isLast = photos[photos.length - 1].id === currentPhoto.id;

  const onLeftClickHandler = () => {
    const photoIndex = photos.findIndex((it) => it.id === currentPhoto.id) - 1;
    const newPhoto = photos[photoIndex] || currentPhoto;
    setCurrentPhoto(newPhoto);
    changeUrl(newPhoto.id);
  };
  const onRightClickHandler = () => {
    const photoIndex = photos.findIndex((it) => it.id === currentPhoto.id) + 1;
    const newPhoto = photos[photoIndex] || currentPhoto;
    setCurrentPhoto(newPhoto);
    changeUrl(newPhoto.id);
  };

  useEffect(() => {
    document.addEventListener('keydown', keyPressHandler, false);

    return () => {
      document.removeEventListener('keydown', keyPressHandler, false);
    };
  }, []);

  const keyPressHandler = (evt) => {
    if (evt.key === 'Escape') {
      closePhotoHandler();
    }
  };

  return (
    <div>
      <div className='shadow' onClick={() => closePhotoHandler()}></div>
      <div className='photo' aria-modal='true'>
        <h2 className='photo_title'>{currentPhoto.title}</h2>
        <div className='photo_inner'>
          <button autoFocus className='modal_close' onClick={closePhotoHandler} aria-label='close modal' />
          <button className='photo_left photo_button' disabled={isFirst} onClick={onLeftClickHandler} aria-label='prev photo'>
            <Before className='photo_arrow' />
          </button>
          <img className=' photo_image' src={currentPhoto.url} alt={currentPhoto.title} />
          <button className='photo_right photo_button' onClick={onRightClickHandler} disabled={isLast} aria-label='next photo'>
            <Next className='photo_arrow' />
          </button>
        </div>
      </div>

      <div className='modal_shadow'></div>
    </div>
  );
}

export default Photo;

Photo.propTypes = {
  photo: PropTypes.shape({
    albumId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    thumbnailUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,

  closePhotoHandler: PropTypes.func.isRequired,
  changeUrl: PropTypes.func.isRequired,
};
