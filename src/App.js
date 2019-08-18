
import React, { Component } from 'react'
import './App.css';
import Sidebar from './sidebar/Sidebar';
import Editor from './editor/Editor';

const firebase = require('firebase');
class App extends Component {
  state={
    selectedNoteIndex: null,
    selectedNote: null,
    notes: null
  }
  componentDidMount = () => {
    firebase
    .firestore()
    .collection('notes')
    .onSnapshot( serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      })
      this.setState({notes })
    })
  }
  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }
  selectNote = (note, index) => {
    this.setState({ selectedNoteIndex: index, selectedNote: note})
    //console.log(note)
  } 

  newNote  = async(title) => {
    const note = {
      title,
      body:''
    }
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      const newId = newFromDB.id;
      await this.setState({notes: [...this.state.notes, note]})
      const  newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newId)[0]);
    console.log(this.state.notes[newNoteIndex])
      this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex})
  }

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
    if(this.state.selectedNoteIndex === noteIndex){
      this.setState({selectedNoteIndex: null, selectedNote: null});
    }else{
      this.state.notes.length > 1 ? this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1) : 
        await this.setState({ selectedNoteIndex: null, selectedNote: null })
    }
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete()
  }
  render() {
    const { notes, selectedNote, selectedNoteIndex} = this.state;
    console.log(selectedNote)
    return (
      <div className="app-container">
        <Sidebar 
          selectedNoteIndex={selectedNoteIndex} 
          notes={notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}>
          </Sidebar>
       {
          selectedNote ? <Editor
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNote}
            notes={notes}
            noteUpdate={this.noteUpdate}>
          </Editor> : 
          null 
       }
      </div>
    )
  }
}

export default App;
