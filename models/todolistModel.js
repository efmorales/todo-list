// Create a new mongoose schema toDoSchema, it should have the following properties:

// name - type: string, validation: required
// description - type: string
// completed - type: boolean, validation: required
// dateCreated - type: date, default: Date.now(), validation: required
// dateCompleted - type: date
// status - type: string, default: 'incomplete', validation: required, enum: ['incomplete', 'complete', 'deferred']

//import mongoose library
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

//create a blogSchema 
const toDoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
        required: true
    },
    dateCompleted: {
        type: Date
    },
    status: {
        type: String,
        default: 'incomplete',
        required: true,
        enum: ['incomplete', 'complete', 'deferred']
    },
    id: {
        type: String,
        default: uuidv4
    }
});

// register model to collection
const toDoModel = mongoose.model("sample_todos", toDoSchema);

//export model
module.exports = toDoModel;