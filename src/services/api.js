// a library to wrap and simplify api calls
import apisauce from 'apisauce';

// our "constructor"
const create = (
  baseURL = 'http://condexopay.api.demos.classicinformatics.com/uk/user'
) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //

  const setAuthToken = userAuth => api.setHeader('Authorization', userAuth);

  const removeAuthToken = () => api.deleteHeader('Authorization');

  const checkUsername = username => {
    let url = '/checkUsername';
    return api.post(url, { username });
  };
  const upload = image => {
    const body = new FormData();
    body.append('file', image, image.name);
    let url = '/uploadPhotoId';
    return api.post(url, body);
  };

  const sendEmailOtp = body => {
    let url = '/sendEmailOtp';
    return api.post(url, body);
  };

  const verifyEmailOtp = body => {
    let url = '/verifyEmailOtp';
    return api.post(url, body);
  };
  const completeRegistration = body => {
    let url = ``;
    return api.post(url, body);
  };
  const login = body => {
    let url = `/login`;
    return api.post(url, body);
  };
  const verifyUsernameAndSendForgotPasswordOtp = body => {
    let url = '/forgotPassword';
    return api.post(url, body);
  };
  const sendResetPasswordLink = body => {
    let url = '/sendResetPasswordLink';
    return api.post(url, body);
  };
  const updatePassword = body => {
    let url = '/updatePassword';
    return api.post(url, body);
  };
  const verifyToken = body => {
    let url = `/resetPassword/`;
    return api.post(url, body);
  };
  /* 
  const setAuthToken = userAuth =>
    api.setHeader('Authorization', 'JWT ' + userAuth);

  const removeAuthToken = () => api.deleteHeader('Authorization'); */

  // Avatar APIs

  /* const getAvatar = data => api.get(`/pa/v1/avatar/image/${data}`, null); */

  /* const uploadAvatar = uri => {
    const image = {
      uri: uri.file
      // type: 'image/jpeg',
      // name: 'photo.jpg',
    };

    const body = new FormData();
    body.append('file', image);

    let url = '/pa/v1/avatar';
    return api.post(url, body);
  }; */

  /*   const updateUser = data => api.post('/pa/v1/avatar/update', data); */

  //Filters APIs

  /*   const getFilters = data =>
    api.get(`/fantasy/v1/public/room/filter${data}`, null); */

  //Lobby APIs
  /* 
  const getLobby = data =>
    api.get(`/fantasy/v3/room?state=opened&skip=0&mobileapp=1${data}`, null);

  const getLobbyDetails = data => api.get(`/fantasy/v2/room/${data}`, null); */

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    checkUsername,
    upload,
    sendEmailOtp,
    verifyEmailOtp,
    completeRegistration,
    setAuthToken,
    removeAuthToken,
    login,
    sendResetPasswordLink,
    verifyUsernameAndSendForgotPasswordOtp,
    updatePassword,
    verifyToken
  };
};

// let's return back our create method as the default.
export default {
  create
};
