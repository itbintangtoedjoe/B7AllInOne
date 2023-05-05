import {FETCH_CATEGORIES, FETCH_SUBCATEGORIES} from '../actions';

const initialState = {
  daftarKategori: [],
  daftarSubkategori: [],
  loadingState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        daftarKategori: action.allCategories,
        loadingState: action.loadingState,
      };
    case FETCH_SUBCATEGORIES:
      return {
        ...state,
        daftarSubkategori: action.allSubcategories,
        loadingState: action.loadingState,
      };
    default:
      return state;
  }
};
