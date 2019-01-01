import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../modules/user';



class ProfileMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { user, userActions } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        
        <IconButton
            aria-label="More"
            aria-owns={open ? 'long-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
        >
            <MoreVertIcon/>
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>{user.name}</MenuItem>
          <MenuItem onClick={userActions.logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(
    (state) => ({
        user : state.user
    }),
    (dispatch) => ({
        userActions : bindActionCreators(userActions, dispatch)
    })
)(ProfileMenu);