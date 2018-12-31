import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { Collapse, TextField } from '@material-ui/core';
import Input from '@material-ui/core/Input';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as slideActions from '../modules/slides';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}


const rows = [
  { id: 'slideid', numeric: false, disablePadding: true, label: 'Slide Name' },
  { id: 'upload', numeric: true, disablePadding: false, label: 'Upload Date' },
  { id: 'hospital', numeric: false, disablePadding: false, label: 'Hospital' },
  { id: 'diagnosis', numeric: true, disablePadding: false, label: 'Diagnosis' },
  { id: 'dying', numeric: false, disablePadding: false, label: 'Dying' },
];

class EnhancedTableHead extends React.Component {

  state = {
    filterOpen : false
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {  order, orderBy} = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

const pivot = ['slideid', 'diagnosis', 'hospital' ,'dying'];

class EnhancedTableToolbar extends React.Component {

  state = {
    filterOpen : false,
    pivot : 'slideid'
  }

  handleFilterClick = () => {
    this.setState( state => ({filterOpen : !state.filterOpen}));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render () {
    const {  classes } = this.props;
    return (
      <div>
      <Toolbar
        className={classNames(classes.root )}
      >
        <div className={classes.title}>
         
            <Typography variant="h6" id="tableTitle">
              Slides
            </Typography>
       
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list" onClick={this.handleFilterClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          
        </div>
      </Toolbar>
      <Collapse in={this.state.filterOpen}>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-helper">Select</InputLabel>
            <Select
              value={this.state.age}
              onChange={this.handleChange}
              input={<Input name="age" id="age-helper" />}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
                  {pivot.map( (v)=>{return (<MenuItem value={v}>{v}</MenuItem>)} )}
            </Select>
            <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        <TextField
            id="standard-full-width"
            label="Search"
            style={{ margin: 8 }}
            placeholder="Placeholder"
            helperText="Full width!"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
        />
        </Collapse>
      </div>
    );
  }
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'upload',
    page: 0,
    rowsPerPage: 5,
  };

  componentWillMount(){
    const { slideActions, slide } = this.props;
    slideActions.retrieveTable( 
      this.state.rowsPerPage,
      this.state.rowsPerPage*this.state.page,
      this.state.orderBy,
      this.state.order );
    slideActions.retrieveTotalNum();
  }

  handleRequestSort = (event, property) => {
    const { slideActions } = this.props;
    const orderBy = property;
    let order = 'desc';
    console.log(property);

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
    slideActions.retrieveTable( 
      this.state.rowsPerPage,
      this.state.rowsPerPage*this.state.page,
      orderBy,
      order );
  };


  handleChangePage = (event, page) => {
    const { slideActions } = this.props;
    this.setState({ page });
    slideActions.retrieveTable( 
      this.state.rowsPerPage,
      this.state.rowsPerPage*(this.state.page+1),
      this.state.orderBy,
      this.state.order );
  };

  handleChangeRowsPerPage = event => {
    let rpp = event.target.value;
    const { slideActions, slide } = this.props;
    this.setState({ rowsPerPage: rpp });
    slideActions.retrieveTable( 
      rpp,
      rpp*this.state.page,
      this.state.orderBy,
      this.state.order );
  };

  

  render() {
    const { classes, slide } = this.props;
    const {  order, orderBy, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, slide.totalNum - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar  />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
       
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={slide.slides.length}
            />
            <TableBody>
              {slide.slides.map(n => {
                  return (
                    <TableRow
                      hover
                      onClick={console.log("Click")} //event => this.handleClick(event, n.id)
                      role="checkbox"
                      tabIndex={-1}
                      key={n.id}
                    >
                      <TableCell component="th" scope="row" padding="default">{n.slideid}</TableCell>
                      <TableCell align="right">{n.upload}</TableCell>
                      <TableCell align="right">{n.hospital}</TableCell>
                      <TableCell align="right">{n.diagnosis}</TableCell>
                      <TableCell align="right">{n.dying}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={slide.totalNum}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
      (state) => ({
          slide : state.slide
      }),
      (dispatch) => ({
          slideActions : bindActionCreators(slideActions, dispatch)
      })
  )
)(EnhancedTable);