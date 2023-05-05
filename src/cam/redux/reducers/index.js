import {combineReducers} from 'redux';

import cam from './camReducer';

const reducer = combineReducers({
  cam,
});

export default (state, action) => {
  let oldState = state;
  return reducer(oldState, action);
};
