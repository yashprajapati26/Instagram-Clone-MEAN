const userFollowers = require("../models/userFollowers.model");
const Users = require("../models/users.model")

const create = async (data) => {
    return await userFollowers
        .create(data)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const findOne = async (data) => {
    return await userFollowers.findOne({
        // attributes: attributes,
        where: data,
        include: [{
            model: Users,
            attributes: [
                "id",
                "username",
                "firstName",
                "lastName",
                "mobile",
                "email",
            ],
        }, ],
    });
};

const update = async (params, data) => {
    return await userFollowers
        .update(data, {
            where: params
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

const deleteRecord = async (condition) => {
    return await userFollowers
        .destroy({
            where: condition
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
    return await userFollowers
        .findAll({
            where: condition,
            include: [{
                    model: Users,
                    as: "asuser",
                    attributes: ["id", "username", "firstName", "lastName", "email"],
                },
                {
                    model: Users,
                    as: "asfollower",
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

userFollowers.hasMany(Users);

userFollowers.belongsTo(Users, {
    foreignKey: "userId",
    as: "asuser",
});
userFollowers.belongsTo(Users, {
    foreignKey: "followerId",
    as: "asfollower",
});

module.exports = {
    create: create,
    findOne: findOne,
    update: update,
    deleteRecord: deleteRecord,
    findAll: findAll,
};