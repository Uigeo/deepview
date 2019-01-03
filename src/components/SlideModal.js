import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as modalActions from '../modules/modal';
import ImageViewer from '../components/ImageViewer';

const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
  });

class SlideModal extends Component {
    
    

    handleClose = () => {
        const { modalActions } = this.props;
        modalActions.hide();
    };


    render() {
        const { classes,  modal, top, left, width, height } = this.props;

        return (
      
                <Modal style={{top:top, left:left}} open={modal.visible} onClose={this.handleClose}>
                <div style={{width:width, height:height}} className={classes.paper}>
                    <Typography variant="h6" id="modal-title">
                    Text in a modal
                    </Typography>
                    <Typography variant="subtitle1" >
                        {modal.slide.slideid}
                    </Typography>
                    <ImageViewer 
                    width='99%'
                    height='99%'
                    image="http://www.planwallpaper.com/static/images/HD-Wallpapers1_FOSmVKg.jpeg"
                     />
                </div>
                </Modal>
      )
    }
}

SlideModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

SlideModal.defaultProps = {
    width : 300,
    height : 300,
    top : 50,
    left : 40,
}

export default compose(
    withStyles(styles),
    connect(
        (state) => ({
            modal : state.modal
        }),
        (dispatch) => ({
            modalActions : bindActionCreators(modalActions, dispatch)
        })
    )
)(SlideModal);
