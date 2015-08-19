import React from 'react';

class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
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
                            <button
                                className="btn btn-danger navbar-btn"
                                onClick={this.props.onDeleteNoteClicked}>
                                Delete selected note(s)
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
    onAddNoteClicked: React.PropTypes.func.isRequired,
    onDeleteNoteClicked: React.PropTypes.func.isRequired
};

Header.defaultProps = {

};

export default Header;
