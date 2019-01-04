import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Component } from 'react';


const styles = {
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableContainer: {
    height: 320,
  },
};



class SimpleTable extends Component {
  
  static propTypes = {
    slides : PropTypes.array
  }
  
  render () {

    const { slides } = this.props;

    return (
      <div>
      <Typography variant="h4" gutterBottom component="h2">
        Table
      </Typography>
        <div >
            <Paper >
            <Table >
              <TableHead>
              {console.log(slides)}
                <TableRow>
                  <TableCell>Slide Name</TableCell>
                  <TableCell align="right">Upload Date</TableCell>
                  <TableCell align="right">Hospital</TableCell>
                  <TableCell align="right">Diagnosis</TableCell>
                  <TableCell align="right">dye works</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { slides.map( (v, i)=>{
                  return (
                    <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {v.slideid}
                    </TableCell>
                    <TableCell align="right">{v.upload}</TableCell>
                    <TableCell align="right">{v.hospital}</TableCell>
                    <TableCell align="right">{v.diagnosis}</TableCell>
                    <TableCell align="right">{v.stain}</TableCell>
                  </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SimpleTable);