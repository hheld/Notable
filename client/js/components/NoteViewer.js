import React from 'react';
import marked from 'marked';

class NoteViewer extends React.Component {
    constructor() {
        super();
    }

    render() {
        if(!this.props.note.hasOwnProperty('note')) return null;

        const { note } = this.props.note,
                  noteHtml = marked(note || '');

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">{this.props.note.title}</div>
                <div className="panel-body" dangerouslySetInnerHTML={{__html: noteHtml}} />
            </div>
        );
    }
}

NoteViewer.propTypes = {
    note: React.PropTypes.object.isRequired,
};

NoteViewer.defaultProps = {

};

export default NoteViewer;
