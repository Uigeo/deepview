import React, { Component } from 'react';
import { connect } from 'react-redux';
import EnhancedTable from '../components/EnhancedTable';

class TableContainer extends Component {
    render () {
        const { slides, totalNum } = this.props;

        return (
            <div>
                <EnhancedTable 
                    slides={slides}
                    totalNum={totalNum} />
            </div>
        )
    }
}

export default connect(
    (state) => ({
        slide : state.slide.slides,
        totalNum : state.slide.totalNum
    })
)(TableContainer);