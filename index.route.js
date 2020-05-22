const express = require('express')
const userRoutes = require('./server/user/user.route')
const authRoutes = require('./server/auth/auth.route')
const suitRoutes = require('./server/suit/suit.route')
const statuteRoutes = require('./server/statute/statute.route')

const router = express.Router() // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'))

// mount user routes at /users
router.use('/users', userRoutes)

// mount auth routes at /auth
router.use('/auth', authRoutes)

// mount suit routes at /suits
router.use('/suits', suitRoutes)

// mount suit routes at /suits
router.use('/statutes', statuteRoutes)

module.exports = router
