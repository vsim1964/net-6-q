import React from 'react';
import PropTypes from 'prop-types';

export default class Note extends React.Component {
    render() {
        return (
            <div className='NoteBox'>
                <div className='DeleteWrapper'>
                    {this.props.children}
                </div>
                <div className='NoteText'>
                    {this.props.content}
                </div>
            </div>
        )
    }
}

Note.propTypes = {
    content: PropTypes.string.isRequired,
}