import update from 'immutability-helper';
import {CLOSE_LEFT_MENU, CLOSE_SURVEY_FORM, OPEN_LEFT_MENU, OPEN_SURVEY_FORM} from '../actionTypes';

const initialState = {
  menuOpened: false,
  formOpened: false,
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
    case OPEN_SURVEY_FORM:
      return update(state, {
        formOpened: { $set: true },
      });
    case CLOSE_SURVEY_FORM:
      return update(state, {
        formOpened: { $set: false },
      });
    default:
      return state;
  }
};

export default flags;
