import update from 'immutability-helper';
import { WHOAMI_FAIL, WHOAMI_START, WHOAMI_SUCCESS } from '../actionTypes';

const initialState = {
  user: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case WHOAMI_START:
      return update(state, {

      });
    case WHOAMI_SUCCESS:
      console.log(action.payload)
      return update(state, {
        user: { $set: action.payload.user}
      });
    case WHOAMI_FAIL:
      return update(state, {

      });
    default:
      return state;
  }
};

export default auth;
