
// Import modules
const Note = require('../models/note.model');

// Create and Save a new Note
const createNote = (req, res) => {
    Note.create(req.body)
    .then(newNote => {
        res.json(newNote);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
};

// Retrieve and return all notes from the database.
const getNotes = (req, res) => {
    Note.find()
    .then(notes => {
        res.json(notes);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
};

// Find a single note with an id
const getNote = (req, res) => {
    Note.findById(req.params.id)
    .then(note => {
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
};

// Update a note identified by the id in the request
const updateNote = (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;

    // Validate input
    const errors = {};
    if (!title || title.length < 2) {
        errors.title = "Note Title must contain at least 2 characters.";
    }
    if (!body) {
        errors.body = "Please add a Note Body.";
    }

    // If there are validation errors, send them back in the response
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    Note.findByIdAndUpdate(id, { title, body }, { new: true })
        .then((note) => {
            if (!note) {
                return res.status(404).json({ message: 'Note not found' });
            }
            res.json(note);
        })
        .catch((err) => {
            res.status(400).json(err);
            console.log(err);
        });
};

// Delete a note with the specified id in the request
const deleteNote = (req, res) => {
    Note.findByIdAndRemove(req.params.id)
    .then(note => {
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
};


// Export controllers
module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
};