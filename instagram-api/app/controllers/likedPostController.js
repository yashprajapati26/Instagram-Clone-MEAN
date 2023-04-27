const { STATUSCODE } = require("../config/constant");
const likedPostService = require("../services/likedPost.service");
const Sequelize = require("sequelize");
const notificationController = require("./notificationController");
const Op = Sequelize.Op;

const LikeDislikePost = async (req, res) => {
  try {
    let userId = req.params.userId;
    let postId = req.params.postId;
    if (userId && postId) {
      let isAlreadyLiked = await likedPostService.findOne({
        postId: postId,
        likedBy: userId,
      });
      if (isAlreadyLiked) {
        await likedPostService.deleteRecord({
          postId: postId,
          likedBy: userId,
        });
        await notificationController.deleteNotification(
          "Like",
          isAlreadyLiked.id,
          isAlreadyLiked.post.userId
        );
      } else {
        await likedPostService.create({ postId: postId, likedBy: userId });
        let likeObj = await likedPostService.findOne({
          postId: postId,
          likedBy: userId,
        });

        let message = "liked your post.";
        await notificationController.createNotification(
          "Like",
          likeObj.id,
          likeObj.post.userId,
          message
        );
      }
      return res.status(STATUSCODE.success).json({ msg: "Action Complted" });
    }
    return res.status(STATUSCODE.failure).json({ msg: "Parameters Missing" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const getAllLiked = async (req, res) => {
  try {
    let allLiked = await likedPostService.findAll(req.params.userId);
    if (allLiked) {
      return res
        .status(STATUSCODE.success)
        .json({ msg: "get all Liked", allLiked: allLiked });
    }
    return res.status(STATUSCODE.failure).json({ msg: "No data found" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

module.exports = {
  LikeDislikePost,
  getAllLiked,
};
