import React from 'react';
import AltContainer from 'alt/AltContainer';
import AppStore from '../stores/AppStore';
import Header from './Header';

class AppControllerView extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <AltContainer>
                <AltContainer store={AppStore}>
                    <Header
                        onAddNoteClicked={this.addNewNote}
                        onDeleteNoteClicked={this.deleteSelectedNote} />
                </AltContainer>
            </AltContainer>
        );
    }

    addNewNote() {
        console.log('Would now add a new note');
    }

    deleteSelectedNote() {
        console.log('Would now delete the selected note, if any');
    }
}

export default AppControllerView;
