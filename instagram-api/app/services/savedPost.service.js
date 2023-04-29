const savedPost = require("../models/savedPost.model");
const Users = require("../models/users.model");
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
          model: Users,
          attributes: ["id", "username", "firstName", "lastName", "email"],
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

module.exports = {
  create,
  deleteRecord,
  findAll,
};
