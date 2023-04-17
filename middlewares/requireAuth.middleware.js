const authService = require('../api/auth/auth.service')
const logger = require('../services/logger.service')

function requireAuth(req, res, next) {
  if (!req?.session?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedInUser = authService.validateToken(req.session.loginToken)
  if (!loggedInUser) return res.status(401).send('Not Authenticated')
  next()
}

function requireAdmin(req, res, next) {
  if (!req?.session?.loginToken) return res.status(401).send('Not Authenticated')
  const loggedInUser = authService.validateToken(req.session.loginToken)
  logger.debug('loggedInUser', loggedInUser)
  if (!loggedInUser.isAdmin) {
    logger.warn(loggedInUser.fullName + 'attempted to perform admin action')
    return res.status(403).end('Not Authorized')
  }
  next()
}


// module.exports = requireAuth

module.exports = {
  requireAuth,
  requireAdmin
}
