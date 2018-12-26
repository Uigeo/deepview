import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnhancedTable from '../components/EnhancedTable';

class TableContainer extends Component {
    render () {
        const { slides } = this.props;

        return (
            <div>
                <EnhancedTable slides={slides.toJS()} />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        slides : state.slides
    })
)(TableContainer);