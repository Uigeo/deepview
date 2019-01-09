import React from "react";
import { withStyles } from "@material-ui/core";
import Login from "../components/Login";

const style = theme => ({
  root: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    height: "100vh"
  }
});

const LoginPage = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Login />
    </div>
  );
};

export default withStyles(style)(LoginPage);
