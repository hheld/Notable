import React from 'react';
import marked from 'marked';

class NoteEditor extends React.Component {
    constructor() {
        super();
    }

    render() {
        if(!this.props.note.hasOwnProperty('note')) return null;

        const {title, tags, note} = this.props.note;

        return (
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
                    <label className="col-sm-2 control-label">Tags</label>
                    <div className="col-sm-10">
                        <textarea className="form-control" value={note} onChange={(event) => {this.props.onNoteChange(event.target.value);}} />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <button type="button" className="btn btn-primary" onClick={this.props.onSaveClicked}>Save</button>
                        <button type="button" className="btn btn-warning" style={{marginLeft: 20}} onClick={this.props.onCancelClicked}>Cancel</button>
                    </div>
                </div>
            </form>
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
