import alt from '../alt';
import NoteActions from '../actions/NoteActions';

class NoteStore {
    constructor() {
        this.notes = [];
        this.selectedIds = [];
        this.lastSelectedNote = {};

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

        this.updateLastSelectedNote();
    }

    deselectNote(id) {
        let idx = this.selectedIds.indexOf(id);

        while(idx!==-1) {
            this.selectedIds.splice(idx, 1);
            idx = this.selectedIds.indexOf(id);
        }

        this.updateLastSelectedNote();
    }

    updateLastSelectedNote() {
        let idx = this.selectedIds.length !==0 ? this.selectedIds[this.selectedIds.length - 1] : -1;

        if(idx===-1) {
            this.lastSelectedNote = {};
            return;
        }

        this.notes.forEach((note) => {
            if(note.id===idx) {
                this.lastSelectedNote = note;
            }
        });
    }
}

export default alt.createStore(NoteStore, 'NoteStore');
