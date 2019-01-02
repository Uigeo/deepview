import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
//import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';

const style = theme => ({
  root : {
    backgroundColor : "#FFFFFF"
  },
  icon : {
    color: '#FFFFFF'
  },
  itemText : {
    color : '#FFFFFF'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class DrawList extends React.Component {

  state = {
    tableListOpen : false
  }

  handleClick = () => {
    this.setState(state => ({ tableListOpen: !state.tableListOpen }));
  };


  render() {
    const {classes} = this.props;
    return (

      <List >
        <Link to="/" >
          <ListItem button >
            <ListItemIcon className={classes.icon}>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary={<Typography className={classes.itemText}>Dashboard</Typography> } />
          </ListItem>
        </Link>

       
        <Link to="/table">
          <ListItem button>
            <ListItemIcon className={classes.icon}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText  primary={ <Typography className={classes.itemText}>Table</Typography> } />
          </ListItem>
        </Link>
     
        <Link to="/chart">
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon className={classes.icon}>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText inset primary={<Typography className={classes.itemText}>Chart</Typography>} />
            {this.state.tableListOpen ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon}/>}
          </ListItem>
        </Link>
        <Collapse in={this.state.tableListOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon className={classes.icon}>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary={<Typography className={classes.itemText}> Chart1 </Typography>} />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon className={classes.icon}>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary={<Typography className={classes.itemText}> Chart1 </Typography>} />
            </ListItem>
          </List>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon className={classes.icon}>
                <StarBorder />
              </ListItemIcon>
              <ListItemText inset primary={<Typography className={classes.itemText}> Chart1 </Typography>} />
            </ListItem>
          </List>
        </Collapse>
  
      </List>
    )
  }
}

export default withStyles(style)(DrawList);


