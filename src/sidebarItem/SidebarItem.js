import React, { Component } from 'react'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from "@material-ui/icons/Delete";
import {removeHTMLTags} from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles'
class SidebarItem extends Component {
  render() {
    return (
      <div>
        Hello from SidebarItem
      </div>
    )
  }
}
export default withStyles(styles)(SidebarItem);