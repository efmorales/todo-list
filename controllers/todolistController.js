const toDoModel = require("../models/todolistModel");

// 1. Create Task
// 2. Update Task (Mark as Completed/ Uncompleted)
// 3. Delete Task 
// 4. Delete Multipl Tasks 
// 5. Create Muliple Tasks
// 6. Display all Tasks 

// 1. create a new to do item
async function createToDoItem(req, res) {

    try{

        // get the to do item from the request body
        const toDoItem = req.body;
        // create a new to do item
        const newToDoItem = new toDoModel(toDoItem);
        // save the new to do item
        await newToDoItem.save();
        // send the new to do item back to the client
        res.status(201).json(newToDoItem);

    } catch (error) {
        res
        .status(500)
        .json({error: error.message});
    }
}

// 2. update a to do item (mark as completed/uncompleted)

async function updateToDoItem(req, res) {
    try {
        // get the to do item id from the request params
        const { id } = req.params;
        // get the to do item from the request body
        const toDoItem = req.body;
        // find the to do item by id and update it
        const updated = await toDoModel.findOneAndUpdate(id, toDoItem);
        // send the updated to do item back to the client
        res
        .status(200)
        .json(updated);
    } catch (error) {
        res
        .status(500)
        .json({error: error.message});
    }
}

// 3. delete a to do item

async function deleteToDoItem(req, res) {
    try {
        // get the to do item id from the request params
        const { id } = req.params;
        // find the to do item by id and delete it
        const deleted = await toDoModel.findOneAndDelete(id);
        // if the to do item doesn't exist return 404
        if (!deleted) {
            return res
            .status(404)
            .send("To Do Item not found");
        }
        // send the deleted to do item back to the client
        res
        .status(200)
        .send("To Do Item deleted");
    } catch (error) {
        res
        .status(500)
        .json({error: error.message});
    }
}

// 4. delete multiple to do items

async function deleteMultipleToDoItems(req, res) {
    try {
        // get the to do item ids from the request body
        const { ids } = req.body;
        // find the to do items by id and delete them
        const deleted = await toDoModel.deleteMany({
            id: {
                $in: ids
            }
        });
        // if the to do items don't exist return 404
        if (!deleted) {
            return res
            .status(404)
            .send("To Do Items not found");
        }
        // send the deleted to do items back to the client
        res
        .status(200)
        .send("To Do Items deleted");
    } catch (error) {
        res
        .status(500)
        .json({error: error.message});
    }
}

// 5. create multiple to do items

async function createMultipleToDoItems(req, res) {
    try {
        // get the to do items from the request body
        const toDoItems = req.body;
        // create multiple to do items
        const newToDoItems = await toDoModel.insertMany(toDoItems);
        // send the new to do items back to the client
        res
        .status(201)
        .json({
            success: true,
            newToDoItems
        });
    } catch (error) {
        res
        .status(500)
        .json({error: error.message});
    }
}


// 6. get all to do items
async function getAllToDoItems(req, res) {
    try {
        // get all to do items from the database
        const toDoItems = await toDoModel.find({});
        // send the to do items back to the client
        res
        .status(200)
        .json({todoList: toDoItems});
    } catch (error) {
        res
        .status(500)
        .json({error: error.message});
    }
}


module.exports = {
    createToDoItem,
    getAllToDoItems,
    updateToDoItem,
    deleteToDoItem,
    deleteMultipleToDoItems,
    createMultipleToDoItems
}