import {combineReducers} from 'redux';

//tara
import document from '../../../tara/redux/reducers/documentReducer';
import category from '../../../tara/redux/reducers/categoryReducer';
import auth from './authReducer';

//ekspedisi
import eoEkspedisi from '../../../ekspedisionline/redux/reducers/ekspedisiReducer';

//poin bisa
import poinBisa from '../../../poinbisa/redux/reducers/poinBisaReducer';
import cart from '../../../poinbisa/redux/reducers/cartReducer';

//cam
import cam from '../../../cam/redux/reducers/camReducer';

//general
import general from '../reducers/generalReducer';

const reducer = combineReducers({
  document,
  category,
  auth,
  eoEkspedisi,
  poinBisa,
  cart,
  cam,
  general,
});

export default (state, action) => {
  let oldState = state;
  return reducer(oldState, action);
};
