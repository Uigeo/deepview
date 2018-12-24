import React, { Component } from 'react';
import { connect } from 'react-redux';
import MonoLineChart from '../components/MonoLineChart';

const data = [
    { year: '2013', AS: 5902, HY: 3546,  SS:3723},
    { year: '2014', AS: 7232, HY: 6567,  SS:2421},
    { year: '2015', AS: 6655, HY: 3364,  SS:3928},
    { year: '2016', AS: 3982, HY: 2353,  SS:7872},
    { year: '2017', AS: 4212, HY: 2634,  SS:1546},
    { year: '2018', AS: 4562, HY: 5445,  SS:1877},
    { year: '2019', AS: 6767, HY: 2153,  SS:3332},
  ];
  


class ChartContainer extends Component {
    render () {
        return (
            <div>
                <MonoLineChart
                    data = {data}
                    dataKey = 'year'
                    linetype = 'monotone'
                    keys = {['AS', 'HY', 'SS']}
                    dot = {7}
                    strokes = {['#3377aa', '#327672', '#828732']}
                />
            </div>
        )
    }
}

export default ChartContainer;