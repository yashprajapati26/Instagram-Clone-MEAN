const { STATUSCODE } = require("../config/constant");
const postService = require("../services/post.service");
const postImages = require("../services/postImage.service");

const createPost = async (req, res) => {
  try {
    let data = { userId: req.body.userId, content: req.body.content };
    let post = await postService.create(data);
    if (post) {
      //save their photos
      if (req.files) {
        for (let i = 0; i < req.files.length; i++) {
          let body = { postId: post.id, imagePath: req.files[i].path };
          await postImages.create(body);
        }
      }
      return res.status(STATUSCODE.success).json({ msg: "Post Sucessfully uploaded" });
    }
    return res.status(STATUSCODE.failure).json({ msg: "Post not uploded" });
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    let userId = req.params.userId
    let userPost = await postService.findAll({userId:userId})
    if(userPost) return res.status(STATUSCODE.success).json({userPost:userPost})
    return res.status(STATUSCODE.success).json({msg : "No Post Found"})
  } catch (e) {
    console.log(e);
    return res.status(STATUSCODE.internal).json({
      msg: "something wrong",
      error: e,
    });
  }
};


const deletePost = async(req,res) => {
    try {
        let postId = req.params.postId
        let isDelete = await postService.deleteRecord({id:postId})
        if(isDelete) return res.status(STATUSCODE.success).json({msg:'Post Deleted'})
        return res.status(STATUSCODE.success).json({msg : "Something Wrong ! This Post Not found"})
      } catch (e) {
        console.log(e);
        return res.status(STATUSCODE.internal).json({
          msg: "something wrong",
          error: e,
        });
      }
}


const getFeeds = async(req,res) =>{
    try{
        let feeds = await postService.findAll()
        if(feeds) return res.status(STATUSCODE.success).json({feeds:feeds})
        return res.status(STATUSCODE.failure).json({msg:'Feeds not found'})
    }catch(e){
        console.log(e);
        return res.status(STATUSCODE.internal).json({
          msg: "something wrong",
          error: e,
        });
    }
}

const getSinglePost = async(req,res)=>{
    try{
        let postId = req.params.postId
        let post = await postService.findOne({id:postId})
        if(post) return res.status(STATUSCODE.success).json({post:post})
        return res.status(STATUSCODE.failure).json({msg:'post not found'})
    }catch(e){
        console.log(e);
        return res.status(STATUSCODE.internal).json({
          msg: "something wrong",
          error: e,
        });
    }
}


module.exports = {
  createPost: createPost,
  getAllPosts: getAllPosts,
  deletePost:deletePost,
  getFeeds:getFeeds,
  getSinglePost:getSinglePost
};
