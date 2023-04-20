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
const { passport } = require("../controllers/oauthController");
// local storage for save post images
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/posts");
  },
  filename: function (req, file, callback) {
    callback(null, "Post" + Date.now() + file.originalname);
  },
});

var storage2 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/profile_images");
  },
  filename: function (req, file, callback) {
    callback(null, "profile" + Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });
var profile_upload = multer({ storage: storage2 });

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
router.get("/searchuser/:searchKey", authController.searchUser);

// profile routes
router.get("/getuserprofile/:userId", userProfileController.getUserProfileInfo);
router.post(
  "/createprofile",
  profile_upload.single("file"),
  userProfileController.createProfile
);

//post routes
router.post("/createpost", upload.array("files", 4), postController.createPost);
router.get("/getuserpost/:userId", postController.getAllPosts);
router.delete("/deletepost/:postId", postController.deletePost);
//feed
router.post("/getfeeds", postController.getFeeds);
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
router.post(
  "/updateFollowingRequest",
  userFollowerController.updateFollowingRequest
);
router.get(
  "/getuser_accepted_followers_following/:userId",
  userFollowerController.getuser_accepted_followers_following
);

// notication routes

router.get(
  "/getcmtsNotification/:userId",
  notificationController.getCmtsNotification
);
router.get(
  "/getfollowerNotification/:userId",
  notificationController.getFollowNotification
);
router.get(
  "/getlikedNotification/:userId",
  notificationController.getLikedNotification
);

router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "http://localhost:4200/login" }),
  function (req, res) {
    var headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = '86400'; // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    console.log("--------> log in via github")
    // Successful authentication, redirect home.
    res.redirect("http://localhost:4200");
  }
);

module.exports = router;
