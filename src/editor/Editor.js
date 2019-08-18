import React, { Component } from 'react'
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles"
class Editor extends Component {
  state = {
    body: '',
    title: '',
    id: ''
  }
  componentDidMount = () => {
    const {selectedNote:{
      body,
      title,
      id
    }} = this.props;
    this.setState({
      body,
      title,
      id
    })
  }

  componentDidUpdate = () => {
    if(this.props.selectedNote.id !== this.state.id){
      const { selectedNote: {
        body,
        title,
        id
      } } = this.props;
      this.setState({
        body,
        title,
        id
      })
    }
  }

  updateBody = async (val) =>{
    await this.setState({body: val});
   this.update();
  }

  updateTitle = async (val) => {
    await this.setState({ title: val });
    this.update();
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.body
    })
  }, 1500)


  render() {
    const { classes } = this.props
    return (
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input 
          className={classes.titleInput}
          placeholder='Note Title...'
          value={this.state.title ? this.state.title : ''}
          onChange={e => this.updateTitle(e.target.value)}>
        </input>
        <ReactQuill value={this.state.body } onChange={this.updateBody}></ReactQuill>
      </div>
    )
  }
}
export default withStyles(styles)(Editor)