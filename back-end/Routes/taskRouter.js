

// const express = require('express');
// const router = express.Router();
// const { createTask, getAllTasks, updateTask, deleteTask } = require('../Controllers/taskControllers');

// // Route to create a new task
// router.post('/tasks', createTask);

// // Route to get all tasks
// router.get('/tasks', getAllTasks);

// // Route to update a task
// router.put('/tasks/:id', updateTask);

// // Route to delete a task (soft delete)
// router.delete('/tasks/:id', deleteTask);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, updateTask, deleteTask } = require('../Controllers/taskControllers');

// Route to create a new task
router.post('/tasks', createTask);

// Route to get all tasks
router.get('/tasks', getAllTasks);

// Route to update a task
router.put('/tasks/:id', updateTask);

// Route to delete a task (soft delete)
router.delete('/tasks/:id', deleteTask);

module.exports = router;
