const userService = require('./user.service')
const logger = require('../../services/logger.service')
const {ObjectId} = require("mongodb");
const {validateToken} = require("../auth/auth.service");

module.exports = {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  addUser,
  validateNewUser,
}

async function getUser(req, res) {
  try {
    return res.json(validateToken(req.session.loginToken));
  } catch (err) {
    logger.error('Failed to get user: ', err.message)
    res.status(400).send({message: 'Failed to get user: ' + err.message})
  }
}

async function getUsers(req, res) {
  try {
    const { filterBy } = req.query;
    const users = await UserService.query(filterBy)
    res.send(users)
  } catch (err) {
    logger.error('Failed to get users: ', err.message)
    res.status(400).send({ message: 'Failed to get users: '+ err.message })
  }
}

async function deleteUser(req, res) {
  try {
    await userService.remove(req.params.id)
    res.send({ message: 'Deleted successfully' })
  } catch (err) {
    logger.error('Failed to delete user: ', err.message)
    res.status(400).send({ message: 'Failed to delete user: ' + err.message })
  }
}

async function updateUser(req, res) {
  try {
    const id = validateToken(req.session.loginToken)._id;
    const user = req.body
    const savedUser = await userService.update(id,user)
    res.send(savedUser)
  } catch (err) {
    logger.error('Failed to update user: ', err.message)
    res.status(400).send({ message: 'Failed to update user: ' + err.message })
  }
}

async function addUser(req, res) {
  try {
    const user = req.body
    const savedUser = await userService.add(user)
    res.send({message: 'User added successfully', user: savedUser})
  } catch (err) {
    logger.error('Failed to add user: ', err.message)
    res.status(400).send({ message: 'Failed to add user: ' + err.message })
  }
}

async function validateNewUser(req, res) {
    try {
        const user = await userService.validate(req.body)
        res.status(200).send(!!user)
    } catch (err) {
        logger.error('Failed to validate user: ', err.message)
        res.status(400).send({ message: 'Failed to validate user: ' + err.message })
    }
}