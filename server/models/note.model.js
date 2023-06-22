
// Connect to the database
const mongoose = require('mongoose');

// Create a schema
const noteSchema = ({
    title: {
        type: String,
        required: [true, 'Please add a Note Title.'], // First layer of validation
        minLength: [2, 'Note Title must contain 2 characters.'], // Second layer of validation
    },
    body: {
        type: String,
        required: [true, 'Please add a Note Body.'], // First layer of validation
        maxLength: [255, "Body must contain max of 255 charcters."], // Second layer of validation
    }
});

// Create and export a model
module.exports = mongoose.model('exam1', noteSchema);