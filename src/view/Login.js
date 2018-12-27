import React from 'react'
import { withStyles, Grid, Paper, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import orange from '@material-ui/core/colors/orange';
import Typography from '@material-ui/core/Typography';

const style = theme => ({
    root : {
        backgroundColor : '#103346',
        
        height : 1000,
    },
    margin : {
        color : '#FFFFFF'
    },
    multilineColor:{
        color:'red',
      }
});

const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: orange
    },
    typography: {useNextVariants: true},
});

const Login = (props) => {
    
    const { classes } = props;

    return (
        <div className={classes.root}>
            <Grid container alignItems='center' justify='center' style={{height: '99%'}} >
                <Grid item xs={6}>
                   
                    <MuiThemeProvider theme={theme}>
                        <Grid container direction='column' >
                            <Grid item>
                                <TextField
                                InputProps={{
                                    classes : {
                                        input : classes.multilineColor,
                                        inputMultiline: classes.multilineColor,
                                    }
                                }}
                                className={classes.margin}
                                label="ID"
                                margin='normal'
                                id="mui-theme-provider-standard-input"
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                type="password"
                                className={classes.margin}
                                label="Password"
                                id="mui-theme-provider-standard-input"
                                />
                            </Grid>
                        </Grid>
 
                    </MuiThemeProvider>
      
                
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(style)(Login);