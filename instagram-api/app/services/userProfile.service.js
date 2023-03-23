const userProfile = require('../models/userProfile.model')
const Users = require("../models/users.model")
const create =  async (data) => {
	return await userProfile.create(data)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

const findOne = async(data)=>{
    return await userProfile.findOne({
        // attributes: attributes,
        where: data,
		include: [
			{
				model: Users,
				attributes: ["id","username","firstName","lastName","mobile","email"],
			},
		]
    })
}

const update = async (params, data) => {
	return await userProfile.update(data, { where: params })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

deleteRecord = async (condition) => {
	return await userProfile.destroy({ where: condition })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};


userProfile.belongsTo(Users);

module.exports = {
	create: create,
    findOne:findOne,
    update:update,
    deleteRecord:deleteRecord
}