const express = require('express')
const router = express.Router()
const authController = require('../controllers/AuthController')
const passport = require('passport')
const passportConfig = require('../middlewares/passport')
const { validateBody, schemas } = require('../helpers/routerHelpers')

router.post('/register', authController.register)
router.post(
    '/login',
    validateBody(schemas.loginSchema),
    passport.authenticate('local', { session: false }),
    authController.login)
router.get('/secret', passport.authenticate('jwt', { session: false }))

module.exports = router