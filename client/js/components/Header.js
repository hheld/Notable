import React from 'react';

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        const noteStr = this.props.numOfSelectedNotes==1 ? 'note' : 'notes';
        
        const delNotesBtn = this.props.numOfSelectedNotes>0 ? (
            <button
                className="btn btn-danger navbar-btn"
                onClick={this.props.onDeleteNoteClicked}>
                Delete selected {noteStr}
            </button>
        ) : null;

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <p className="navbar-text">Notable - Stuff to remember</p>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <button
                                className="btn btn-default navbar-btn"
                                onClick={this.props.onAddNoteClicked}>
                                Add new note
                            </button>
                        </li>
                        <li>
                            {delNotesBtn}
                        </li>
                        <li>
                            <p className="navbar-text">Selected notes <span className="badge">{this.props.numOfSelectedNotes}/{this.props.numOfNotes}</span></p>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    onAddNoteClicked: React.PropTypes.func.isRequired,
    onDeleteNoteClicked: React.PropTypes.func.isRequired,
    numOfNotes: React.PropTypes.number.isRequired,
    numOfSelectedNotes: React.PropTypes.number.isRequired
};

Header.defaultProps = {

};

export default Header;
