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

const style = theme => ({

  icon : {
    color: '#333333'
  },
  itemText : {
    color : '#333333',
    fontSize : 20
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  activeBorder : {
    borderColor : '#244411',
    borderWidth : 10
  },
  logo : {
    fontSize : 30,
    fontWeight : 'bord',
    marginBottom : 40,
    paddingLeft : 60
  }
});

class DrawList extends React.Component {

  state = {
    tableListOpen : false,
    selectedIndex : 0
  }

  handleClick = () => {
    this.setState(state => ({ tableListOpen: !state.tableListOpen }));
  };

  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };



  render() {
    const {classes, openDrawer} = this.props;
    return (

      <List >
        { openDrawer &&
          <ListItem className={classes.logo}>
          DeepBio
          </ListItem>
        } 
        <Link to="/" className={classes.activeBorder} >
          <ListItem 
          button
          selected={this.state.selectedIndex === 0}
          onClick={event => this.handleListItemClick(event, 0)}
          >
            <ListItemIcon className={classes.icon}>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary={<Typography className={classes.itemText}>Dashboard</Typography> } />
          </ListItem>
        </Link>

       
        <Link to="/table">
          <ListItem 
          button
          selected={this.state.selectedIndex === 1}
          onClick={event => this.handleListItemClick(event, 1)}
          >
            <ListItemIcon className={classes.icon}>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText  primary={ <Typography className={classes.itemText}>Table</Typography> } />
          </ListItem>
        </Link>
     
        <Link to="/chart">
          <ListItem 
          button
          selected={this.state.selectedIndex === 2} 
          onClick={event => this.handleListItemClick(event, 2)}>
            <ListItemIcon className={classes.icon}>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText inset primary={<Typography className={classes.itemText}>Chart</Typography>} />
          </ListItem>
        </Link>
      </List>
    )
  }
}

export default withStyles(style)(DrawList);


