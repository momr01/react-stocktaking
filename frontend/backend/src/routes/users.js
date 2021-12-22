const {Router} = require('express')
const router = Router()

const {getUser, createUser} = require('../controllers/users.controller')

router.route('/')
    .post(createUser)

router.route('/:email')
    .get(getUser)


module.exports = router