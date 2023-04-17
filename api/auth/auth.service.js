const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

async function login(username, password) {
    logger.debug(`auth.service - login with username, password: ${username}, ${password}`)

    const user = await userService.getByField('username', username)
    const match = await bcrypt.compare(password, user.password)

    if (!user || !match) return Promise.reject({message:'Invalid username or password'})
    return user
}

async function signup(user) {
    const {username, password, fullName} = user;
    logger.debug(`auth.service - signup with username: ${username}, fullName: ${fullName}`)
    if (!username || !password || !fullName) return Promise.reject({message:'Missing required signup information'})

    const userExist = await userService.getByField('username', username)
    if (userExist) return Promise.reject({message:'Username already exist'})
    return userService.add(user)
}


function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}


function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        return JSON.parse(json)

    } catch (err) {
        logger.error('Cannot validate token', err.message)
    }
    return null
}


module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}