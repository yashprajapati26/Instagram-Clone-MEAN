const { STATUSCODE } = require("../config/constant");
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
    if (del) {
      return del;
    }
    return 0;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const updateNotification = async (condition, message) => {
  try {
    await notificationService.update(condition, { message: message });
  } catch (e) {
    console.log(e);
    return e;
  }
};

const likedPost = require("../models/likedPost.model");
const CmtPost = require("../models/cmtPost.model");
const userFollowers = require("../models/userFollowers.model");

const getLikedNotification = async (req, res) => {
  try {
    let condition = { type: "Like", userId: req.params.userId };
    let modelname = likedPost;

    let likes = await notificationService.findAll(condition, modelname);
    console.log(likes);
    if (likes) {
      return res
        .status(STATUSCODE.success)
        .json({ msg: "Fatch Liked Notification", likesNotifications: likes });
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

const getCmtsNotification = async (req, res) => {
  try {
    console.log("----------------->");
    let condition = { type: "Comment", userId: req.params.userId };
    let modelname = CmtPost;

    let cmts = await notificationService.findAll(condition, modelname);
    console.log("-->", cmts);
    if (cmts) {
      return res
        .status(STATUSCODE.success)
        .json({ msg: "Fatch cmts Notification", cmtsNotifications: cmts });
    }
  } catch (e) {
    console.log("------1212-----");
    console.log(e);
    return e;
  }
};

const getFollowNotification = async (req, res) => {
  try {
    let condition = { type: "Follow Request", userId: req.params.userId };
    let modelname = userFollowers;

    let followNotifications = await notificationService.findAll(
      condition,
      modelname
    );
    console.log(followNotifications);
    if (followNotifications) {
      return res.status(STATUSCODE.success).json({
        msg: "Fatch follow Notification",
        followNotifications: followNotifications,
      });
    }
  } catch (e) {
    console.log(e);
    return e;
  }
};

module.exports = {
  createNotification: createNotification,
  deleteNotification: deleteNotification,
  updateNotification: updateNotification,
  getLikedNotification: getLikedNotification,
  getCmtsNotification: getCmtsNotification,
  getFollowNotification: getFollowNotification,
};
