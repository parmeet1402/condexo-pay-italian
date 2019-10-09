import { all, takeLatest } from 'redux-saga/effects';
import API from '../services/api';
import { RegisterTypes } from './RegisterRedux';
import { uploadDocument } from './RegisterSaga';

// APISauce object
const api = API.create();

export default function* root() {
  yield all([
    takeLatest(RegisterTypes.UPLOAD_DOCUMENT_REQUEST, uploadDocument, api)
  ]);
}
