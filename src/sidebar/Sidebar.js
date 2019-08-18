import React, { Component } from 'react'
import List from "@material-ui/core/List";
import { Divider, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from "./styles"
import SidebarItem from '../sidebarItem/SidebarItem';
 class Sidebar extends Component {

  state = {
    addingNote: false,
    title: null
  }
   newNoteBtnClick = () => {
     this.setState({ addingNote: !this.state.addingNote, title: null})
   }

   updateTitle = text => {
     this.setState({title: text})
   }

   newNote = () => {
     this.props.newNote(this.state.title)
     this.setState({ title: null, addingNote: false})
   }

   selectNote = (note, index) => this.props.selectNote(note, index)
   deleteNote = (note) => this.props.deleteNote(note)
  render() { 
    const {notes, classes, selectedNoteIndex} = this.props
   if(notes){
     return (
       <div className={classes.sidebarContainer}>
         <Button
           className={classes.newNoteBtn}
           onClick={this.newNoteBtnClick}
         >
           {this.state.addingNote ? 'Cancel' : 'New Note'}
         </Button>
         {
           this.state.addingNote ?
             <div>
               <input
                 className={classes.newNoteInput}
                 type="text"
                 placeholder="Entre note title"
                 onKeyUp={e => this.updateTitle(e.target.value)}
               />
               <Button
                 className={classes.newNoteSubmitBtn}
                 onClick={this.newNote}
               >
                 Submit Note
            </Button>
             </div> :
             null
         }
         <List>
           {
             notes.map((_note, _index) => {
               return (<div key={_index}>
                 <SidebarItem
                   _note={_note}
                   _index={_index}
                   selectedNoteIndex={selectedNoteIndex}
                   selectNote={this.selectNote}
                   deleteNote={this.deleteNote}
                 >
                 </SidebarItem>
                 <Divider></Divider>
               </div>)
             })
           }
         </List>
       </div>
     )
   } else {
     return(<div>Add a Note</div>)
  }
  }
}
export default withStyles(styles)(Sidebar)