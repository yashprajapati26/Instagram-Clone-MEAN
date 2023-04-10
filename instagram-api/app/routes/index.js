const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userProfileController = require("../controllers/userProfileController");
const postController = require("../controllers/postController");
const likedPostController = require("../controllers/likedPostController");
const { celebrate, Segments } = require("celebrate");
const { signup, login } = require("../validators/auth.validator");
const { comment } = require("../validators/comment.validator");
const multer = require("multer");
const cmtPostController = require("../controllers/cmtPostController");
const userFollowerController = require("../controllers/userFollowerController");
const notificationController = require("../controllers/notificationController");

// local storage for save post images
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/posts");
  },
  filename: function (req, file, callback) {
    callback(null, "Post" + Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });

// auth routes
router.post(
  "/signup",
  celebrate({ [Segments.BODY]: signup }),
  authController.signup
);
router.post(
  "/login",
  celebrate({ [Segments.BODY]: login }),
  authController.login
);
router.post("/otpverify", authController.otpverify);
router.get("/userdetails/:userId", authController.userdetails);
router.get("/getallusers", authController.getAllUsers);

// profile routes
router.get("/getuserprofile/:userId", userProfileController.getUserProfileInfo);
router.post("/createprofile", userProfileController.createProfile);

//post routes
router.post("/createpost", upload.array("files", 4), postController.createPost);
router.get("/getuserpost/:userId", postController.getAllPosts);
router.get("/deletepost/:postId", postController.deletePost);
//feed
router.get("/getfeeds", postController.getFeeds);
router.get("/getsinglepost/:postId", postController.getSinglePost);

//liked-disliked post routes
router.get(
  "/like-dislike-post/:postId/:userId",
  likedPostController.LikeDislikePost
);
router.get("/getliked/:userId", likedPostController.getAllLiked);

// comment routes
router.post(
  "/add-comment",
  celebrate({ [Segments.BODY]: comment }),
  cmtPostController.createComment
);

// userFollowers routes
router.post("/do-undo-following", userFollowerController.do_undo_Following);
router.get("/getfollowers/:userId", userFollowerController.getAllFollowers);
router.get("/getfollowing/:userId", userFollowerController.getAllFollowing);
router.post("/updateFollowingRequest", userFollowerController.updateFollowingRequest)
router.get("/getuser_accepted_followers_following/:userId", userFollowerController.getuser_accepted_followers_following)


// notication routes

router.get("/getcmtsNotification/:userId",notificationController.getCmtsNotification)
router.get("/getfollowerNotification/:userId",notificationController.getFollowNotification)
router.get("/getlikedNotification/:userId",notificationController.getLikedNotification)




module.exports = router;
