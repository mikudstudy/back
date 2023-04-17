const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const controller = require('./contact.controller')
const router = express.Router()

router.get('/', controller.getContacts)
router.get('/:id', controller.getContact)
router.post('/', controller.addContact)
router.put('/:id', requireAuth, requireAdmin, controller.updateContact)
router.delete('/:id', requireAuth, requireAdmin, controller.deleteContact)


module.exports = router
