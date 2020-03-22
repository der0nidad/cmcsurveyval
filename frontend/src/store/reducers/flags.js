import update from 'immutability-helper';
import { CLOSE_LEFT_MENU, OPEN_LEFT_MENU } from '../actionTypes';

const initialState = {
  menuOpened: false,
};

const flags = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LEFT_MENU:
      return update(state, {
        menuOpened: { $set: true },

      });
    case CLOSE_LEFT_MENU:
      return update(state, {
        menuOpened: { $set: false },
      });
    default:
      return state;
  }
};

export default flags;
