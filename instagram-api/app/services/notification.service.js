const Notification = require("../models/notification.model");

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

const findOne = async (data) => {
  return await Notification.findOne({
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
  return await Notification.update(data, { where: params })
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

const findAll = async (condition) => {
  return await Notification.findAll({
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



module.exports = {
	create: create,
    findOne:findOne,
    update:update,
    deleteRecord:deleteRecord,
    findAll:findAll
}
