import { all, takeLatest } from 'redux-saga/effects';
import API from '../services/api';
import { AuthTypes } from './AuthRedux';
/* import { AppTypes } from './AppRedux';
import { startup } from './AppSaga';
import { storeToken, clearToken } from './AuthSaga';
import { ArticleTypes } from './ArticleRedux';
import { loadArticles } from './ArticleSaga';
import { GameTypes } from './GameRedux';
import { loadGames } from './GameSaga'; */

/**
 * rootSaga
 */
const api = API.create();
export default function* root() {
  yield all([
    /* takeLatest(AuthTypes.UPLOAD_DOCUMENT_REQUEST, uploadDocument, api ) */
    /*  takeLatest(AppTypes.STARTUP, startup),
    takeLatest(AuthTypes.SET_LOGGED_IN, storeToken),
    takeLatest(AuthTypes.SET_LOGGED_OUT, clearToken),
    takeLatest(ArticleTypes.REQUEST_ARTICLES_LIST, loadArticles),
    takeLatest(GameTypes.REQUEST_GAMES_LIST, loadGames) */
  ]);
}
