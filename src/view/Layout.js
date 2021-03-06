import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import colorPalette from '../colorPalette';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DrawList from './DrawList';
import TablePage from './TablePage';
import { Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Footer from './Footer';
import ProfileMenu from '../components/ProfileMenu';
import ChartPage from './ChartPage';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  icon : {
    color : '#333333'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: '0 0px'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: "#FFFFFF",
    whiteSpace: 'nowrap',
    width: drawerWidth,
    
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    backgroundColor: "#FFFFFF",
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    backgroundColor : '#f3f3f3'
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Layout extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  // style={{borderTopColor : colorPalette[1], borderTopWidth : 5}}
  render() {
    const { classes } = this.props;

    return (
     
      <div className={classes.root}>
       
        <AppBar
          
          color="default"
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar} >
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              
            </Typography>

            <ProfileMenu/>
           
          </Toolbar>
         
        </AppBar>
        <Drawer
          
          style = {{backgroundColor : '#295073'}}
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon className={classes.icon}/>
            </IconButton>
          </div>
          
            <DrawList openDrawer = {this.state.open}/>
          
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Route exact path='/' component={Dashboard}/>
            <Route path='/chart' component={ChartPage}/>
            <Route path='/table' component={TablePage}/>
            <Footer/>
        </main>
        
      </div>
      
   
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  slides : PropTypes.object.isRequired,
};

export default withStyles(styles)(Layout);