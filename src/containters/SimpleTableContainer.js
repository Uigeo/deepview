import React, { Component } from 'react';
import { connect } from 'react-redux';
import SimpleTable from '../components/SimpleTable';



class SimpleTableContainer extends Component {
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
        slides : state.slides
    })
)(SimpleTableContainer);