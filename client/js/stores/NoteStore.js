import alt from '../alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
    constructor() {
        this.notes = [];
        this.selectedIds = [];

        this.bindListeners({
            setNotes: NoteActions.setNotes,
            gettingAllNotes: NoteActions.getAllNotes,
            selectNote: NoteActions.selectNote,
            deselectNote: NoteActions.deselectNote
        });
    }

    setNotes(notes) {
        this.notes = notes;
    }

    gettingAllNotes() {
        this.notes = [];
        this.selectedIds = [];
    }

    selectNote(id) {
        this.selectedIds.push(id);
    }

    deselectNote(id) {
        let idx = this.selectedIds.indexOf(id);

        while(idx!==-1) {
            this.selectedIds.splice(idx, 1);
            idx = this.selectedIds.indexOf(id);
        }
    }
}

export default alt.createStore(NoteStore, 'NoteStore');
