import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleTable from '../components/SimpleTable';
import { bindActionCreators } from 'redux';
import * as userActions from '../modules/user';


class LoginContainer extends Component {
    render () {

        const { slides } = this.props;

        return (
            <div>
                
                <SimpleTable slides={slides.toJS()} />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        user : state.user
    }),
    (dispatch) => ({
        UserActions : bindActionCreators(userActions, dispatch)
    })
)(LoginContainer);