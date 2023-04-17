const express = require('express')
const controller = require('./marathon.controller')
const {requireAdmin, requireAuth} = require("../../middlewares/requireAuth.middleware");
const router = express.Router()

router.get('/', controller.getMarathons)
router.get('/my', requireAuth,controller.getMyMarathons) // only admin can get all lessons
router.post('/',requireAdmin, controller.addMarathon) // only admin can add lessons
router.put('/sign/:id', requireAuth, controller.signToMarathon)

module.exports = router
