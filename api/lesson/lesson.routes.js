const express = require('express')
const controller = require('./lesson.controller')
const {requireAdmin, requireAuth} = require("../../middlewares/requireAuth.middleware");
const router = express.Router()

router.use(requireAuth);

router.get('/', controller.getLessonsByUser)
router.get('/all', requireAdmin, controller.getLessons) // get all lessons
router.get('/waiting', requireAdmin, controller.getWaitingLessons) // get all lessons that are not approved yet (waiting for approval)
router.put('/approve/:id', requireAdmin, controller.approveLesson) // approve a lesson
router.post('/', controller.addLesson)
router.put('/:id', controller.updateLesson);
router.delete('/:id', controller.deleteLesson)

module.exports = router
