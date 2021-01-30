import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Photo from './Photo';
import PropTypes from 'prop-types';
import './Photos.css';
import { ReactComponent as Before } from './navigate_before-24px.svg';

function Photos(props) {
  const { userId, albumId } = useParams();

  const { photos, title, modal, photo, history, onRemoveClick, submit, isAuth } = props;
  const [isModal, setIsModal] = useState(modal);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(photo);
  const [photoTitle, setPhotoTitle] = useState('');
  // const [isDisabled, setIsDisabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState('');
  const ref = React.createRef();

  const photoKeyPressHandler = (evt, photo) => {
    if (evt.key === 'Enter') {
      photoClickHandler(photo);
      evt.currentTarget.blur();
    }
  };
  const photoClickHandler = (photo) => {
    setCurrentPhoto(photo);
    setIsModal(true);
    changeUrl(photo.id);
  };
  const closePhotoHandler = () => {
    setIsModal(false);
    setCurrentPhoto(null);
    history.history.push(`/users/${userId}/albums/${albumId}/photos`);
  };
  const changeUrl = (id) => {
    history.history.push(`/users/${userId}/albums/${albumId}/photos/${id}`);
  };
  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    if (photoTitle && selectedFile) {
      submit(photoTitle, selectedFile);
      setSelectedFile(null);
      setPhotoTitle('');

      // debugger;
    }
  };
  const clickHandler = () => {
    setIsFormOpen(true);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };
  const onChangeHandler = (evt) => {
    setPhotoTitle(evt.target.value);
  };
  const handleFileInput = (e) => {
    // handle validations
    setSelectedFile(e.target.files[0]);
  };
  const photosList = photos.map((it) => {
    return (
      <li key={it.id} ref={ref} className='photos_items' tabIndex='0' onKeyPress={(evt) => photoKeyPressHandler(evt, it)}>
        <img
          className='photos_img'
          src={it.thumbnailUrl}
          alt={it.title}
          title={it.title}
          onClick={() => photoClickHandler(it)}
          aria-label='open modal'
        />
      </li>
    );
  });

  return (
    <section className='photos'>
      <h2 className='photos_title'>{title}</h2>
      <NavLink
        className='photos_link'
        to={{
          pathname: `/users/${userId}/albums`,
        }}
      >
        <Before />
        go to albums
      </NavLink>
      {isAuth && !isFormOpen && (
        <div>
          <button className='albums_add' onClick={clickHandler}>
            Add photo
          </button>
        </div>
      )}
      {isFormOpen && (
        <form onSubmit={onSubmitHandler} className='photo_form'>
          <label className='photo_label'>
            Set title
            <input className='albums_title-field' type='text' value={photoTitle} onChange={onChangeHandler} />
          </label>
          <label className='photo_label'>
            load photo file
            <input className='photo_file-field' type='file' onChange={handleFileInput} />
          </label>
          <div className='photo_buttons'>
            <button className='photo_submit' type='submit' disabled={!(photoTitle && selectedFile)}>
              Add photo
            </button>
            <button className='photo_cancel' type='button' onClick={closeForm}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {photos.length > 0 && <ul className='photos_list'>{photosList}</ul>}
      {photos.length < 1 && <p>Нет фотографий</p>}
      {isModal && <Photo photo={currentPhoto} photos={photos} closePhotoHandler={closePhotoHandler} changeUrl={changeUrl} />}
    </section>
  );
}

export default Photos;

Photos.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      albumId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      thumbnailUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,

  title: PropTypes.string.isRequired,
  modal: PropTypes.bool.isRequired,
  photo: PropTypes.object,
  history: PropTypes.object.isRequired,
};
