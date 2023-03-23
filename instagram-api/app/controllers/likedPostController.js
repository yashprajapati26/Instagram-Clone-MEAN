const { STATUSCODE } = require("../config/constant");
const likedPostService = require("../services/likedPost.service");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const LikeDislikePost = async (req, res) => {
  try {
    let userId = req.params.userId;
    let postId = req.params.postId;
    console.log(userId,postId)
    if (userId && postId) {
      let isAlreadyLiked = await likedPostService.findOne({ postId: postId, likedBy: userId });
      if (isAlreadyLiked) {
        await likedPostService.deleteRecord({ postId: postId, likedBy: userId });
      } else {
        await likedPostService.create({ postId: postId, likedBy: userId });
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

module.exports = {
  LikeDislikePost: LikeDislikePost,
};
