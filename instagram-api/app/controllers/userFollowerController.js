const userFollowersService = require("../services/userFollowers.service");
const { STATUSCODE } = require("../config/constant");
const userProfileService = require("../services/userProfile.service");
const notificationController = require("./notificationController");

const do_undo_Following = async (req, res) => {
  try {
    let data = {
      userId: req.body.userId,
      followerId: req.body.followerId,
    };

    let isExist = await userFollowersService.findOne({
      userId: req.body.userId,
      followerId: req.body.followerId,
    });

    if (isExist) {
      let deleteRecord = await userFollowersService.deleteRecord(data);
      if (deleteRecord) {
        await notificationController.deleteNotification(
          "Follow Request",
          isExist.id,
          isExist.userId
        );
        return res.status(STATUSCODE.success).json({
          msg: "remove follower",
          deleteRecord: deleteRecord,
        });
      } else {
        return res.status(STATUSCODE.failure).json({
          msg: "not remove follower",
        });
      }
    } else {
      let addedFollower = await userFollowersService.create(data);
      if (addedFollower) {
        await notificationController.createNotification(
          "Follow Request",
          addedFollower.id,
          addedFollower.userId,
          "requested to follow you."
        );

        return res.status(STATUSCODE.success).json({
          msg: "added follower",
          addedFollower: addedFollower,
        });
      } else {
        return res.status(STATUSCODE.failure);
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "Something wrong",
    });
  }
};

const getAllFollowers = async (req, res) => {
  try {
    let allFollowers = await userFollowersService.findAll({
      userId: req.params.userId,
    });
    if (allFollowers) {
      return res.status(STATUSCODE.success).json({
        msg: "get all followers",
        allFollowers: allFollowers,
      });
    }
    return res.status(STATUSCODE.failure).json({
      msg: "No data found",
    });
  } catch (e) {
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const getAllFollowing = async (req, res) => {
  try {
    let allFollowing = await userFollowersService.findAll({
      followerId: req.params.userId,
    });
    if (allFollowing) {
      return res.status(STATUSCODE.success).json({
        msg: "get all Following users",
        allFollowing: allFollowing,
      });
    }
    return res.status(STATUSCODE.failure).json({
      msg: "No data found",
    });
  } catch (e) {
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const updateFollowingRequest = async (req, res) => {
  try {
    console.log(req.body);

    let updateStatus = await userFollowersService.update(
      {
        id: req.body.requestId,
      },
      {
        status: req.body.status,
      }
    );

    console.log(updateStatus);
    if (updateStatus) {
      // update count
      let userId = req.body.userId;
      let followerId = req.body.followerId;

      if(req.body.status=="Accept"){
        let condition = { userId : userId, notificationId: req.body.requestId, type:"Follow Request"}
        let message = "started following you"
        await notificationController.updateNotification(condition, message)
      }
      else{
          await notificationController.deleteNotification("Follow Request",req.body.requestId,userId)
      }

      // update in userId followers user

      const noOfFollower = await userFollowersService.findAndCountAll(
        ["id", "userId", "followerId", "status"],
        {
          userId: userId,
          status: "Accept",
        },
        "createdAt"
      );
      let result = await userProfileService.update(
        { userId: userId },
        { no_of_followers: noOfFollower["count"] }
      );
      console.log(result);
      // update in followingId user
      const noOfFollowing = await userFollowersService.findAndCountAll(
        ["id", "userId", "followerId", "status"],
        {
          followerId: followerId,
          status: "Accept",
        },
        "createdAt"
      );
      let result2 = await userProfileService.update(
        { userId: followerId },
        { no_of_following: noOfFollowing["count"] }
      );
      console.log(result2);

      console.log(noOfFollower);
      console.log(noOfFollowing);

      return res.status(STATUSCODE.success).json({
        msg: "Action Complated Sucessfully",
        noOfFollower: noOfFollower,
        noOfFollowing: noOfFollowing,
      });
    } else {
      return res.status(STATUSCODE.failure);
    }
  } catch (e) {
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const getuser_accepted_followers_following = async (req, res) => {
  try {
    let condition1 = { userId: req.params.userId, status: "Accept" };
    let followers = await userFollowersService.findAll(condition1);
    let condition2 = { followerId: req.params.userId, status: "Accept" };
    let following = await userFollowersService.findAll(condition2);

    return res.status(STATUSCODE.success).json({
      msg: "sucessfully fatch user follwer and following",
      followers: followers,
      following: following,
    });
  } catch (e) {
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

module.exports = {
  do_undo_Following: do_undo_Following,
  getAllFollowers: getAllFollowers,
  getAllFollowing: getAllFollowing,
  updateFollowingRequest: updateFollowingRequest,
  getuser_accepted_followers_following: getuser_accepted_followers_following,
};
