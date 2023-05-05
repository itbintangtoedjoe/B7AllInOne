import {combineReducers} from 'redux';

import ekspedisi from './ekspedisiReducer';
import auth from '../../../general/redux/actions/authAction';

const reducer = combineReducers({
  ekspedisi,
  auth,
});

export default (state, action) => {
  let oldState = state;
  return reducer(oldState, action);
};
