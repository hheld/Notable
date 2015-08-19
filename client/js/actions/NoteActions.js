import alt from '../alt';
import {getAllNotes, deleteNote as delNote} from '../utils/NoteService';

class NoteActions {
    constructor() {
        // simply define data-pass-through-actions here like this; multiple args possible
        this.generateActions('setNotes', 'selectNote', 'deselectNote');
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
}

export default alt.createActions(NoteActions);
