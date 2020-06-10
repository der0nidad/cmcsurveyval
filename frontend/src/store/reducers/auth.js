import update from 'immutability-helper';
import {
  FLUSH_REDIRECT, WHOAMI_FAIL, WHOAMI_START, WHOAMI_SUCCESS,
} from '../actionTypes';
import { getCookie } from '../../common/helpers/csrf';
import {toCamel} from '../../common/helpers/toCamel';

const initialState = {
  user: null,
  userPermissions: null,
  csrf: null,
  redirect: null,
};
const userSchemaExample = {
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  avatar: 'link/to/avatar.jpg',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case WHOAMI_START:
      return update(state, {

      });
    case WHOAMI_SUCCESS: {
      return update(state, {
        user: { $set: toCamel(action.payload.user) },
        csrf: { $set: getCookie('csrftoken') },
        redirect: { $set: null },
      });
    }
    case WHOAMI_FAIL: {
      return update(state, {
        redirect: { $set: action.payload.response.next },
      });
    }
    case FLUSH_REDIRECT: {
      return update(state, {
        redirect: { $set: null },
      });
    }
    default:
      return state;
  }
};

export default auth;
