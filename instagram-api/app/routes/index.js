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
const { verifyToken } = require("../middleware/auth.middleware");
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

router.get("", async (req, res) => {
  return res.send("welcome to instagram backend");
});

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
router.get("/userdetails/:userId", verifyToken, authController.userdetails);
router.get("/getallusers", verifyToken, authController.getAllUsers);
router.get("/searchuser/:searchKey", verifyToken, authController.searchUser);

// profile routes
router.get(
  "/getuserprofile/:userId",
  verifyToken,
  userProfileController.getUserProfileInfo
);
router.post(
  "/createprofile",
  profile_upload.single("file"),
  userProfileController.createProfile
);

//post routes
router.post(
  "/createpost",
  verifyToken,
  upload.array("files", 4),
  postController.createPost
);
router.get("/getuserpost/:userId", verifyToken, postController.getAllPosts);
router.delete("/deletepost/:postId", verifyToken, postController.deletePost);
//feed
router.post("/getfeeds", verifyToken, postController.getFeeds);
router.get("/getsinglepost/:postId", verifyToken, postController.getSinglePost);

//liked-disliked post routes
router.get(
  "/like-dislike-post/:postId/:userId",
  verifyToken,
  likedPostController.LikeDislikePost
);
router.get("/getliked/:userId", verifyToken, likedPostController.getAllLiked);

// comment routes
router.post(
  "/add-comment",
  celebrate({ [Segments.BODY]: comment }),
  cmtPostController.createComment
);

// userFollowers routes
router.post(
  "/do-undo-following",
  verifyToken,
  userFollowerController.do_undo_Following
);
router.get(
  "/getfollowers/:userId",
  verifyToken,
  userFollowerController.getAllFollowers
);
router.get(
  "/getfollowing/:userId",
  verifyToken,
  userFollowerController.getAllFollowing
);
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
  "/readNotification/:userId",
  notificationController.readNotification
);
router.get("/newNotification/:userId", notificationController.newNotification);

// Oauth routes
router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "http://localhost:4200/login",
  }),
  function (req, res) {
    var headers = {};
    // IE8 does not allow domains to be specified, just the *
    // headers["Access-Control-Allow-Origin"] = req.headers.origin;
    headers["Access-Control-Allow-Origin"] = "*";
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["Access-Control-Allow-Credentials"] = false;
    headers["Access-Control-Max-Age"] = "86400"; // 24 hours
    headers["Access-Control-Allow-Headers"] =
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
    console.log("--------> log in via github");
    // Successful authentication, redirect home.
    res.redirect("http://localhost:4200");
  }
);

module.exports = router;
