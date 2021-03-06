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
            deselectNote: NoteActions.deselectNote,
            setEditedNoteTitle: NoteActions.setEditedNoteTitle,
            setEditedNoteTags: NoteActions.setEditedNoteTags,
            setEditedNoteNote: NoteActions.setEditedNoteNote,
            editNewNote: NoteActions.editNewNote,
            selectAllNotes: NoteActions.selectAllNotes,
            deselectAllNotes: NoteActions.deselectAllNotes
        });
    }

    setNotes(notes) {
        this.notes = notes;
    }

    gettingAllNotes() {
        this.notes = [];
        this.selectedIds = [];
        this.lastSelectedNote = {};
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

    setEditedNoteTitle(title) {
        this.lastSelectedNote.title = title;
    }

    setEditedNoteTags(tags) {
        this.lastSelectedNote.tags = tags;
    }

    setEditedNoteNote(note) {
        this.lastSelectedNote.note = note;
    }

    editNewNote() {
        this.selectedIds = [];
        this.lastSelectedNote = {
            title: 'Enter title here',
            tags: 'Enter tags here',
            note: 'Enter note here'
        };
    }

    selectAllNotes() {
        this.selectedIds = this.notes.map((note) => {
            return note.id;
        });

        this.updateLastSelectedNote();
    }

    deselectAllNotes() {
        this.selectedIds = [];

        this.updateLastSelectedNote();
    }
}

export default alt.createStore(NoteStore, 'NoteStore');
