const notificationService = require("../services/notification.service");

const createNotification = async (type, notificationId, userId, message) => {
  try {
    let data = {
      type: type,
      notificationId: notificationId,
      userId: userId,
      message: message,
    };
    let create = await notificationService.create(data);
    return create;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const deleteNotification = async (type, notificationId, userId) => {
  try {
    let condition = {
      type: type,
      notificationId: notificationId,
      userId: userId,
    };
    let del = await notificationService.deleteRecord(condition);
    if(del){
        return del;
    }
    return 0;
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  createNotification: createNotification,deleteNotification:deleteNotification
};
