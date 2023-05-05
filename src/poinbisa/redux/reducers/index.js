import {combineReducers} from 'redux';

import cart from './cartReducers';
import poinBisa from './poinBisaReducer';

const reducer = combineReducers({
  cart,
  poinBisa,
});

export default (state, action) => {
  let oldState = state;
  return reducer(oldState, action);
};
