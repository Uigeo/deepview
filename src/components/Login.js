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
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import * as userActions from '../modules/user';
import { withRouter } from 'react-router-dom';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const logoimgURL='http://172.17.0.1:9000/assets/logo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20181228%2F%2Fs3%2Faws4_request&X-Amz-Date=20181228T001927Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=36310fdac98fc5666d48dcf8a4402165b33a0d87b12457589164b4ed175b3830';

const style = theme => ({
   
    margin : {
        color : '#FFFFFF',
    },
    multilineColor:{
        color:'green',
    },
    icon : {
        color:'white',
    },
    fab : {
        boxShadow : '0px 0px'
    },
    title : {
        color : 'green'
    }
    
});

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: orange
    },
    typography: {useNextVariants: true},
});

const textInputProps= {
    style: { 
        textAlign: "center",
        
     }
};


class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id : '',
            pw : ''
        }
    }

    handleChange = (e)=> {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    handleClick = ()=> {

        const {user} = this.props;

        const login = {
            id :this.state.id,
            pw : this.state.pw
        }
        console.log(login);
        this.userLogin(login.id, login.pw);

        console.log(user);

        this.pwInput.value = '';
        this.idInput.value = '';
        
        this.setState({
            id : '',
            pw : ''
        });
        
    }

    userLogin = async (id, pw) => {
        const { UserActions } = this.props;

        try {
            await UserActions.login(id, pw);
            console.log('done');
        } catch (e) {
            console.log('error');
        }
    }

    handleKeyPress = (e)=> {
        if(e.charCode===13) {
            this.handleClick();
        }
    }

    render(){
        const { classes } = this.props;

        return (
           
                <Grid container alignItems='center' justify='center' style={{height: '99%'}} >
                    <Grid item xs={3}>
                       
                        <MuiThemeProvider theme={theme}>
                            <Grid container direction='column' spacing={24} >
                                <Grid item>
                                    <Typography variant='h2' className={classes.title} > DEEP BIO </Typography>
                                    <TextField
                                    fullWidth
                                    onChange={this.handleChange}
                                    className={classes.margin}
                                    inputProps={textInputProps}
                                    label='ID'
                                    margin='normal'
                                    name='id'
                                    inputRef = {(ref)=> {this.idInput = ref}}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                    fullWidth
                                    name='pw'
                                    type="password"
                                    className={classes.margin}
                                    onChange={this.handleChange}
                                    onKeyPress={this.handleKeyPress}
                                    label="Password"
                                    inputProps={textInputProps}
                                    inputRef = {(ref)=> {this.pwInput = ref}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Fab color="primary" aria-label="Log in" className={classes.fab}>
                                            <IconButton className={classes.icon} onClick={this.handleClick}>
                                                <PowerSettingsNew/>
                                            </IconButton>
                                    </Fab>
                                </Grid>
                            </Grid>
                        </MuiThemeProvider>
                    </Grid>
                </Grid>
        )
    }
}

export default compose(
    withStyles(style),
    connect(
        (state) => ({
            user : state.user
        }),
        (dispatch) => ({
            UserActions : bindActionCreators(userActions, dispatch)
        })
    )
)(withRouter(Login));
