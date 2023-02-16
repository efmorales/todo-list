const { v4: uuidv4 } = require('uuid');
var express = require('express');
var router = express.Router();

// const controller model
const todoController = require('../controllers/todolistController');

// get all to do items
router.get('/all', todoController.getAllToDoItems);

// create a new to do item
router.post('/create', todoController.createToDoItem);

// update a to do item
router.put('/update/:id', todoController.updateToDoItem);

// delete a to do item
router.delete('/delete/:id', todoController.deleteToDoItem);

// delete multiple to do items
router.delete('/delete', todoController.deleteMultipleToDoItems);

// create multiple to do items
router.post('/create/multiple', todoController.createMultipleToDoItems);

module.exports = router;
