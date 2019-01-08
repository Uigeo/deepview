import React, { Component } from 'react'
import PropTyeps from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../modules/user';


const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
});

class SignUpPage extends Component {
    
    constructor (props) {
        super(props)
        this.state = {
            pwConfirm : true,
            pwValid : true,
        }
    }
    
    
    render () {

        const { classes } = this.props;

        return (
            <div>
                <TextField
                    id="id-fiel"
                    label="ID"
                    name = 'id'
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    id="outlined-uncontrolled"
                    label="Password"
                    name = 'pw'
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
            </div>
        )
    }
}

SignUpPage.propTypes = {
    
}

SignUpPage.defaultProps = {

}

export default compose(
    withStyles(styles),
    connect(
        (state) => ({
            user : state.user
        }),
        (dispatch) => ({
            UserActions : bindActionCreators(userActions, dispatch)
        })
    )
)(SignUpPage);