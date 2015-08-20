import alt from '../alt';
import {getAllNotes, deleteNote as delNote, getNote, updateNote, addNewNote as addNote} from '../utils/NoteService';

class NoteActions {
    constructor() {
        // simply define data-pass-through-actions here like this; multiple args possible
        this.generateActions('setNotes',
        'selectNote',
        'deselectNote',
        'setEditedNoteTitle',
        'setEditedNoteTags',
        'setEditedNoteNote',
        'editNewNote');
    }

    getAllNotes(from, to, tags) {
        getAllNotes()
        .then((notes) => {
            this.actions.setNotes(notes);
        });

        // allows us to have a loading state
        this.dispatch();
    }

    deleteNote(id) {
        delNote(id)
        .then(() => {
            this.actions.getAllNotes();
        });

        // allows us to have a loading state
        this.dispatch();
    }

    restoreNote(id) {
        getNote(id)
        .then((note) => {
            this.actions.setEditedNoteTitle(note.title);
            this.actions.setEditedNoteTags(note.tags);
            this.actions.setEditedNoteNote(note.note);
        });

        // allows us to have a loading state
        this.dispatch();
    }

    saveEditedNote(id, note) {
        updateNote(id, note)
        .then(() => {
            alert('Note changes stored successfully!');
        });

        // allows us to have a loading state
        this.dispatch();
    }

    addNewNote(note) {
        addNote(note)
        .then(() => {
            alert('Successfully added the new note.');

            this.actions.getAllNotes();
        });

        // allows us to have a loading state
        this.dispatch();
    }
}

export default alt.createActions(NoteActions);
