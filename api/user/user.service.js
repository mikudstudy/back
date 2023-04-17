const User = require('./userModel')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    update,
    getByField,
    validate,
    add,
}

async function validate(params) {
    const { email, phone, username } = params;
    return await User.findOne({$or: [{email}, {phone}, {username}]});
}

async function query(filterBy) {
    let query = User.find();
    if (filterBy) {
        query = query.where(filterBy);
    }
    return await query.exec();
}

async function getByField(field, value) {
    try {
        const query = {};
        query[field] = value;
        return await User.findOne(query);
    } catch (err) {
        logger.error(`while finding user by ${field} ${value}`, err);
        throw err;
    }
}

async function remove(userId) {
    await User.deleteOne({_id: ObjectId(userId)})
}

async function update(userId,user) {
    return await User.findByIdAndUpdate(userId, user, {new: true})
}

async function add(user) {

    user.isAdmin = user.isAdmin || false
    user.isTeacher = user.isTeacher || false
    user.isStudent = user.isStudent || false

    return await User.create(user);
}
