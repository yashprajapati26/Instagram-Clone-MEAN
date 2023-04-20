const CmtPost = require("../models/cmtPost.model");
const LikedPost = require("../models/likedPost.model");
const post = require("../models/post.model");
const postImages = require("../models/postImages.model");
const Users = require("../models/users.model");
const userProfile = require("../models/userProfile.model");
const create = async (data) => {
  return await post
    .create(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const findOne = async (data) => {
  return await post.findOne({
    // attributes: attributes,
    where: data,
    include: [
      {
        model: postImages,
        attributes: ["id", "postId", "imagePath"],
      },
      {
        model: Users,
        attributes: ["id", "username", "firstName", "lastName"],
        include: {
          model: userProfile,
          attributes: ["id", "profile_img"],
        },
      },
      {
        model: LikedPost,
        attributes: ["id", "postId", "likedBy"],
      },
      {
        model: CmtPost,
        attributes: ["id", "postId", "cmtBy", "comment", "parentId"],
        include: { model: Users, as: "byUser", attributes: ["id", "username"] },
      },
    ],
  });
};

const update = async (params, data) => {
  return await post
    .update(data, { where: params })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const deleteRecord = async (condition) => {
  return await post
    .destroy({ where: condition })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const findAll = async (condition, limit, offset) => {
  return await post
    .findAll({
      where: condition,
      include: [
        {
          model: postImages,
          attributes: ["id", "postId", "imagePath"],
        },
        {
          model: Users,
          attributes: ["id", "username", "firstName", "lastName"],
          include: {
            model: userProfile,
            attributes: ["id", "profile_img"],
          },
        },
        {
          model: LikedPost,
          attributes: ["id", "postId", "likedBy"],
        },
        {
          model: CmtPost,
          attributes: ["id", "postId", "cmtBy", "comment", "parentId"],
          include: {
            model: Users,
            as: "byUser",
            attributes: ["id", "username"],
          },
        },
      ],
      order: [["created_at", "DESC"]],
      limit,
      offset,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

post.belongsTo(Users);

CmtPost.belongsTo(Users, {
  foreignKey: "cmtBy",
  as: "byUser",
});

post.hasMany(postImages);
post.hasMany(LikedPost);
post.hasMany(CmtPost);

Users.hasOne(userProfile, {
  foreignKey: "userId",
});

// userProfile.belongsTo(Users);
module.exports = {
  create: create,
  findOne: findOne,
  update: update,
  deleteRecord: deleteRecord,
  findAll: findAll,
};
