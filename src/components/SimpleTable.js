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

let id = 0;
function createData(sname, upload, hospital, diagnosis, dying) {
  id += 1;
  return { id, sname, upload, hospital, diagnosis, dying };
}

const data = [
  createData('AS-JUN13-2016', Date.now(), 'AS', 4, 'A'),
  createData('HY-NOV15-2015', Date.now(), 'HY', 6, 'B'),
  createData('SE-JAN03-2018', Date.now(), 'SE', 3, 'C'),
  createData('SS-OTC13-2017', Date.now(), 'SS', 4, 'F'),
  createData('KK-AUG10-2014', Date.now(), 'KK', 2, 'G'),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <div>
  <Typography variant="h4" gutterBottom component="h2">
    Table
  </Typography>
    <div className={classes.tableContainer}>
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Slide Name</TableCell>
              <TableCell align="right">Upload Date</TableCell>
              <TableCell align="right">Hospital</TableCell>
              <TableCell align="right">Diagnosis</TableCell>
              <TableCell align="right">dye works</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.sname}
                  </TableCell>
                  <TableCell align="right">{n.hospital}</TableCell>
                  <TableCell align="right">{n.upload}</TableCell>
                  <TableCell align="right">{n.diagnosis}</TableCell>
                  <TableCell align="right">{n.dying}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);