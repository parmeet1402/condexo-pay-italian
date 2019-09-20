import { createBrowserHistory } from 'history';

const browserHistory = createBrowserHistory();

export const getDomain = () => {
  const domainParts = window.location.host.split('.');
  const domain = domainParts.slice(domainParts.length - 2).join('.');

  return domain;
};

export default browserHistory;
