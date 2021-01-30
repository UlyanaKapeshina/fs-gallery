import Axios from 'axios';
const instance = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 5000,
});

export const api = {
  getUsers() {
    return instance.get(`users`).then((response) => response.data);
  },
  getUser(id, isAuth, userId) {
    if (userId === '00') {
      return Promise.resolve({ name: 'Users albums' });
      // return new Promise((resolve) => {
      //   resolve({
      //     name: 'Users albums',
      //   });
      // });
    } else if (isAuth) {
      return Promise.resolve({ name: 'My albums' });
      // return new Promise((resolve) => {
      //   resolve({
      //     name: 'My albums',
      //   });
      // });
    } else {
      return instance.get(`users/${id}`).then((response) => response.data);
    }
  },
  getAlbums(userId, isAuth) {
    if (userId === '00') {
      return Axios.get(`http://localhost:8080/albums`).then((response) => {
        return response.data.data;
      });
    } else {
      return instance.get(`users/${userId}/albums`).then((response) => response.data);
    }
  },
  getPhotos(albumId, userId, isAuth) {
    if (userId === '00') {
      return Axios.get(`http://localhost:8080/photos/${albumId}`).then((response) => response.data.data);
    }
    if (isAuth) {
      return Axios.get(`http://localhost:8080/photos/${albumId}`).then((response) => response.data.data);
    }
    return instance.get(`albums/${albumId}/photos`).then((response) => response.data);
  },
  getAlbum(albumId, userId, isAuth) {
    if (userId === '00') {
      return Axios.get(`http://localhost:8080/albums/${albumId}`).then((response) => {
        return response.data.data;
      });
    } else {
      return instance.get(`albums/${albumId}`).then((response) => response.data);
    }
  },

  getPhoto(id) {
    return instance.get(`photos/${id}`).then((response) => response.data);
  },
  addAlbum(data) {
    const album = {
      title: data,
    };
    return Axios.post(`http://localhost:8080/albums`, album).then((response) => response);
  },
  addPhoto(title, file, albumId) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('photo', file);
    formData.append('albumId', albumId);
    return Axios.post(`http://localhost:8080/photos`, formData).then((response) => response);
  },
  removeAlbum(id) {
    return Axios.delete(`http://localhost:8080/albums/${id}`).then((response) => response);
  },
};
