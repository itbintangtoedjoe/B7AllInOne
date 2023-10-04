import {
  FETCH_USER_PENDING_TASK,
  FETCH_TRANSACTION_DETAIL,
  APPROVE_TRANSACTION,
  REJECT_TRANSACTION,
} from "../actions/camAction";

const initialState = {
  userPendingTask: [],
  detailTransaksi: {},
  fetchLoadingState: false,
  fetchDetailLoadingState: false,
  approvalLoadingState: false,
  statusApproval: "",
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
      // console.log("di reducer");
      // console.log(action.statusApproval);
      return {
        ...state,
        approvalLoadingState: action.approvalLoadingState,
        detailTransaksi: action.detailTransaksi,
        statusApproval: action.statusApproval,
      };
    case REJECT_TRANSACTION:
      // console.log("di reducer");
      // console.log(action.statusApproval);
      return {
        ...state,
        approvalLoadingState: action.approvalLoadingState,
        detailTransaksi: action.detailTransaksi,
        statusApproval: action.statusApproval,
      };
    default:
      return state;
  }
};
