const Marathon = require('./marathonModel')
const User = require('../user/userModel')
const logger = require('../../services/logger.service')

module.exports = {
    query,
    addMarathon,
    signToMarathon,
}

async function query(filterBy = {}) {
    let query = Marathon.find();
    if (filterBy) {
        query = query.where(filterBy);
    }
    return await query.exec();
}

async function addMarathon(marathon) {

    const teacher = await User.findById(marathon.teacherId);
    if (!teacher || !teacher.isTeacher) {
        throw new Error('Teacher not found');
    }

    const marathonToAdd = {
        subject: marathon.subject,
        teacherId: teacher._id,
        school: marathon.school,
        time: marathon.time,
        date: marathon.date,
        price: marathon.price || 100,
        paymentLink: marathon.paymentLink,
    };
    return await Marathon.create(marathonToAdd);
}

async function signToMarathon(marathonId, studentId) {
    const marathonToSign = await Marathon.findById(marathonId);
    if (!marathonToSign) {
        throw new Error('Marathon not found');
    }
    marathonToSign.students.push(studentId);
    return await marathonToSign.save();

}