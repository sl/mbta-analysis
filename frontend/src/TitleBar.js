import React from 'react';
import { withStyles } from "@material-ui/core";
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const TitleBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}> 
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" color="inherit" className={classes.grow}>
            MBTA Performance Analysis
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

TitleBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitleBar);