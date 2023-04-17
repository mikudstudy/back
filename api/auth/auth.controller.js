const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)
        logger.info('User login', JSON.stringify(user));
        req.session.loginToken = loginToken
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' ,err.message)
        res.status(400).send({ err: 'Failed to Login ' + err.message })
    }
}

async function signup(req, res) {
    try {
        const credentials = req.body
        const account = await authService.signup(credentials)
        logger.debug(`auth.route - new account created ` , JSON.stringify(account))
        const user = await authService.login(
            credentials.username,
            credentials.password
        )
        logger.info('User signup:', user)
        req.session.loginToken=authService.getLoginToken(user);
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup' , err.message)
        res.status(400).send({ message: 'Failed to signup: ' + err.message })
    }
}

async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ message: 'Logged out successfully' })
    } catch (err) {
        res.status(400).send({ message: 'Failed to logout: ' + err.message })
    }
}

module.exports = {
    login,
    signup,
    logout,
}
