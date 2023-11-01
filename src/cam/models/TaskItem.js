class TaskItem {
  constructor(
    // recordID,
    appID,
    appName,
    modulID,
    modulName,
    menuName,
    transactionID,
    transactionDate,
    requestor,
    remarks,
    url,
    isK2
  ) {
    // this.RecordID = recordID;
    this.AppID = appID;
    this.AppName = appName;
    this.ModulID = modulID;
    this.ModulName = modulName;
    this.MenuName = menuName;
    this.TransactionID = transactionID;
    this.TransactionDate = transactionDate;
    this.Requestor = requestor;
    this.Remarks = remarks;
    this.Url = url;
    this.IsK2 = isK2;
  }
}
// "AMOUNT": "0", "APPSNAME": "POSM", "CATEGORY": "-", "IDAPPS_FK": "3", "IDTRANSC": "TRC/290322/001", "ISACTIVE": "1", "MENUNAME": "Transaksi", "MODULID_FK": "15", "MODULNAME": "Triangle No Cat All LOB", "NIK": "160701318,", "REMARKS": "-", "REQUESTOR": "FELICIA BRILLIANT BENALY", "TRANSACTIONDATE": "2022-03-29T00:00:00", "TransactionDate": "29 March 2022", "URL": "-"},
export default TaskItem;
