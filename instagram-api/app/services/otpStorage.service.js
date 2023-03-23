const otpStorage = require('../models/otpStorage.model')

const create =  async (data) => {
	return await otpStorage.create(data)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

const findOne = async(attributes,data)=>{
    return await otpStorage.findOne({
        attributes: attributes,
        where: data
    })
}

const update = async (params, data) => {
	return await otpStorage.update(data, { where: params })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

deleteRecord = async (condition) => {
	return await otpStorage.destroy({ where: condition })
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
    deleteRecord:deleteRecord
}