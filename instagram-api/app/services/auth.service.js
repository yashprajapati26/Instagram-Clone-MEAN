const Users = require('../models/users.model')

const create =  async (data) => {
	return await Users.create(data)
		.then((user) => {
			return user;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

const findOne = async(attributes,data)=>{
    return await Users.findOne({
        attributes: attributes,
        where: data
    })
}

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



const findAll = async(condition) => {
	return await Users.findAll({
		where: condition,
	}).then((res)=>{
		return res;
	}).catch((err)=>{
		console.error(err);
		throw err;
	})
}

module.exports = {
	create: create,
    findOne:findOne,
    update:update,
	deleteRecord:deleteRecord,
	findAll:findAll
}