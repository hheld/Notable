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

        const tags = this.props.note.tags.split(' ').map((tag, i) => {
            return (<span key={i} className="label label-default" style={{marginLeft: 10}}>{tag}</span>);
        });

        const creationDateBadge = (
            <span className="badge" style={{marginLeft: 5}}>{new Date(this.props.note.creationDate).toLocaleString()}</span>
        );

        const modDateBadge = (
            <span className="badge" style={{marginLeft: 5}}>{new Date(this.props.note.lastModDate).toLocaleString()}</span>
        );

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    {this.props.note.title}
                </div>
                <div className="pull-right" style={{marginLeft: 10}}>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-info">Created {creationDateBadge}</li>
                        <li className="list-group-item list-group-item-info">Last modified {modDateBadge}</li>
                    </ul>
                </div>
                <div className="panel-body" dangerouslySetInnerHTML={{__html: noteHtml}} style={{overflow: "auto"}} />
                <div className="panel-footer">{tags}</div>
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
