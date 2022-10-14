const { addNoteHandler, getAllNotesHandler, getNoteHandler, updateNoteHandler, deleteNoteHandler } = require('./handler');

const routes = [
    {
        method : 'GET',
        path : '/notes',
        handler : getAllNotesHandler,
    },
    {
        method : 'GET',
        path : '/notes/{id}',
        handler : getNoteHandler,
    },
    {
        method : 'PUT',
        path : '/notes/{id}',
        handler : updateNoteHandler,
    },
    {
        method : 'DELETE',
        path : '/notes/{id}',
        handler : deleteNoteHandler,
    },
    {
        method : 'POST',
        path : '/notes',
        handler : addNoteHandler,
    },
];

module.exports = routes;