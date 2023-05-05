import {
  FETCH_USER_PENDING_TASK,
  FETCH_TRANSACTION_DETAIL,
  APPROVE_TRANSACTION,
  REJECT_TRANSACTION,
} from '../actions/camAction';

const initialState = {
  userPendingTask: [],
  detailTransaksi: {},
  fetchLoadingState: false,
  fetchDetailLoadingState: false,
  approvalLoadingState: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PENDING_TASK:
      // console.log('di reducer: ');
      // console.log(action.userPendingTask);
      return {
        ...state,
        fetchLoadingState: action.fetchLoadingState,
        userPendingTask: action.userPendingTask,
      };
    case FETCH_TRANSACTION_DETAIL:
      // console.log('di reducer: ');
      // console.log(action.detailTransaksi);
      return {
        ...state,
        fetchDetailLoadingState: action.fetchLoadingState,
        detailTransaksi: action.detailTransaksi,
      };
    case APPROVE_TRANSACTION:
      return {
        ...state,
        approvalLoadingState: action.approvalLoadingState,
        detailTransaksi: action.detailTransaksi,
      };
    default:
      return state;
  }
};
