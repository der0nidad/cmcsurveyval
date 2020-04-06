import update from 'immutability-helper';
import { SURVEY_DATA_LOAD_FAIL, SURVEY_DATA_LOAD_START, SURVEY_DATA_LOAD_SUCCESS } from '../actionTypes';
import {toCamel} from "../../common/helpers/toCamel";

const initialState = {
  survey: null,
};

const questionsEdit = (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_DATA_LOAD_START:
      return update(state, {
      });
    case SURVEY_DATA_LOAD_SUCCESS:
      const sel = toCamel(action.payload);
      console.log(sel)
      return update(state, {
        survey: { $set: sel },
      });
    case SURVEY_DATA_LOAD_FAIL:
      return update(state, {

      });
    default:
      return state;
  }
};

export default questionsEdit;
