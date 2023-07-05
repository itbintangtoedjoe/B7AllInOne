import { isReachable } from "../../../general/redux/actions";
import TaskItem from "../../models/TaskItem";

export const FETCH_USER_PENDING_TASK = "FETCH_USER_PENDING_TASK";
export const FETCH_TRANSACTION_DETAIL = "FETCH_TRANSACTION_DETAIL";
export const APPROVE_TRANSACTION = "APPROVE_TRANSACTION";
export const REJECT_TRANSACTION = "REJECT_TRANSACTION";

export const fetchUserPendingTask = (username) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_USER_PENDING_TASK,
      fetchLoadingState: true,
    });

    const data = {
      username,
    };

    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/masterapprovalgeneral/list/getpendingtask?username=" +
            username,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              // 'Content-Type': 'multipart/form-data',
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        // console.log(responseData);

        let userPendingTask = [];

        responseData.map(function (item) {
          let requestor = item.REQUESTOR;
          if (requestor != null) {
            if (requestor.indexOf("\\") > 0) {
              requestor = requestor.substring(requestor.indexOf("\\") + 1);
            }
          } else {
            requestor = "-";
          }

          let remarks = item.REMARKS;
          if (remarks == null) {
            remarks = "-";
          }

          userPendingTask.push(
            new TaskItem(
              // item.ID,
              item.IDAPPS_FK,
              item.APPSNAME,
              item.MODULID,
              item.MODULNAME,
              item.MENUNAME,
              item.IDTRANSC,
              item.TRANSACTIONDATE,
              requestor,
              remarks,
              item.URL
            )
          );
        });
        // console.log("halo bos");
        // console.log(userPendingTask);

        dispatch({
          type: FETCH_USER_PENDING_TASK,
          userPendingTask: userPendingTask,
          fetchLoadingState: false,
        });
      } catch (err) {
        console.log(err);
        return;
        // throw err;
      }
    } else {
      dispatch({
        type: FETCH_USER_PENDING_TASK,
        // historiPengiriman: [],
        fetchLoadingState: false,
      });
      return goodToGo;
    }
  };
};

export const fetchTransactionDetail = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_TRANSACTION_DETAIL,
      fetchLoadingState: true,
    });

    // console.log('masok func action atas');
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/masterapprovalgeneral/list/getpendingtask?username=" +
            data.username,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              // 'Content-Type': 'multipart/form-data',
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        const responseData = await response.json();

        // console.log(responseData);

        let userPendingTask = [];
        let detailTransaksi = null;

        responseData.map(function (item) {
          // console.log(item);
          let requestor = item.REQUESTOR;
          if (requestor.indexOf("\\") > 0) {
            requestor = requestor.substring(requestor.indexOf("\\") + 1);
          }

          let remarks = item.REMARKS;
          if (remarks == null) {
            remarks = "-";
          }

          // console.log('data.transactionID: ' + data.transactionID);
          // console.log('appID: ' + data.appID);
          // console.log('-----');
          // console.log(item.IDTRANSC);
          // console.log(item.IDAPPS_FK);

          userPendingTask.push(
            new TaskItem(
              // item.ID,
              item.IDAPPS_FK,
              item.APPSNAME,
              item.MODULNAME,
              item.MENUNAME,
              item.IDTRANSC,
              item.TRANSACTIONDATE,
              requestor,
              remarks,
              item.URL
            )
          );
        });
        // console.log('masok fetch detail');
        // console.log(userPendingTask);

        detailTransaksi = userPendingTask.filter(
          (item) =>
            item.TransactionID == data.transactionID && item.AppID == data.appID
        );

        detailTransaksi = detailTransaksi[0];
        // console.log('detailTransaksi');
        // console.log(detailTransaksi);

        dispatch({
          type: FETCH_TRANSACTION_DETAIL,
          detailTransaksi: detailTransaksi,
          fetchLoadingState: false,
        });
      } catch (err) {
        return;
        // throw err;
      }
    } else {
      dispatch({
        type: FETCH_TRANSACTION_DETAIL,
        // historiPengiriman: [],
        fetchLoadingState: false,
        detailTransaksi: null,
      });
      return goodToGo;
    }
  };
};

export const approveTransaction = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: APPROVE_TRANSACTION,
      approvalLoadingState: true,
    });

    // console.log('masok func action atas');
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/masterapproval/api/approve",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              // 'Content-Type': 'multipart/form-data',
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        let responseData = await response.json();
        let statusResult = "";
        responseData = responseData[0];
        statusResult = responseData.Status;

        // console.log(responseData);

        // let userPendingTask = [];
        // let detailTransaksi = null;

        // responseData.map(function (item) {
        //   // console.log(item);
        //   let requestor = item.REQUESTOR;
        //   if (requestor.indexOf('\\') > 0) {
        //     requestor = requestor.substring(requestor.indexOf('\\') + 1);
        //   }

        //   let remarks = item.REMARKS;
        //   if (remarks == null) {
        //     remarks = '-';
        //   }

        //   // console.log('data.transactionID: ' + data.transactionID);
        //   // console.log('appID: ' + data.appID);
        //   // console.log('-----');
        //   // console.log(item.IDTRANSC);
        //   // console.log(item.IDAPPS_FK);

        //   userPendingTask.push(
        //     new TaskItem(
        //       // item.ID,
        //       item.IDAPPS_FK,
        //       item.APPSNAME,
        //       item.MODULNAME,
        //       item.MENUNAME,
        //       item.IDTRANSC,
        //       item.TRANSACTIONDATE,
        //       requestor,
        //       remarks,
        //       item.URL,
        //     ),
        //   );
        // });
        // console.log('masok fetch detail');
        // console.log(userPendingTask);

        // detailTransaksi = userPendingTask.filter(
        //   item =>
        //     item.TransactionID == data.transactionID &&
        //     item.AppID == data.appID,
        // );
        // console.log('detailTransaksi');
        // console.log(detailTransaksi);

        dispatch({
          type: APPROVE_TRANSACTION,
          statusApproval: statusResult,
          approvalLoadingState: false,
        });
      } catch (err) {
        return;
        // throw err;
      }
    } else {
      dispatch({
        type: APPROVE_TRANSACTION,
        statusApproval: "",
        approvalLoadingState: false,
      });
      return goodToGo;
    }
  };
};

export const rejectTransaction = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REJECT_TRANSACTION,
      approvalLoadingState: true,
    });

    // console.log('masok func action atas');
    const goodToGo = await isReachable();
    if (goodToGo === true) {
      try {
        const response = await fetch(
          "https://portal.bintang7.com/masterapproval/api/reject",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              // 'Content-Type': 'multipart/form-data',
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }

        let responseData = await response.json();
        let statusResult = "";
        responseData = responseData[0];
        statusResult = responseData.Status;

        dispatch({
          type: REJECT_TRANSACTION,
          statusApproval: statusResult,
          approvalLoadingState: false,
        });
      } catch (err) {
        return;
        // throw err;
      }
    } else {
      dispatch({
        type: REJECT_TRANSACTION,
        statusApproval: "",
        approvalLoadingState: false,
      });
      return goodToGo;
    }
  };
};
