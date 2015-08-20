import React from 'react';

class NoteList extends React.Component {
    constructor() {
        super();
    }

    render() {
        let notes = this.props.notes.map((note) => {
            let isSelected = this.props.selectedIds.indexOf(note.id)!==-1;
            let isLastSelected = this.props.selectedIds[this.props.selectedIds.length-1] === note.id;
            let rowClasses = isSelected ? (isLastSelected ? 'warning' : 'info') : '';
            let onClickHandler = isSelected ? this.props.onNoteDeselected.bind(this, note.id)
                                            : this.props.onNoteSelected.bind(this, note.id);

            return (
                <tr key={note.id} onClick={onClickHandler} className={rowClasses}>
                    <td>{note.title}</td>
                    <td>{note.tags}</td>
                    <td>{new Date(note.creationDate).toLocaleString()}</td>
                    <td>{new Date(note.lastModDate).toLocaleString()}</td>
                    <td>
                        <button
                            className="btn btn-danger btn-xs"
                            onClick={this.props.onDeleteNote.bind(this, note.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div style={{overflow: 'auto', height: 350}}>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Tags</th>
                            <th>Creation date</th>
                            <th>Modification date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes}
                    </tbody>
                </table>
            </div>
        );
    }
}

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired,
    selectedIds: React.PropTypes.array.isRequired,
    onNoteSelected: React.PropTypes.func.isRequired,
    onNoteDeselected: React.PropTypes.func.isRequired,
    onDeleteSelectedNote: React.PropTypes.func.isRequired,
    onDeleteNote: React.PropTypes.func.isRequired
};

NoteList.defaultProps = {

};

export default NoteList;
