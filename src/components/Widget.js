/* eslint-disable array-callback-return */
import React from "react";
import Note from "./Note";
import Form from "./Form";

const server = 'http://localhost:3000/posts';
// json-server --watch db.json

export default class Widget extends React.Component {
    state = { notes: [] };

    getNotes = () => {
        fetch(server).then(response => response.json())
            .then(result => {
                this.setState({ notes: [...result] });
            });
    }

    postNote = (id, content) => {
        fetch(server, {
            method: 'POST',
            body: JSON.stringify({ id, content }),
        }).then(this.getNotes);
    }

    deleteNote = (id) => {
        fetch(`${server}/${id}`, {
            method: 'DELETE',
        }).then(this.getNotes);
    }

    componentDidMount() {
        this.getNotes();
    }

    render() {
        return (
            <div className='Widget'>
                <div className='header'>
                    <h2 className='title'>Посты</h2>
                    <button className='ReloadBtn' onClick={this.getNotes}>reload</button>
                </div>
                <div className='notes'>
                    {this.state.notes.map((el) => {
                        console.log(el.content);
                        return (
                            <Note content={el.content} key={el.id}>
                                <button className='DeleteBtn' onClick={() => this.deleteNote(el.id)}>Delete</button>
                            </Note>)
                    })}
                </div>
                <Form newNote={this.postNote} />
            </div>
        )
    }
}
