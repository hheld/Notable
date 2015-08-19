import React from 'react';
import NoteActions from '../actions/NoteActions';
import Header from './Header';
import NoteList from './NoteList';
import AltContainer from 'alt/AltContainer';
import NoteStore from '../stores/NoteStore';

class AppControllerView extends React.Component {
    constructor() {
        super();

        NoteActions.getAllNotes();
    }

    render() {
        return (
            <div>
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
}

export default AppControllerView;
