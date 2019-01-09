import React, { Component } from "react";
import PropTyeps from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { compose } from "recompose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../modules/user";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    color: "white"
  },
  textWelcome: {
    textAlign: "center"
  }
});

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pwConfirm: true,
      pwValid: true,
      id: "",
      pw1: "",
      pw2: "",
      name: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = () => {
    this.props.UserActions.signup(
      this.state.id,
      this.state.pw1,
      this.state.name
    );
  };

  handleClose = () => {
    var reset = this.props.UserActions.stateReset;
    var cls = this.props.close;
    reset();
    cls();
  };

  render() {
    const { classes, user } = this.props;

    return (
      <div>
        <Grid
          container
          direction="column"
          justify="center"
          alignContent="center"
        >
          <Typography variant="h3">Sign Up</Typography>
          {user.signupPending ? (
            <Grid item style={{ height: 150 }}>
              <CircularProgress />
            </Grid>
          ) : user.signupSuccess ? (
            <Typography variant="body2" className={classes.textWelcome}>
              Welcome!!
            </Typography>
          ) : (
            <React.Fragment>
              <TextField
                id="id-fiel"
                label="ID"
                name="id"
                className={classes.textField}
                value={this.state.id}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                error={user.signupFail}
              />
              <TextField
                id="pw1"
                label="Password"
                name="pw1"
                type="password"
                value={this.state.pw1}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                error={user.signupFail}
              />
              <TextField
                id="pw2"
                label="Password Confirm"
                name="pw2"
                type="password"
                value={this.state.pw2}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                error={user.signupFail}
              />
              <TextField
                id="outlined-uncontrolled"
                label="Name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                error={user.signupFail}
              />
            </React.Fragment>
          )}
          {user.signupSuccess ? (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClose}
              className={classes.button}
            >
              Close
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Create
            </Button>
          )}
        </Grid>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  close: PropTyeps.func.isRequired
};

SignUpPage.defaultProps = {};

export default compose(
  withStyles(styles),
  connect(
    state => ({
      user: state.user
    }),
    dispatch => ({
      UserActions: bindActionCreators(userActions, dispatch)
    })
  )
)(SignUpPage);
