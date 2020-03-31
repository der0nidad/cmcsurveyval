import update from 'immutability-helper';
import {
  CLOSE_LEFT_MENU,
  CLOSE_QUESTION_FORM,
  CLOSE_SURVEY_FORM,
  OPEN_LEFT_MENU,
  OPEN_QUESTION_FORM,
  OPEN_SURVEY_FORM,
  SURVEY_LOAD_SUCCESS,
} from '../actionTypes';

const initialState = {
  menuOpened: false,
  formOpened: false,
  // move isLoading here
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
    case OPEN_QUESTION_FORM:
      return update(state, {
        formOpened: { $set: true },
      });
    case CLOSE_SURVEY_FORM:
    case CLOSE_QUESTION_FORM:
    case SURVEY_LOAD_SUCCESS:
      return update(state, {
        formOpened: { $set: false },
      });
    default:
      return state;
  }
};

export default flags;
