import React from 'react';
import NoteActions from '../actions/NoteActions';
import Header from './Header';
import NoteList from './NoteList';
import AltContainer from 'alt/AltContainer';
import NoteStore from '../stores/NoteStore';
import NoteViewer from './NoteViewer';
import NoteEditor from './NoteEditor';

class AppControllerView extends React.Component {
    constructor() {
        super();

        NoteActions.getAllNotes();
    }

    render() {
        return (
            <div className="container">
                <Header
                    onAddNoteClicked={this.addNewNote}
                    onDeleteNoteClicked={this.deleteSelectedNote} />
                <AltContainer
                    stores={[NoteStore]}
                    inject={
                        {
                            notes: function(props) {
                                return NoteStore.getState().notes;
                            },

                            selectedIds: function(props) {
                                return NoteStore.getState().selectedIds;
                            }
                        }
                    }>
                    <NoteList
                        notes={[]}
                        selectedIds={[]}
                        onNoteSelected={this.selectNote}
                        onNoteDeselected={this.deselectNote}
                        onDeleteSelectedNote={this.deleteSelectedNote}
                        onDeleteNote={this.deleteNote} />
                </AltContainer>
                <AltContainer
                    stores={[NoteStore]}
                    inject={
                        {
                            note: function(props) {
                                return NoteStore.getState().lastSelectedNote;
                            }
                        }
                    }>
                    <NoteViewer note={{}} />
                    <NoteEditor
                        note={{}}
                        onTitleChange={this.setEditedNoteTitle}
                        onTagsChange={this.setEditedNoteTags}
                        onNoteChange={this.setEditedNoteNote}
                        onSaveClicked={this.saveEditedNote}
                        onCancelClicked={this.restoreEditedNote} />
                </AltContainer>
            </div>
        );
    }

    addNewNote() {
        console.log('Would now add a new note');
    }

    deleteSelectedNote() {
        NoteStore.getState().selectedIds.forEach((idx) => {
            NoteActions.deleteNote(idx);
        });
    }

    deleteNote(id) {
        NoteActions.deleteNote(id);
    }

    selectNote(id) {
        NoteActions.selectNote(id);
    }

    deselectNote(id) {
        NoteActions.deselectNote(id);
    }

    setEditedNoteTitle(title) {
        NoteActions.setEditedNoteTitle(title);
    }

    setEditedNoteTags(tags) {
        NoteActions.setEditedNoteTags(tags);
    }

    setEditedNoteNote(note) {
        NoteActions.setEditedNoteNote(note);
    }

    saveEditedNote() {
        const { lastSelectedNote } = NoteStore.getState();

        NoteActions.saveEditedNote(lastSelectedNote.id, lastSelectedNote);
    }

    restoreEditedNote() {
        NoteActions.restoreNote(NoteStore.getState().lastSelectedNote.id);
    }
}

export default AppControllerView;
