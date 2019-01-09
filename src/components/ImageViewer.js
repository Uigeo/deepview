import OpenSeadragon from 'openseadragon';
import React from 'react';
//import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutline from '@material-ui/icons/RemoveCircleOutline';
import Replay from '@material-ui/icons/Replay';
import PageviewOutlined from '@material-ui/icons/PageviewOutlined';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    navigator : {
        position:'fixed',
        left: '5px',
        bottom: '5px',
        background:'#0000000',
        overflow:'hidden',
        width:'166px',
        height:'178px',
     },
     fab: {
        margin: theme.spacing.unit,
      },
      extendedIcon: {
        marginRight: 0,
      },
})

const loadImage = (src)=> new Promise(function(resolve, reject) {
    var img = document.createElement('img')
    img.addEventListener('load', function(){  resolve(img) })
    img.addEventListener('error', function(err){ reject(404) })
    img.src = src;
  });
               
  class ImageViewer extends React.Component {

      constructor(props) {
          super(props);
          this.state = {
            pending : false
          }
      }
      
      render() {
          let { id, classes, width, height } = this.props
          return (
              <div  className="ocd-div" ref={node => {this.el = node;}} style={{width:width, height:height}} >
                <div>
                    <Fab id="zoom-in" color="primary" aria-label="Add" className={classes.fab}>
                        <AddCircleOutline className={classes.extendedIcon}/>
                    </Fab>
                    <Fab id="reset" color="primary" aria-label="reset" className={classes.fab}>
                        <Replay className={classes.extendedIcon}/>
                    </Fab>
                    <Fab id="zoom-out" color="primary" aria-label="remove" className={classes.fab}>
                        <RemoveCircleOutline className={classes.extendedIcon}/>
                    </Fab>
                    <Fab id="full-page" color="primary" aria-label="page" className={classes.fab}>
                        <PageviewOutlined className={classes.extendedIcon}/>
                    </Fab>   
                </div>
                 
                    <div className="openseadragon" style={{width : '100%', height: '99%'}} id={id}>{ this.state.pending && <CircularProgress /> }</div>
              </div>
          )
      }
  
      initSeaDragon(){
          let self = this
          let { id, image, type } = this.props
          loadImage(image).then(data =>{
              this.setState({
                  pending : false
              });
              self.viewer =  OpenSeadragon({
                  element: id,
                  visibilityRatio: 1.0,
                  constrainDuringPan: false,
                  defaultZoomLevel: 1,
                  minZoomLevel: 1,
                  maxZoomLevel: 10,
                  zoomInButton: 'zoom-in',
                  zoomOutButton: 'zoom-out',
                  homeButton: 'reset',
                  fullPageButton: 'full-page',
                  nextButton: 'next',
                  previousButton: 'previous',
                  showNavigator: false,
                  tileSources: {
                      type:type,
                      levels:[ { url: image, height:data.naturalHeight, width: data.naturalWidth } ]
                  }
              });
            
          });
      }
  
      componentDidMount(){
          this.initSeaDragon()
      }
       shouldComponentUpdate(nextProps, nextState){
          return false
      }
  }
  
  ImageViewer.defaultProps = { 
    id: 'ocd-viewer',  
    type:'legacy-image-pyramid',
    width : 300,
    height : 300    
    }
  

  export default withStyles(styles)(ImageViewer);