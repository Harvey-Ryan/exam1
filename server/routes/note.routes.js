
//Import our Controllers
const noteController = require('../controllers/note.controller');

//Declare our routes
module.exports = (app) => {
    app.post('/notes/new', noteController.createNote);
    app.get('/', noteController.getNotes);
    app.get('/notes/:id', noteController.getNote);
    app.put('/notes/:id', noteController.updateNote);
    app.delete('/notes/:id', noteController.deleteNote);
};