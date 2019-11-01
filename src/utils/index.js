export const isPhone = username => {
  let regexPattern = /^07[0-9]{1,9}$/;
  return regexPattern.test(username) ? true : false;
};
export const isEmail = username => {
  let regexPattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regexPattern.test(username) ? true : false;
};

export const findUsernameType = username => {
  let trimmedUsername = username.replace(/ /g, '');
  if (isEmail(trimmedUsername)) {
    return 'email';
  } else if (isPhone(trimmedUsername)) {
    return 'phone';
  } else {
    return 'invalid';
  }
};

//export const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
export const smoothScroll = ref =>
  ref.current.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
