const express = require('express')
const { requireAuth} = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser, addUser, validateNewUser} = require('./user.controller')
const router = express.Router()

router.use(requireAuth)

router.get('/', getUsers)
router.get('/current', getUser)
router.put('/:id', updateUser)
router.post('/', addUser)
router.put('/', updateUser)
router.delete('/:id', deleteUser)
router.post('/validate', validateNewUser)

// router.delete('/:id', deleteUser)

module.exports = router
