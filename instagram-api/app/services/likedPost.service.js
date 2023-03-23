const post = require('../models/post.model');
const likedPost = require('../models/likedPost.model');
const Users = require('../models/users.model') 

const create =  async (data) => {
	return await likedPost.create(data)
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

const findOne = async(data)=>{
    return await likedPost.findOne({
        // attributes: attributes,
        where: data,
		include: [
			{
				model: post,
				attributes: ["id","userId","content"],
			},
		]
    })
}

const update = async (params, data) => {
	return await likedPost.update(data, { where: params })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

const deleteRecord = async (condition) => {
	return await likedPost.destroy({ where: condition })
		.then((res) => {
			return res;
		})
		.catch((err) => {
			console.error(err);
			throw err;
		});
};

const findAll = async(condition) => {
	return await likedPost.findAll({
		where: condition,
		include: [
			{
				model: Users,
				attributes: ["id","username"],
			},
		]
	}).then((res)=>{
		return res;
	}).catch((err)=>{
		console.error(err);
		throw err;
	})
}

likedPost.belongsTo(Users);
likedPost.belongsTo(post);

// likedPost.hasMany(post);

module.exports = {
	create: create,
    findOne:findOne,
    update:update,
    deleteRecord:deleteRecord,
	findAll:findAll
}