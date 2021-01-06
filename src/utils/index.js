import { IMAGE_URL } from '../config';
import jsFileDownload from 'js-file-download';
export const isPhone = (username) => {
  let regexPattern = /^07[0-9]{1,9}$/;
  return regexPattern.test(username) ? true : false;
};
export const isEmail = (username) => {
  let regexPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regexPattern.test(username) ? true : false;
};

export const findUsernameType = (username) => {
  let trimmedUsername = username.replace(/ /g, '');
  if (isEmail(trimmedUsername)) {
    return 'email';
  } else if (isPhone(trimmedUsername)) {
    return 'phone';
  } else {
    return 'invalid';
  }
};

export const getImageURL = (imageName) => `${IMAGE_URL}${imageName}`;

//export const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
export const smoothScroll = (ref) =>
  ref.current.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });

export const downloadFile = ({ url, fileName, extension }) => {
  fetch(url, { mode: 'no-cors', response: 'blob' }).then((response) => {
    response
      .arrayBuffer()
      .then((buffer) => jsFileDownload(buffer, `${fileName}.${extension}`));
  });
};

/* 
export const getBaseFrontEndURL = (history) => {
  const {
    location: { pathname },
  } = history;
  console.log(pathname);
  const {
    location: { href: currentURL },
  } = window;
  return currentURL.replace(pathname, '');
};
 */
