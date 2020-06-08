import { createAction } from 'redux-api-middleware';
import {
  LOGOUT_FAIL, LOGOUT_START, LOGOUT_SUCCESS, WHOAMI_FAIL, WHOAMI_START, WHOAMI_SUCCESS,
} from '../actionTypes';
import {logOutEndpoint, whoAmI} from '../../components/RouterComponent/routerComponent.constants';
import { getCookie } from '../../common/helpers/csrf';

export const whoAmIAction = () => createAction({
  endpoint: whoAmI,
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
  types: [
    WHOAMI_START,
    WHOAMI_SUCCESS,
    WHOAMI_FAIL,
  ],
});


export const logOutAction = () => createAction({
  endpoint: logOutEndpoint,
  method: 'POST',
  headers: {
    'X-CSRFTOKEN': getCookie('csrftoken'),
  },
  types: [
    LOGOUT_START,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
  ],
});
