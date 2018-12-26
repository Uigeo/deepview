import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { withStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List';
import { Typography } from '@material-ui/core';

const style = theme => ({
  root : {
    backgroundColor : "#295073"
  },
  icon : {
    color: '#FFFFFF'
  },
  itemText : {
    color : '#FFFFFF'
  }
});

class DrawList extends React.Component {
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
            <ListItemText primary={ <Typography className={classes.itemText}>Table</Typography> } />
          </ListItem>
        </Link>
     
        <Link to="/chart">
          <ListItem button>
            <ListItemIcon className={classes.icon}>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary={<Typography className={classes.itemText}>Chart</Typography>} />
          </ListItem>
        </Link>
  
      </List>
    )
  }
}

export default withStyles(style)(DrawList);


