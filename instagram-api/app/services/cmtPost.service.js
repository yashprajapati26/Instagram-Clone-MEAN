const post = require("../models/post.model");
const cmtPost = require("../models/cmtPost.model");
const Users = require("../models/users.model");

const create = async (data) => {
  return await cmtPost
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
  return await cmtPost.findOne({
    // attributes: attributes,
    where: data,
    include: [
      {
        model: post,
        attributes: ["id", "userId", "content"],
      },
      {
        model: Users,
        attributes: ["id", "username", "firstname", "lastname", "email"],
      },
      {
        model: cmtPost,
        as: "parent_cmt",
        attributes: [
          "id",
          "postId",
          "cmtBy",
          "comment",
          "parentId",
          "createdAt",
        ],
      },
    ],
  });
};

const update = async (params, data) => {
  return await cmtPost
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
  return await cmtPost
    .destroy({ where: condition })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const findAll = async (condition) => {
  return await cmtPost
    .findAll({
      where: condition,
      include: [
        {
          model: post,
          attributes: ["id", "userId", "content"],
        },
        {
          model: Users,
          as: "cmt_by",
          attributes: ["id", "username", "firstname", "lastname", "email"],
        },
        {
          model: cmtPost,
          as: "parent_cmt",
          attributes: [
            "id",
            "postId",
            "cmtBy",
            "comment",
            "parentId",
            "createdAt",
          ],
        },
      ],
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

cmtPost.belongsTo(Users, { foreignKey: "cmtBy", as: "cmt_by" });
cmtPost.belongsTo(post);
cmtPost.belongsTo(cmtPost, { foreignKey: "parentId", as: "parent_cmt" });

module.exports = {
  create,
  findOne,
  update,
  deleteRecord,
  findAll,
};
