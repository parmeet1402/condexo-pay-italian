import PrivacyPolicy from '../containers/privacyPolicy';
import PayYourBill from '../containers/payYourBill';
import Terms from '../containers/termsAndConditions';
import Login from '../containers/auth/login';
import ForgotPassword from '../containers/auth/forgotPassword';
import Register from '../containers/auth/register';
import Dashboard from '../containers/dashboard';
import MyProfile from '../containers/myProfile';
import MyPayments from '../containers/myPayments';
import RechargeAndGiftCards from '../containers/rechargeAndGiftCards';
import GiftCard from '../containers/giftCard';
import GiftCardPurchase from '../containers/giftCardPurchase';
import AccountClosed from '../components/AccountClosed';

const routes = [
  {
    path: '/privacy',
    exact: true,
    component: PrivacyPolicy,
    isPrivate: false,
  },
  {
    path: '/condizioni',
    exact: true,
    component: Terms,
    isPrivate: false,
  },
  {
    path: '/bollettini',
    exact: true,
    component: PayYourBill,
    isPrivate: false,
  },
  {
    path: '/rata',
    exact: true,
    component: PayYourBill,
    isPrivate: false,
  },
  {
    path: '/mav-rav',
    exact: true,
    component: PayYourBill,
    isPrivate: false,
  },

  {
    path: '/profilo',
    exact: true,
    component: MyProfile,
    isPrivate: true,
  },
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    isPrivate: true,
  },
  {
    path: '/miei_pagamenti',
    exact: true,
    component: MyPayments,
    isPrivate: true,
  },
  {
    path: '/ricariche',
    exact: true,
    component: RechargeAndGiftCards,
    isPrivate: true,
  },
  {
    path: '/gift-card/:id/:amount',
    exact: true,
    component: GiftCardPurchase,
    isPrivate: true,
  },
  {
    path: '/gift-card/:id',
    exact: true,
    component: GiftCard,
    isPrivate: true,
  },

  {
    path: '/account-closed',
    exact: true,
    component: AccountClosed,
    isPrivate: false,
  },

  {
    path: '/login',
    exact: true,
    component: Login,
    isPrivate: false,
  },

  {
    path: '/registrazione',
    exact: true,
    component: Register,
    isPrivate: false,
  },

  {
    path: '/recupera_password',
    exact: true,
    component: ForgotPassword,
    isPrivate: false,
  },
  {
    path: '/recupera_password/:username/:forgotPwdToken',
    exact: true,
    component: ForgotPassword,
    isPrivate: false,
  },
];

export default routes;

{
  /* <Route exact path="/fast-payment" component={FastPayment} /> */
}
{
  /* <Route exact path="/dashboard" component={Dashboard} /> */
}
{
  /* <Route exact path="/profilo" component={MyProfile} /> */
}
