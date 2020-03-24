import { createAction } from 'redux-api-middleware';
import { WHOAMI_FAIL, WHOAMI_START, WHOAMI_SUCCESS } from '../actionTypes';
import { whoAmI } from '../../components/RouterComponent/riuterComponent.constants';

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
