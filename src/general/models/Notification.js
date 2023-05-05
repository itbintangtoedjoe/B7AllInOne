class Notification {
  constructor(
    recordID,
    appID,
    appName,
    title,
    body,
    transactionID,
    urlWeb,
    urlMobile,
    isRead,
    creationDate,
  ) {
    this.ID = recordID;
    this.AppID = appID;
    this.AppName = appName;
    this.Title = title;
    this.Body = body;
    this.TransactionID = transactionID;
    this.UrlWeb = urlWeb;
    this.UrlMobile = urlMobile;
    this.Status = isRead;
    this.CreationDate = creationDate;
  }
}

export default Notification;
