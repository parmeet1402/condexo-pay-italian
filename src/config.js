export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://138.201.156.151:4047/api'
    : 'http://condexopay.api.demos.classicinformatics.com/it/';

export const IMAGE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://138.201.156.151:4047/api/files/uploads'
    : 'http://condexopay.api.demos.classicinformatics.com/files/uploads/';
