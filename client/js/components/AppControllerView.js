import React from 'react';
import NoteActions from '../actions/NoteActions';
import Header from './Header';
import NoteList from './NoteList';
import AltContainer from 'alt/AltContainer';
import NoteStore from '../stores/NoteStore';
import NoteViewer from './NoteViewer';
import NoteEditor from './NoteEditor';
import Mousetrap from 'mousetrap';

class AppControllerView extends React.Component {
    constructor() {
        super();

        NoteActions.getAllNotes();
    }

    componentDidMount() {
        Mousetrap.bind(['ctrl+a'], this.selectAllNotes);
        Mousetrap.bind(['ctrl+l'], this.deselectAllNotes);
    }

    componentWillUnmount() {
        Mousetrap.unbind(['ctrl+a'], this.selectAllNotes);
        Mousetrap.unbind(['ctrl+l'], this.deselectAllNotes);
    }

    render() {
        return (
            <div className="container">
                <AltContainer
                    stores={[NoteStore]}
                    inject={
                        {
                            numOfNotes: function(props) {
                                return NoteStore.getState().notes.length;
                            },

                            numOfSelectedNotes: function(props) {
                                return NoteStore.getState().selectedIds.length;
                            }
                        }
                    }>
                    <Header
                        onAddNoteClicked={this.addNewNote}
                        onDeleteNoteClicked={this.deleteSelectedNote}
                        numOfNotes={0}
                        numOfSelectedNotes={0} />
                </AltContainer>
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
                <div style={{height: 50}} />
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

    selectAllNotes(e) {
        NoteActions.selectAllNotes();
        e.preventDefault();
    }

    deselectAllNotes(e) {
        NoteActions.deselectAllNotes();
        e.preventDefault();
    }

    addNewNote() {
        NoteActions.editNewNote();
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

        if(lastSelectedNote.hasOwnProperty('id')) {
            NoteActions.saveEditedNote(lastSelectedNote.id, lastSelectedNote);
        } else {
            // add totally new note
            NoteActions.addNewNote(lastSelectedNote);
        }
    }

    restoreEditedNote() {
        NoteActions.restoreNote(NoteStore.getState().lastSelectedNote.id);
    }
}

export default AppControllerView;
