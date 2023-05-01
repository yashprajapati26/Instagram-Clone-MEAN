const Post = require("../models/post.model");
const postImages = require("../models/postImages.model");
const savedPost = require("../models/savedPost.model");
const Users = require("../models/users.model");

const findOne = async (data) => {
  return await savedPost
    .findOne({
      // attributes: attributes,
      where: data,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      throw err;
    });
};

const create = async (data) => {
  return await savedPost
    .create(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const deleteRecord = async (condition) => {
  return await savedPost
    .destroy({
      where: condition,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const findAll = async (condition) => {
  return await savedPost
    .findAll({
      where: condition,
      include: [
        {
          model: Post,
          attributes: ["id", "userId", "content"],
          include: [
            {
              model: postImages,
              attributes: ["id", "postId", "imagePath"],
            },
          ],
        },
      ],
      order: [["created_at", "DESC"]],
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

savedPost.belongsTo(Users);
savedPost.belongsTo(Post);

postImages.belongsTo(Post)

module.exports = {
  findOne,
  create,
  deleteRecord,
  findAll,
};
