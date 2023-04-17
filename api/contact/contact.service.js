const Contact = require("../contact/contactModel");
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    add,
    update,
    remove,
}

async function query(filterBy = {}) {
    let query = Contact.find();
    if (filterBy) {
        query = query.where(filterBy);
    }
    return await query.exec();
}

async function remove(contactId) {
    await Contact.deleteOne({_id: ObjectId(contactId)})
}

async function update(contactId,contact) {
    return await Contact.findByIdAndUpdate(contactId, contact, {new: true})
}

async function add(contactData) {
    return await Contact.create(contactData);
}