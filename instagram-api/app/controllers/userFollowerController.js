const userFollowersService = require("../services/userFollowers.service");
const { STATUSCODE } = require("../config/constant");

const do_undo_Following = async (req, res) => {
  try {
    let data = {
      userId: req.body.userId,
      followerId: req.body.followerId,
    };

    let isExist = await userFollowersService.findOne({ userId: req.body.userId, followerId: req.body.followerId });

    if (isExist) {
      let deleteRecord = await userFollowersService.deleteRecord(data);
      if (deleteRecord) {
        return res
          .status(STATUSCODE.success)
          .json({ msg: "remove follower", deleteRecord: deleteRecord });
      } else {
        return res
          .status(STATUSCODE.failure)
          .json({ msg: "not remove follower" });
      }
    } else {
      let addedFollower = await userFollowersService.create(data);
      if (addedFollower) {
        return res
          .status(STATUSCODE.success)
          .json({ msg: "added follower", addedFollower: addedFollower });
      } else {
        return res.status(STATUSCODE.failure);
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({ msg: "Something wrong" });
  }
};

const getAllFollowers = async(req,res)=>{
    try{
        let allFollowers = await userFollowersService.findAll({userId:req.params.userId})
        if(allFollowers){
            return res.status(STATUSCODE.success).json({msg:"get all followers", allFollowers:allFollowers})
        } 
        return res.status(STATUSCODE.failure).json({msg:"No data found"})
    } catch (e) {
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
}

const getAllFollowing = async(req,res)=>{
    try{
        let allFollowing = await userFollowersService.findAll({followerId:req.params.userId})
        if(allFollowing){
            return res.status(STATUSCODE.success).json({msg:"get all Following users", allFollowing:allFollowing})
        } 
        return res.status(STATUSCODE.failure).json({msg:"No data found"})
    } catch (e) {
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
}


module.exports = {
  do_undo_Following: do_undo_Following,
  getAllFollowers:getAllFollowers,
  getAllFollowing:getAllFollowing
};
