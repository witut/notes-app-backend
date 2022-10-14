const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    notes.push({ id, title, tags, body, createdAt, updatedAt });

    const isSuccess = notes.filter((note) => note.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id
            }
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'failed',
        message: 'Catatan gagal ditambahkan',
    });

    response.code(500);

    return response;
}

const updateNoteHandler = (request, h) => {
    const { title, tags, body } = request.payload;
    const { id } = request.params;
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diubah'
        });

        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'failed',
        message: 'Gagal memperbaharui catatan'
    });

    response.code(404);
    return response;
}

const deleteNoteHandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1){
        notes.splice(index, 1);
        const response = h.response({
            status:'success',
            message: 'Catatan berhasil dihapus'
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus, Id tidak ditemukan'
    });

    response.code(404)

    return response;
}

const getAllNotesHandler = () => {
    return {
        status: 'success',
        data: { notes }
    }
}

const getNoteHandler = (request, h) => {
    const { id } = request.params;
    const note = notes.filter(note => note.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: { note }
        }
    }

    const response = h.response({
        status: 'failed',
        message: 'Catatan tidak ditemukan'
    })

    response.code(404);
    return response;
}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteHandler, updateNoteHandler, deleteNoteHandler }