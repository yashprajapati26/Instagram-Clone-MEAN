const { STATUSCODE } = require("../config/constant");
const authService = require("../services/auth.service");
const userProfileService = require("../services/userProfile.service");

const createProfile = async (req, res) => {
  try {
    let isExist = await userProfileService.findOne({
      userId: req.body.userId,
    });
    if (!isExist) {
      if (req.file) {
        req.body.profile_img = req.file.path;
      }
      let userprofile = await userProfileService.create(req.body);
      if (userprofile) {
        let user = await userProfileService.findOne({
          id: userprofile.id,
        });
        await authService.update(
          { id: req.body.userId },
          { isFirstTime: false }
        );
        return res.status(STATUSCODE.success).json({
          msg: "Profile created sucessfully",
        });
      } else {
        return res.status(STATUSCODE.failure).json({
          msg: "Profile not created!! something wrong",
        });
      }
    } else {
      // update
      if (req.file) {
        req.body.profile_img = req.file.path;
      }
      let userprofile = await userProfileService.update(
        { userId: req.body.userId },
        req.body
      );
      return res.status(STATUSCODE.success).json({
        msg: "Profile Updated sucessfully",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const getUserProfileInfo = async (req, res) => {
  try {
    let userProfile = await userProfileService.findOne(
      ["id","userId","profile_img","bio","dob","gender","city","country","no_of_followers","no_of_following"]
      ,{
      userId: req.params.userId,
    });
    if (userProfile) {
      return res.status(STATUSCODE.success).json({
        msg: "Fatch userProfile sucessfull",
        userProfile: userProfile,
      });
    }
    return res
      .status(STATUSCODE.failure)
      .json({ msg: "userProfile not found" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

module.exports = {
  getUserProfileInfo,
  createProfile,
};
