import {
  FETCH_HISTORI_PENGIRIMAN,
  FETCH_DETAIL_PENGIRIMAN,
  FETCH_TIMELINE_PENGIRIMAN,
  UPDATE_STATUS_PENGIRIMAN,
} from "../actions";

const initialState = {
  historiPengiriman: [],
  listPengirimanAktif: [],
  detailPengiriman: [],
  timelinePengiriman: [],
  loadingState: false,
  fetchDetailLoadingState: false,
  fetchTimelineLoadingState: false,
  uploadingState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HISTORI_PENGIRIMAN:
      return {
        ...state,
        loadingState: action.loadingState,
        historiPengiriman: action.historiPengiriman,
      };
    case FETCH_DETAIL_PENGIRIMAN:
      // console.log(action.selectedSensory.urgency);

      return {
        ...state,
        fetchDetailLoadingState: action.fetchDetailLoadingState,
        detailPengiriman: action.detailPengiriman,
      };
    case FETCH_TIMELINE_PENGIRIMAN:
      // console.log('di reducer');
      // console.log(action.selectedSensory.urgency);
      return {
        ...state,
        fetchTimelineLoadingState: action.fetchTimelineLoadingState,
        timelinePengiriman: action.timelinePengiriman,
      };
    case UPDATE_STATUS_PENGIRIMAN:
      return {
        ...state,
        uploadingState: action.uploadingState,
      };
    default:
      return state;
  }
};
