
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
      console.log(notes)
      this.setState({notes })
    })
  }
  render() {
    return (
      <div className="app-container">
        <Sidebar></Sidebar>
        <Editor></Editor>
      </div>
    )
  }
}

export default App;
