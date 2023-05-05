import {FETCH_REDEEMABLE_ITEMS} from '../actions';

const initialState = {
  allItems: [],
  loadingState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REDEEMABLE_ITEMS:
      return {
        ...state,
        loadingState: action.loadingState,
        allItems: action.allItems,
      };
    default:
      return state;
  }
};
