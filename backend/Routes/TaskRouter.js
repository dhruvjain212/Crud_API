const { fetchTask, addTask, deleteTask, editTask } = require('../Controllers/TaskController');


const router = require('express').Router();

//fetch tasks
router.get('/', fetchTask)

//add task
router.post('/', addTask)

//delete task
router.delete('/:taskId', deleteTask)

//edit task
router.put('/:taskId', editTask)

module.exports = router;