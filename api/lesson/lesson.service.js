const ObjectId = require('mongodb').ObjectId
const Lesson = require('./lessonModel')
const logger = require('../../services/logger.service')

module.exports = {
    query,
    addLesson,
    approve,
    deleteLesson,
    update,
}

async function addLesson(lesson) {

    lesson.teacherId = ObjectId(lesson.teacherId);
    lesson.studentId = ObjectId(lesson.studentId);
    lesson.price = lesson.price || 100;

    return await Lesson.create(lesson);
}

async function query(filterBy = {}) {
    let query = Lesson.find();
    if (filterBy) {
        query = query.where(filterBy);
    }
    query.populate('teacherId', 'fullName');
    return await query.exec();
}

async function approve(lessonId) {
    const lessonToApprove = await Lesson.findById(lessonId);
    lessonToApprove.approved = true;
    return await lessonToApprove.save();
}

async function update(lessonId,lesson) {
    return await Lesson.findByIdAndUpdate(lessonId, lesson, {new: true})
}

async function deleteLesson(lessonId) {
    return await Lesson.findByIdAndDelete(lessonId);
}
