const toDoModel = require("../models/todolistModel");
const { v4: uuidv4 } = require("uuid");

// 1. Create Task
// 2. Update Task (Mark as Completed/ Uncompleted)
//  2.1 Update Task (Mark as Completed)
//  2.2 Update Task (Mark as Uncompleted)
// 3. Delete Task 
// 4. Delete Multipl Tasks 
// 5. Create Muliple Tasks
// 6. Display all Tasks 

// 1. create a new to do item with a unique uuid

async function createToDoItem(req, res) {
    try {
        // generate a unique id for the to do item
        const id = uuidv4();
        // verify that the request body has the required fields
        if (!req.body.name) {
            return res
                .status(400)
                .send("To Do Item name is required");
        }

        // get the to do item data from the request body
        const { name, description } = req.body;
        // create a new to do item with the data from the request body and the unique id
        const newToDoItem = await toDoModel.create({
            name,
            description,
            completed: false,
            dateCreated: Date.now(),
            status: 'incomplete',
            id,
        });
        // send the new to do item back to the client
        res
            .status(201)
            .json({
                success: true,
                newToDoItem
            });

    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
}

// 2.1 update a to do item (mark as completed)

async function completeToDoItem(req, res) {
    try {
        // get the to do item id from the request params
        const { id } = req.params;
        // find the to do item by id and update it to set completed to true and set the dateCompleted field to the current date and time
        const updated = await toDoModel.findOneAndUpdate(
            id,
            {
                completed: true,
                dateCompleted: Date.now(),
                status: 'complete'
            },
            {
                new: true
            }
        );
        // if the to do item doesn't exist return 404
        if (!updated) {
            return res
                .status(404)
                .send("To Do Item not found");
        }

        // send the updated to do item back to the client
        res
            .status(200)
            .json({
                success: true,
                updated
            });
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
}

// 2.2 update a to do item (mark as incompleted)

async function incompleteToDoItem(req, res) {
    try {
        // get the to do item id from the request params
        const { id } = req.params;
        // find the to do item by id and update it to set completed to false and set the dateCompleted field to null
        const updated = await toDoModel.findOneAndUpdate(
            id,
            {
                completed: false,
                dateCompleted: null,
                status: 'incomplete'
            },
            {
                new: true
            }
        );
        // if the to do item doesn't exist return 404
        if (!updated) {
            return res
                .status(404)
                .send("To Do Item not found");
        }
        // send the updated to do item back to the client
        res
            .status(200)
            .json({
                success: true,
                updated
            });
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
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
            .json({ error: error.message });
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
            .json({ error: error.message });
    }
}

// 5. create multiple to do items

async function createMultipleToDoItems(req, res) {
    try {
        // verify the request body is an array with at least one item and a "name" and "description" property for each item
        if (!Array.isArray(req.body) || req.body.length === 0 || !req.body.every(item => item.name && item.description)) {
            return res
                .status(400)
                .send("Invalid request body");
        }
        // get the to do items from the request body
        const toDoItems = req.body;
        // loop through the to do items and generate a unique id for each one, and set the default values
        toDoItems.forEach(item => {
            item.id = uuidv4();
            item.completed = false;
            item.dateCreated = Date.now();
            item.status = 'incomplete';
            item.dateCompleted = null;
        });
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
            .json({ error: error.message });
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
            .json({ todoList: toDoItems });
    } catch (error) {
        res
            .status(500)
            .json({ error: error.message });
    }
}


module.exports = {
    createToDoItem,
    getAllToDoItems,
    completeToDoItem,
    incompleteToDoItem,
    deleteToDoItem,
    deleteMultipleToDoItems,
    createMultipleToDoItems
}