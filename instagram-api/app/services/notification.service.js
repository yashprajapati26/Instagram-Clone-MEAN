const Notification = require("../models/notification.model");
const likedPost = require("../models/likedPost.model");
const CmtPost = require("../models/cmtPost.model");
const userFollowers = require("../models/userFollowers.model");
const Users = require("../models/users.model");
const userProfile = require("../models/userProfile.model");

const create = async (data) => {
  return await Notification.create(data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const findOne = async (attributes,data) => {
  return await Notification.findOne({
    attributes: attributes,
    where: data,
  });
};

const update = async (data,condition) => {
  return await Notification.update(data, { where: condition })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const deleteRecord = async (condition) => {
  return await Notification.destroy({ where: condition })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const findAll = async (condition, modelname) => {
  return await Notification.findAll({
    where: condition,
    include: [
      {
        model: modelname,
        include: [
          {
            model: Users,
            attributes : ["id","firstName","lastName","username"],
            include : {
              model : userProfile,
              attributes : ["id","profile_img"]
            }
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


const findAndCountAll = async (attributes, condition, limit, offset, sorting) => {
  return await Notification.findAndCountAll({
          attributes: attributes,
          where: condition,
          order: sorting,
      })
      .then((res) => {
          return res;
      })
      .catch((err) => {
          console.error(err);
          throw err;
      });
};


Notification.belongsTo(likedPost, {
  foreignKey: "notificationId",
  onDelete: 'cascade'
});
Notification.belongsTo(CmtPost, {
  foreignKey: "notificationId",
});
Notification.belongsTo(userFollowers, {
  foreignKey: "notificationId",
});

userFollowers.belongsTo(Users, {
  foreignKey: "followerId",
});

likedPost.belongsTo(Users, {
  foreignKey: "likedBy",
});

CmtPost.belongsTo(Users, {
  foreignKey: "cmtBy",
});

Users.hasOne(userProfile, {
  foreignKey: "userId",
});


module.exports = {
  create: create,
  findOne: findOne,
  update: update,
  deleteRecord: deleteRecord,
  findAll: findAll,
  findAndCountAll:findAndCountAll
};
