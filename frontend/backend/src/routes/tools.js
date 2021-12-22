const { Router } = require('express')
const router = Router()

const { getTools, createTool, updateTool, deleteTool, getTool} = require('../controllers/tools.controller')

router.route('/')
    .get(getTools)
    .post(createTool)

router.route('/:id')
    .put(updateTool)
    .delete(deleteTool)
    .get(getTool)


module.exports = router;