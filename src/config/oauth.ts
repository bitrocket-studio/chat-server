import { ConfigParams } from 'express-openid-connect';
import { PORT } from './environment';

export const configOAuth: ConfigParams = {
  authRequired: false,
  auth0Logout: true,
  secret: 'boKhsN3W35NNLIV38QgWf5avDNZ1ninbs195W-mFqxRplmfaJ_bjp-vHoySTNxfj',
  baseURL: `http://localhost:${PORT}`,
  clientID: 'gLOcMdupmLGakJBRblU1o7DbXlsypWin',
  issuerBaseURL: 'https://riccardogenova.auth0.com',
  routes: {
    login: false,
  },
};
