import Axios from 'axios';
const instance = Axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 5000,
});
const currentUserId = '1000';

export const api = {
  getUsers() {
    const usersFromLocalhost = Axios.get(`http://localhost:8080/users`);
    const usersFromJsonplaceholder = instance.get(`users`);
    return Axios.all([usersFromLocalhost, usersFromJsonplaceholder]).then((response) => {
      const [dataFromLocalhost, dataFromJsonplaceholder] = response;
      return [...dataFromLocalhost.data, ...dataFromJsonplaceholder.data];
    });
  },
  getUser(id, isAuth, userId) {
    if (userId === currentUserId) {
      return Promise.resolve({ name: 'Users albums', id: Number(currentUserId) });
    } else if (isAuth) {
      return Promise.resolve({ name: 'My albums', id: Number(currentUserId) });
    } else {
      return instance.get(`users/${id}`).then((response) => response.data);
    }
  },
  getAlbums(userId, isAuth) {
    if (userId === currentUserId) {
      return Axios.get(`http://localhost:8080/users/${userId}/albums`).then((response) => {
        return response.data.data;
      });
    } else {
      return instance.get(`users/${userId}/albums`).then((response) => response.data);
    }
  },
  getPhotos(albumId, userId, isAuth) {
    if (userId === currentUserId) {
      return Axios.get(`http://localhost:8080/albums/${albumId}/photos`).then((response) => response.data.data);
    }
    if (isAuth) {
      return Axios.get(`http://localhost:8080/albums/${albumId}/photos`).then((response) => response.data.data);
    }
    return instance.get(`albums/${albumId}/photos`).then((response) => response.data);
  },
  getAlbum(albumId, userId, isAuth) {
    if (userId === currentUserId) {
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
  addAlbum(data, userId) {
    const album = {
      title: data,
    };
    return Axios.post(`http://localhost:8080/users/${userId}/albums`, album).then((response) => response);
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
  removePhoto(id) {
    return Axios.delete(`http://localhost:8080/photos/${id}`).then((response) => response);
  },
};
