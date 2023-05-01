const { STATUSCODE } = require("../config/constant");
const savedPostService = require("../services/savedPost.service");

const savePost = async(req, res) => {
  try {
    let exist = await savedPostService.findOne(req.body);
    console.log("existing post ->>>>>>>>>>>>>>>>>>>>>>>", exist)
    if (exist) {
      let condition = { postId: req.body.postId, userId: req.body.userId };
      let removed = await savedPostService.deleteRecord(condition);
      if (removed) {
        res
          .status(STATUSCODE.success)
          .json({ removed: removed, msg: "remove post successfully" });
      } else {
        res.status(STATUSCODE.failure).json({ msg: "remove post failed" });
      } 
    } else {
      let saved = await savedPostService.create(req.body);
      if (saved) {
        res
          .status(STATUSCODE.success)
          .json({ saved: saved, msg: "saved post successfully" });
      } else {
        res.status(STATUSCODE.failure).json({ msg: "save post failed" });
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const removePost = async(req, res) => {
  try {
    let condition = { postId: req.body.postId, userId: req.body.userId };
    let removed = await savedPostService.deleteRecord(condition);
    if (removed) {
      res
        .status(STATUSCODE.success)
        .json({ removed: removed, msg: "remove post successfully" });
    } else {
      res.status(STATUSCODE.failure).json({ msg: "remove post failed" });
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const listSavedPosts = async(req, res) => {
  try {
    console.log("---------------------------->", req.params);
    let all = await savedPostService.findAll({ userId: req.params.userId });
    if (all.length > 0) {
      res
        .status(STATUSCODE.success)
        .json({ allSaved: all, msg: "all saved post fatch successfully" });
    } else {
      res.status(STATUSCODE.success).json({ msg: "not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

module.exports = {
  savePost,
  removePost,
  listSavedPosts,
};
