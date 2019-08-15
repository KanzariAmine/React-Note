import React, { Component } from 'react'
import List from "@material-ui/core/List";
import { Divider, Button } from '@material-ui/core';
import SidebarItem from "../sidebarItem/SidebarItem";
import { withStyles } from '@material-ui/styles';
import styles from "./styles"
 class Sidebar extends Component {
  render() {
    return (
      <div>
        Hello from SideBar
      </div>
    )
  }
}
export default withStyles(styles)(Sidebar)