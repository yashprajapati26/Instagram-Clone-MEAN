const storyUser = require("../models/storyUser.model");
const Users = require("../models/users.model");
const create = async (data) => {
  return await storyUser
    .create(data)
    .then((story) => {
      return story;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const deleteRecord = async (condition) => {
  return await storyUser
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
  return await storyUser
    .findAll({
      where: condition,
      include: [
        {
          model: Users,
          attributes: ["id", "username", "firstName", "lastName", "email"],
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

storyUser.belongsTo(Users);

module.exports = {
  create,
  deleteRecord,
  findAll,
};
