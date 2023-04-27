const userFollowers = require("../models/userFollowers.model");
const userProfile = require("../models/userProfile.model");
const Users = require("../models/users.model");

const create = async (data) => {
  return await Users.create(data)
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const findOne = async (attributes, data) => {
  return await Users.findOne({
    attributes: attributes,
    where: data,
    include: [
      {
        model: userProfile,
        attributes: ["id", "userId", "profile_img"],
      },
      {
        model: userFollowers,
        attributes: ["id", "userId", "followerId", "status"],
      },
      ],
  });
};

const update = async (params, data) => {
  return await Users.update(data, { where: params })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

deleteRecord = async (condition) => {
  return await Users.destroy({ where: condition })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const findAll = async (attributes, condition) => {
  return await Users.findAll({
    attributes: attributes,
    where: condition,
    include: [
      {
        model: userFollowers,
        attributes: ["id", "userId", "followerId", "status"],
      },
      {
        model: userProfile,
        attributes: ["id", "userId", "profile_img"],
      },
    ],
    // order: [["created_at", "DESC"]],
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

Users.hasMany(userFollowers);
Users.hasOne(userProfile, {
  forignkey: "userId",
});

module.exports = {
  create,
  findOne,
  update,
  deleteRecord,
  findAll,
};
