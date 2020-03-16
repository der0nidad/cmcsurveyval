import update from 'immutability-helper';

const initialReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      // return update(state, state + 1);
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
};

export default initialReducer;
