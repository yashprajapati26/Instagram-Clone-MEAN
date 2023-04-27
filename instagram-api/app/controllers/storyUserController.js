const { STATUSCODE } = require("../config/constant");
const storyUserService = require("../services/storyUser.service");
const storyUserModel = require("../models/storyUser.model");

const createStory = async (req, res) => {
  try {
    let createstory = await storyUserService.create(req.body);
    if (createstory) {
      return res
        .status(STATUSCODE.success)
        .json({ msg: "Story created successfully" });
    }
    return res
      .status(STATUSCODE.failure)
      .json({ msg: "Story not created successfully" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const getAllStory = async (req, res) => {
  try {
    let Allstory = await storyUserService.findAll();
    if (Allstory) {
      return res
        .status(STATUSCODE.success)
        .json({ Allstory: Allstory, msg: "Story fatch successfully" });
    }
    return res
      .status(STATUSCODE.failure)
      .json({ msg: "Story not created successfully" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

module.exports = { createStory, getAllStory };
