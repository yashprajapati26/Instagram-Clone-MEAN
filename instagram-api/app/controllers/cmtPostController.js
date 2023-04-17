const { STATUSCODE } = require("../config/constant");
const cmtPostService = require("../services/cmtPost.service");
const notificationController = require("./notificationController");

const createComment = async (req, res) => {
  try {
    let comment = await cmtPostService.create(req.body);
    if (comment) {
      let cmtObj = await cmtPostService.findOne({ id: comment.id });
      await notificationController.createNotification(
        "Comment",
        cmtObj.id,
        cmtObj.post.userId,
        "comment on your post."
      );

      return res.status(STATUSCODE.success).json({ msg: "Comment Added" });
    }
    return res
      .status(STATUSCODE.failure)
      .json({ msg: "failed to add comment" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
    });
  }
};

module.exports = {
  createComment: createComment,
};
