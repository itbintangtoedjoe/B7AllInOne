import { FETCH_DOCUMENTS, FETCH_LATEST_DOCUMENTS } from '../actions';

const initialState = {
  daftarDokumen: [],
  dokumenTerakhir: [],
  loadingState: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DOCUMENTS:
      return {
        ...state,
        loadingState: action.loadingState,
        daftarDokumen: action.allDocuments,
      };
    case FETCH_LATEST_DOCUMENTS:
      return {
        ...state,
        loadingState: action.loadingState,
        dokumenTerakhir: action.dokumenTerakhir
      };
    default:
      return state;
  }
};
