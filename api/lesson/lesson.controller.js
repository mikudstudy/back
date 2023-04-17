const lessonService = require('./lesson.service')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const {validateToken} = require("../auth/auth.service");

module.exports = {
    getLessons,
    approveLesson,
    getLessonsByUser,
    getWaitingLessons,
    addLesson,
    updateLesson,
    deleteLesson,
}

async function addLesson(req, res) {
    try {
        const lesson = req.body
        const student = await userService.query({email: lesson.studentEmail}) // get the student from the DB
        const user = validateToken(req.session.loginToken); // get the user from the token
        if (!student) {
            return res.status(400).send('Student not found');
        }
        lesson.studentId = student._id; // add the student id to the lesson object
        lesson.teacherId = user._id; // add the teacher id to the lesson object
        lesson.approved = user.isAdmin; // if the teacher is an admin, the lesson is approved
        delete lesson.studentEmail; // remove the email from the lesson object
        const addedLesson = await lessonService.addLesson(lesson)
        student.isStudent = true;
        await userService.update(student); // update the student to be a student in the DB
        res.json(addedLesson)
    } catch (err) {
        logger.error('Failed to add lesson', err.message)
        res.status(401).send({message: 'Failed to add lesson: ' + err.message})
    }
}

async function getWaitingLessons(req, res) {
    try {
        const lessons = await lessonService.query({approved: false})
        logger.debug('lessons: ', lessons);
        res.json(lessons);
    } catch (err) {
        logger.error('Failed to get lessons', err.message)
        res.status(400).send({message: 'Failed to get lessons: ' + err.message})
    }
}

async function getLessons(req, res) {
    try {
        const lessons = await lessonService.query({approved: true})
        logger.debug('lessons: ', lessons);
        res.json(lessons);
    } catch (err) {
        logger.error('Failed to get lessons', err.message)
        res.status(400).send({message: 'Failed to get lessons: ' + err.message})
    }
}

async function approveLesson(req, res) {
    try {
        const {id} = req.params
        const approvedLesson = await lessonService.approve(id)
        res.json(approvedLesson)
    } catch (err) {
        logger.error('Failed to approve lesson', err.message)
        res.status(400).send({message: 'Failed to approve lesson: ' + err.message})
    }
}

async function getLessonsByUser(req, res) {
    try {
        const user = validateToken(req.session.loginToken); // get the user from the token
        const [lessonsTeach, lessonsLearn] = await Promise.all([
            lessonService.query({teacherId: user._id , approved: true}),
            lessonService.query({studentId: user._id , approved: true})
        ]);
        logger.debug("lessons student: ", lessonsLearn);
        logger.debug("lessons teacher: ", lessonsTeach);
        res.json({lessonsTeach,lessonsLearn});
    } catch (err) {
        logger.error('Failed to get lessons', err.message)
        res.status(400).send({message: 'Failed to get lessons: ' + err.message})
    }
}

async function updateLesson(req, res) {
    try {
        const {id} = req.params
        const lesson = req.body
        logger.debug('update lesson ', lesson);
        const updatedLesson = await lessonService.update(id,lesson)
        res.json(updatedLesson)
    } catch (err) {
        logger.error('Failed to update lesson', err.message)
        res.status(400).send({message: 'Failed to update lesson: ' + err.message})
    }
}

async function deleteLesson(req, res) {
    try {
        const {id} = req.params
        const deletedLesson = await lessonService.deleteLesson(id)
        res.json(deletedLesson)
    } catch (err) {
        logger.error('Failed to delete lesson', err.message)
        res.status(400).send({message: 'Failed to delete lesson: ' + err.message})
    }
}