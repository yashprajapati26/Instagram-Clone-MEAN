const postImages = require("../models/postImages.model");
const Post = require("../models/post.model");

const create = async (data) => {
  return await postImages
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
  return await postImages.findOne({
    // attributes: attributes,
    where: data,
    include: [
      {
        model: Post,
        attributes: ["id", "content", "userId"],
      },
    ],
  });
};

const update = async (params, data) => {
  return await postImages
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
  return await postImages
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
        },
        {
          model: LikedPost,
          attributes: ["id", "postId", "likedBy"],
        },
        {
          model: CmtPost,
          attributes: ["id", "postId", "cmtBy", "parentId"],
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

postImages.belongsTo(Post);

module.exports = {
  create,
  findOne,
  update,
  deleteRecord,
  findAll,
};
