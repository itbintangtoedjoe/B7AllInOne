import {combineReducers} from 'redux';

import document from './documentReducer';
import category from './categoryReducer';
import auth from '../../../general/redux/reducers/authReducer';

const reducer = combineReducers({
  document,
  category,
  auth,
});

export default (state, action) => {
  let oldState = state;
  return reducer(oldState, action);
};
