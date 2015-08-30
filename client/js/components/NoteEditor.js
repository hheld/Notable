import React from 'react';

class NoteEditor extends React.Component {
    constructor() {
        super();
    }

    render() {
        if(!this.props.note.hasOwnProperty('note')) return null;

        const {title, tags, note} = this.props.note;

        const restoreButton = this.props.note.hasOwnProperty('id') ? (
            <button type="button" className="btn btn-warning" style={{marginLeft: 20}} onClick={this.props.onCancelClicked}>Restore from server</button>
            ) : null;

        return (
            <div className="panel panel-default">
                <div className="panel-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Title</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={title} onChange={(event) => {this.props.onTitleChange(event.target.value);}} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Tags</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={tags} onChange={(event) => {this.props.onTagsChange(event.target.value);}} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">Note</label>
                            <div className="col-sm-10">
                                <textarea rows="10" className="form-control" value={note} onChange={(event) => {this.props.onNoteChange(event.target.value);}} />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="button" className="btn btn-primary" onClick={this.props.onSaveClicked}>Save on server</button>
                                {restoreButton}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

NoteEditor.propTypes = {
    note: React.PropTypes.object.isRequired,
    onTitleChange: React.PropTypes.func.isRequired,
    onTagsChange: React.PropTypes.func.isRequired,
    onNoteChange: React.PropTypes.func.isRequired,
    onSaveClicked: React.PropTypes.func.isRequired,
    onCancelClicked: React.PropTypes.func.isRequired
};

NoteEditor.defaultProps = {

};

export default NoteEditor;
